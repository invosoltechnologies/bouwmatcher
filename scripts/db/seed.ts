#!/usr/bin/env tsx

/**
 * Database Seeding Tool
 *
 * Seeds development data into the database.
 * Separate from production backups - this is for development/staging only.
 *
 * Usage:
 *   npm run db:seed                 # Run all seed files
 *   npm run db:seed -- --file=users # Run specific seed file
 */

import * as fs from 'fs';
import * as path from 'path';
import { query, connect, disconnect, executeInTransaction } from './db-client';

const SEEDS_DIR = path.join(process.cwd(), 'seeds', 'development');

interface SeedFile {
  name: string;
  filepath: string;
  sql: string;
}

/**
 * Get all seed files
 */
function getSeedFiles(specificFile?: string): SeedFile[] {
  if (!fs.existsSync(SEEDS_DIR)) {
    console.log(`📁 Seeds directory not found, creating: ${SEEDS_DIR}`);
    fs.mkdirSync(SEEDS_DIR, { recursive: true });
    return [];
  }

  let files = fs.readdirSync(SEEDS_DIR)
    .filter(f => f.endsWith('.sql'))
    .sort();

  // Filter by specific file if provided
  if (specificFile) {
    const targetFile = specificFile.endsWith('.sql') ? specificFile : `${specificFile}.sql`;
    files = files.filter(f => f === targetFile);

    if (files.length === 0) {
      console.error(`❌ Seed file not found: ${targetFile}\n`);
      process.exit(1);
    }
  }

  return files.map(filename => {
    const filepath = path.join(SEEDS_DIR, filename);
    const sql = fs.readFileSync(filepath, 'utf-8');
    const name = filename.replace('.sql', '');

    return { name, filepath, sql };
  });
}

/**
 * Check if database is empty (safe to seed)
 */
async function isDatabaseEmpty(): Promise<boolean> {
  try {
    // Check if any data exists in key tables
    const result = await query(`
      SELECT
        (SELECT COUNT(*) FROM personal_users) as personal_users_count,
        (SELECT COUNT(*) FROM professional_profiles) as professionals_count,
        (SELECT COUNT(*) FROM projects) as projects_count
    `);

    const row = result.rows[0];
    const totalCount = parseInt(row.personal_users_count) +
                       parseInt(row.professionals_count) +
                       parseInt(row.projects_count);

    return totalCount === 0;
  } catch {
    // Tables might not exist yet
    return true;
  }
}

/**
 * Prompt user for confirmation
 */
async function promptConfirmation(question: string): Promise<boolean> {
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, (answer: string) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes');
    });
  });
}

/**
 * Run a seed file
 */
async function runSeed(seed: SeedFile): Promise<void> {
  console.log(`\n🌱 Seeding: ${seed.name}...`);

  const startTime = Date.now();

  try {
    // Split into statements and execute in transaction
    const statements = seed.sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    await executeInTransaction(statements);

    const executionTime = Date.now() - startTime;
    console.log(`✅ Completed in ${executionTime}ms`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Failed: ${message}`);
    throw error;
  }
}

/**
 * Create example seed files if none exist
 */
function createExampleSeeds(): void {
  if (!fs.existsSync(SEEDS_DIR)) {
    fs.mkdirSync(SEEDS_DIR, { recursive: true });
  }

  const exampleSeed = path.join(SEEDS_DIR, '001_example.sql');

  if (!fs.existsSync(exampleSeed)) {
    const content = `-- Example Seed Data
-- This is a template for creating seed data
-- Replace with your actual development data

-- Example: Insert service categories
-- INSERT INTO service_categories (name_nl, name_en, slug, icon)
-- VALUES
--   ('Aannemer', 'Contractor', 'aannemer', 'hammer'),
--   ('Schilder', 'Painter', 'schilder', 'paintbrush');

-- Example: Insert test users
-- INSERT INTO personal_users (email, first_name, last_name, phone)
-- VALUES
--   ('test@example.com', 'Test', 'User', '+31612345678');

-- Add your seed data here...
`;

    fs.writeFileSync(exampleSeed, content);
    console.log(`📝 Created example seed file: ${exampleSeed}`);
  }
}

/**
 * Main seeding logic
 */
async function main() {
  const args = process.argv.slice(2);
  const fileArg = args.find(arg => arg.startsWith('--file='));
  const specificFile = fileArg?.split('=')[1];
  const force = args.includes('--force');

  console.log('🌱 Database Seeding Tool\n');
  console.log(`📁 Seeds directory: ${SEEDS_DIR}`);

  try {
    // Connect to database
    await connect();
    console.log('🔗 Connected to database\n');

    // Get seed files
    const seedFiles = getSeedFiles(specificFile);

    if (seedFiles.length === 0) {
      console.log('⚠️  No seed files found\n');
      createExampleSeeds();
      console.log('\n✅ Created example seed file in seeds/development/');
      console.log('   Edit it with your development data and run again.\n');
      return;
    }

    console.log(`📋 Found ${seedFiles.length} seed file(s)\n`);

    // Safety check: warn if database has data
    if (!force) {
      const isEmpty = await isDatabaseEmpty();

      if (!isEmpty) {
        console.log('⚠️  WARNING: Database already contains data!');
        console.log('   Seeding may cause duplicate key errors or data conflicts.\n');

        const confirmed = await promptConfirmation('Continue anyway? Type "yes" to confirm: ');

        if (!confirmed) {
          console.log('\n❌ Seeding cancelled\n');
          console.log('   Tip: Use --force to skip this check\n');
          process.exit(0);
        }
      }
    }

    // Run seeds
    console.log('🚀 Running seed files...');

    for (const seed of seedFiles) {
      await runSeed(seed);
    }

    console.log('\n✅ All seeds completed!\n');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('\n❌ Seeding failed:', message);
    process.exit(1);
  } finally {
    await disconnect();
  }
}

// Run the seeding
main().catch((error: unknown) => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
