#!/usr/bin/env tsx

/**
 * Database Migration Runner
 *
 * Runs pending SQL migrations in order.
 * Each migration file should have UP and DOWN sections separated by -- DOWN comment.
 *
 * Usage:
 *   npm run db:migrate           # Run all pending migrations
 *   npm run db:migrate -- --down  # Rollback last migration
 *   npm run db:migrate -- --to=005 # Migrate to specific version
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { query, executeInTransaction, connect, disconnect } from './db-client';

interface Migration {
  version: string;
  name: string;
  filename: string;
  filepath: string;
  upSql: string;
  downSql: string;
  checksum: string;
}

interface AppliedMigration {
  version: string;
  name: string;
  applied_at: string;
  checksum: string;
}

const MIGRATIONS_DIR = path.join(process.cwd(), 'migrations');

/**
 * Calculate MD5 checksum of migration content
 */
function calculateChecksum(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Parse migration file into UP and DOWN sections
 */
function parseMigrationFile(filepath: string): { upSql: string; downSql: string } {
  const content = fs.readFileSync(filepath, 'utf-8');

  // Look for -- DOWN comment to split the file
  const downMarker = /^--\s*DOWN\s*$/mi;
  const match = downMarker.exec(content);

  if (!match) {
    // No DOWN section, entire file is UP
    return {
      upSql: content.trim(),
      downSql: ''
    };
  }

  const upSql = content.substring(0, match.index).trim();
  const downSql = content.substring(match.index + match[0].length).trim();

  return { upSql, downSql };
}

/**
 * Get all migration files from disk
 */
function getMigrationFiles(): Migration[] {
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    console.error(`❌ Migrations directory not found: ${MIGRATIONS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith('.sql'))
    .sort();

  return files.map(filename => {
    const filepath = path.join(MIGRATIONS_DIR, filename);
    const match = filename.match(/^(\d+)_(.+)\.sql$/);

    if (!match) {
      console.warn(`⚠️  Skipping invalid migration filename: ${filename}`);
      return null;
    }

    const [, version, name] = match;
    const { upSql, downSql } = parseMigrationFile(filepath);
    const checksum = calculateChecksum(upSql);

    return {
      version,
      name,
      filename,
      filepath,
      upSql,
      downSql,
      checksum
    };
  }).filter(Boolean) as Migration[];
}

/**
 * Get applied migrations from database
 */
async function getAppliedMigrations(): Promise<AppliedMigration[]> {
  try {
    const result = await query(
      'SELECT version, name, applied_at, checksum FROM schema_migrations ORDER BY version ASC'
    );
    return result.rows;
  } catch (error: unknown) {
    // Table might not exist yet
    if (error instanceof Error && error.message.includes('does not exist')) {
      return [];
    }
    throw error;
  }
}

/**
 * Ensure schema_migrations table exists
 */
async function ensureMigrationsTable(): Promise<void> {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      version VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      execution_time_ms INTEGER,
      checksum VARCHAR(64)
    );

    CREATE INDEX IF NOT EXISTS idx_schema_migrations_version ON schema_migrations(version);
    CREATE INDEX IF NOT EXISTS idx_schema_migrations_applied_at ON schema_migrations(applied_at DESC);
  `;

  await query(createTableSql);
}

/**
 * Run a single migration UP
 */
async function runMigrationUp(migration: Migration): Promise<void> {
  console.log(`\n🔄 Running migration ${migration.version}_${migration.name}...`);

  const startTime = Date.now();

  try {
    // Split into statements and execute in transaction
    const statements = migration.upSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    await executeInTransaction(statements);

    const executionTime = Date.now() - startTime;

    // Record the migration
    await query(
      `INSERT INTO schema_migrations (version, name, execution_time_ms, checksum)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (version) DO NOTHING`,
      [migration.version, migration.name, executionTime, migration.checksum]
    );

    console.log(`✅ Completed in ${executionTime}ms`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Failed: ${message}`);
    throw error;
  }
}

/**
 * Run a single migration DOWN
 */
async function runMigrationDown(migration: Migration): Promise<void> {
  console.log(`\n🔄 Rolling back migration ${migration.version}_${migration.name}...`);

  if (!migration.downSql) {
    console.error(`❌ No DOWN migration defined for ${migration.version}`);
    throw new Error('Missing DOWN migration');
  }

  const startTime = Date.now();

  try {
    // Split into statements and execute in transaction
    const statements = migration.downSql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    await executeInTransaction(statements);

    const executionTime = Date.now() - startTime;

    // Remove the migration record
    await query('DELETE FROM schema_migrations WHERE version = $1', [migration.version]);

    console.log(`✅ Rolled back in ${executionTime}ms`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Failed: ${message}`);
    throw error;
  }
}

/**
 * Verify migration checksums
 */
async function verifyChecksums(allMigrations: Migration[], appliedMigrations: AppliedMigration[]): Promise<void> {
  const errors: string[] = [];

  for (const applied of appliedMigrations) {
    const migration = allMigrations.find(m => m.version === applied.version);

    if (!migration) {
      errors.push(`❌ Migration file missing for applied version ${applied.version}`);
      continue;
    }

    if (applied.checksum && migration.checksum !== applied.checksum) {
      errors.push(`❌ Checksum mismatch for ${applied.version}_${applied.name}`);
      errors.push(`   Expected: ${applied.checksum}`);
      errors.push(`   Got:      ${migration.checksum}`);
    }
  }

  if (errors.length > 0) {
    console.error('\n⚠️  Migration verification failed:\n');
    errors.forEach(err => console.error(err));
    console.error('\n⚠️  Applied migrations have been modified!');
    console.error('   This is dangerous and may cause inconsistencies.\n');

    const response = await promptUser('Continue anyway? (yes/no): ');
    if (response.toLowerCase() !== 'yes') {
      process.exit(1);
    }
  }
}

/**
 * Prompt user for input
 */
async function promptUser(question: string): Promise<string> {
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
}

/**
 * Main migration logic
 */
async function main() {
  const args = process.argv.slice(2);
  const isDown = args.includes('--down');
  const targetArg = args.find(arg => arg.startsWith('--to='));
  const targetVersion = targetArg?.split('=')[1];

  console.log('🗄️  Database Migration Tool\n');
  console.log(`📁 Migrations directory: ${MIGRATIONS_DIR}`);

  try {
    // Connect to database
    await connect();
    console.log('🔗 Connected to database\n');

    // Ensure migrations table exists
    await ensureMigrationsTable();

    // Get all migrations
    const allMigrations = getMigrationFiles();
    console.log(`📋 Found ${allMigrations.length} migration files`);

    // Get applied migrations
    const appliedMigrations = await getAppliedMigrations();
    console.log(`✅ ${appliedMigrations.length} migrations already applied`);

    // Verify checksums
    await verifyChecksums(allMigrations, appliedMigrations);

    if (isDown) {
      // ROLLBACK: Run the last applied migration down
      if (appliedMigrations.length === 0) {
        console.log('\n⚠️  No migrations to rollback');
        return;
      }

      const lastApplied = appliedMigrations[appliedMigrations.length - 1];
      const migration = allMigrations.find(m => m.version === lastApplied.version);

      if (!migration) {
        console.error(`❌ Migration file not found for version ${lastApplied.version}`);
        process.exit(1);
      }

      await runMigrationDown(migration);
      console.log('\n✅ Rollback complete!\n');
    } else {
      // MIGRATE UP: Run pending migrations
      const appliedVersions = new Set(appliedMigrations.map(m => m.version));
      let pendingMigrations = allMigrations.filter(m => !appliedVersions.has(m.version));

      // If target version specified, only run up to that version
      if (targetVersion) {
        const targetIndex = pendingMigrations.findIndex(m => m.version === targetVersion);
        if (targetIndex === -1) {
          console.error(`❌ Target version ${targetVersion} not found in pending migrations`);
          process.exit(1);
        }
        pendingMigrations = pendingMigrations.slice(0, targetIndex + 1);
      }

      if (pendingMigrations.length === 0) {
        console.log('\n✅ Database is up to date!\n');
        return;
      }

      console.log(`\n🚀 Running ${pendingMigrations.length} pending migrations...\n`);

      for (const migration of pendingMigrations) {
        await runMigrationUp(migration);
      }

      console.log('\n✅ All migrations complete!\n');
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('\n❌ Migration failed:', message);
    process.exit(1);
  } finally {
    await disconnect();
  }
}

// Run the migrations
main().catch((error: unknown) => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
