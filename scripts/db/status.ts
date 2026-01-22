#!/usr/bin/env tsx

/**
 * Database Migration Status Checker
 *
 * Shows the current state of migrations - which are applied and which are pending.
 *
 * Usage:
 *   npm run db:status
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { query, connect, disconnect } from './db-client';

const MIGRATIONS_DIR = path.join(process.cwd(), 'migrations');

interface Migration {
  version: string;
  name: string;
  filename: string;
  checksum: string;
}

interface AppliedMigration {
  version: string;
  name: string;
  applied_at: string;
  execution_time_ms: number;
  checksum: string;
}

/**
 * Calculate MD5 checksum of migration content
 */
function calculateChecksum(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Get all migration files from disk
 */
function getMigrationFiles(): Migration[] {
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith('.sql'))
    .sort();

  return files.map(filename => {
    const filepath = path.join(MIGRATIONS_DIR, filename);
    const match = filename.match(/^(\d+)_(.+)\.sql$/);

    if (!match) {
      return null;
    }

    const [, version, name] = match;
    const content = fs.readFileSync(filepath, 'utf-8');
    const checksum = calculateChecksum(content);

    return {
      version,
      name,
      filename,
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
      `SELECT version, name, applied_at, execution_time_ms, checksum
       FROM schema_migrations
       ORDER BY version ASC`
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
 * Format timestamp
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
}

/**
 * Display migration status
 */
async function displayStatus(): Promise<void> {
  console.log('🗄️  Database Migration Status\n');
  console.log(`📁 Migrations directory: ${MIGRATIONS_DIR}\n`);

  try {
    // Connect to database
    await connect();

    // Get migrations
    const allMigrations = getMigrationFiles();
    const appliedMigrations = await getAppliedMigrations();

    if (allMigrations.length === 0) {
      console.log('⚠️  No migration files found\n');
      return;
    }

    const appliedVersions = new Map(
      appliedMigrations.map(m => [m.version, m])
    );

    console.log('📊 Migration Status:\n');
    console.log('Status | Version | Name                           | Applied At          | Time');
    console.log('-------|---------|--------------------------------|---------------------|-------');

    let appliedCount = 0;
    let pendingCount = 0;
    let modifiedCount = 0;

    for (const migration of allMigrations) {
      const applied = appliedVersions.get(migration.version);

      if (applied) {
        appliedCount++;

        // Check if modified
        const isModified = applied.checksum && migration.checksum !== applied.checksum;

        if (isModified) {
          modifiedCount++;
          console.log(
            `⚠️  MOD | ${migration.version.padEnd(7)} | ${migration.name.padEnd(30).substring(0, 30)} | ${formatDate(applied.applied_at)} | ${applied.execution_time_ms || 0}ms`
          );
        } else {
          console.log(
            `✅ APP | ${migration.version.padEnd(7)} | ${migration.name.padEnd(30).substring(0, 30)} | ${formatDate(applied.applied_at)} | ${applied.execution_time_ms || 0}ms`
          );
        }
      } else {
        pendingCount++;
        console.log(
          `⏳ PEN | ${migration.version.padEnd(7)} | ${migration.name.padEnd(30).substring(0, 30)} | -                   | -`
        );
      }
    }

    console.log('\n📈 Summary:');
    console.log(`   Total migrations: ${allMigrations.length}`);
    console.log(`   ✅ Applied:       ${appliedCount}`);
    console.log(`   ⏳ Pending:       ${pendingCount}`);

    if (modifiedCount > 0) {
      console.log(`   ⚠️  Modified:      ${modifiedCount}`);
      console.log('\n⚠️  WARNING: Some applied migrations have been modified!');
      console.log('   This is dangerous and may cause issues.');
      console.log('   Consider creating a new migration instead.\n');
    }

    if (pendingCount > 0) {
      console.log('\n💡 To apply pending migrations, run:');
      console.log('   npm run db:migrate\n');
    } else {
      console.log('\n✅ Database is up to date!\n');
    }

    // Check for applied migrations without files
    const fileVersions = new Set(allMigrations.map(m => m.version));
    const missingFiles = appliedMigrations.filter(m => !fileVersions.has(m.version));

    if (missingFiles.length > 0) {
      console.log('⚠️  WARNING: These migrations are applied but files are missing:');
      missingFiles.forEach(m => {
        console.log(`   ${m.version}_${m.name}`);
      });
      console.log();
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Error: ${message}\n`);
    process.exit(1);
  } finally {
    await disconnect();
  }
}

// Run status check
displayStatus().catch((error: unknown) => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
