#!/usr/bin/env tsx

/**
 * Database Restore Tool
 *
 * Restores database from a backup file with safety checks.
 *
 * Usage:
 *   npm run db:restore -- --file=backup_2026-01-22.sql
 *   npm run db:restore -- --latest  # Restore from most recent backup
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { getConnectionString } from './db-client';

const execAsync = promisify(exec);

const BACKUPS_DIR = path.join(process.cwd(), 'backups');

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
 * Get latest backup file
 */
function getLatestBackup(): string | null {
  if (!fs.existsSync(BACKUPS_DIR)) {
    return null;
  }

  const files = fs.readdirSync(BACKUPS_DIR)
    .filter(f => f.endsWith('.sql'))
    .map(f => {
      const filepath = path.join(BACKUPS_DIR, f);
      const stats = fs.statSync(filepath);
      return {
        name: f,
        path: filepath,
        mtime: stats.mtime
      };
    })
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

  return files.length > 0 ? files[0].path : null;
}

/**
 * Validate backup file
 */
function validateBackupFile(filepath: string): void {
  if (!fs.existsSync(filepath)) {
    console.error(`❌ Backup file not found: ${filepath}\n`);
    process.exit(1);
  }

  const stats = fs.statSync(filepath);
  if (stats.size === 0) {
    console.error(`❌ Backup file is empty: ${filepath}\n`);
    process.exit(1);
  }

  // Check if file contains SQL
  const content = fs.readFileSync(filepath, 'utf-8');
  if (!content.includes('CREATE TABLE') && !content.includes('INSERT INTO')) {
    console.error(`❌ File doesn't appear to be a valid SQL backup\n`);
    process.exit(1);
  }
}

/**
 * Restore database from backup
 */
async function restoreBackup(backupPath: string): Promise<void> {
  const connectionString = getConnectionString();

  console.log('🗄️  Database Restore Tool\n');
  console.log(`📄 Backup file: ${backupPath}`);

  const fileSize = fs.statSync(backupPath).size;
  const fileSizeMB = (fileSize / 1024 / 1024).toFixed(2);
  console.log(`📊 File size: ${fileSizeMB} MB\n`);

  // Safety check
  console.log('⚠️  WARNING: This will DROP all existing tables and restore from backup!');
  console.log('   All current data will be LOST.\n');

  const confirmed = await promptConfirmation('Are you sure you want to continue? Type "yes" to confirm: ');

  if (!confirmed) {
    console.log('\n❌ Restore cancelled\n');
    process.exit(0);
  }

  console.log('\n🔄 Restoring database...\n');

  try {
    // Check if psql is available
    try {
      await execAsync('psql --version');
    } catch {
      console.error('❌ psql not found in PATH');
      console.error('   Install PostgreSQL client tools:');
      console.error('   - Windows: https://www.postgresql.org/download/windows/');
      console.error('   - macOS: brew install postgresql');
      console.error('   - Linux: apt-get install postgresql-client\n');
      process.exit(1);
    }

    const startTime = Date.now();

    // Run psql to restore the backup
    const command = `psql "${connectionString}" --file="${backupPath}" --quiet`;

    await execAsync(command, {
      maxBuffer: 1024 * 1024 * 100 // 100MB buffer
    });

    const executionTime = Date.now() - startTime;

    console.log(`✅ Database restored successfully!\n`);
    console.log(`⏱️  Restore time: ${executionTime}ms\n`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Restore failed: ${message}\n`);
    process.exit(1);
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const fileArg = args.find(arg => arg.startsWith('--file='));
  const useLatest = args.includes('--latest');

  let backupPath: string;

  if (useLatest) {
    const latestBackup = getLatestBackup();
    if (!latestBackup) {
      console.error('❌ No backup files found in backups/ directory\n');
      process.exit(1);
    }
    backupPath = latestBackup;
  } else if (fileArg) {
    const filename = fileArg.split('=')[1];
    // Check if it's an absolute path or just filename
    backupPath = path.isAbsolute(filename)
      ? filename
      : path.join(BACKUPS_DIR, filename);
  } else {
    console.error('❌ Please specify a backup file or use --latest\n');
    console.error('Usage:');
    console.error('  npm run db:restore -- --file=backup_2026-01-22.sql');
    console.error('  npm run db:restore -- --latest\n');
    process.exit(1);
  }

  validateBackupFile(backupPath);
  await restoreBackup(backupPath);
}

// Run the restore
main().catch((error: unknown) => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
