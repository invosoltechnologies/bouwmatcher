#!/usr/bin/env tsx

/**
 * Database Backup Tool
 *
 * Creates a full backup of the database using pg_dump (unlimited rows).
 * Backups are stored in the backups/ directory with timestamps.
 *
 * Usage:
 *   npm run db:backup                    # Create full backup
 *   npm run db:backup -- --output=custom # Custom filename
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { getConnectionString } from './db-client';

const execAsync = promisify(exec);

const BACKUPS_DIR = path.join(process.cwd(), 'backups');

/**
 * Ensure backups directory exists
 */
function ensureBackupsDir(): void {
  if (!fs.existsSync(BACKUPS_DIR)) {
    fs.mkdirSync(BACKUPS_DIR, { recursive: true });
  }
}

/**
 * Generate backup filename with timestamp
 */
function generateBackupFilename(customName?: string): string {
  if (customName) {
    return customName.endsWith('.sql') ? customName : `${customName}.sql`;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const time = new Date().toISOString().split('T')[1].split('.')[0].replace(/:/g, '-');
  return `backup_${timestamp}_${time}.sql`;
}

/**
 * Create database backup using pg_dump
 */
async function createBackup(outputFilename: string): Promise<void> {
  const connectionString = getConnectionString();
  const outputPath = path.join(BACKUPS_DIR, outputFilename);

  console.log('🗄️  Database Backup Tool\n');
  console.log(`📁 Backup directory: ${BACKUPS_DIR}`);
  console.log(`📄 Output file: ${outputFilename}\n`);

  console.log('🔄 Creating backup...\n');

  try {
    // Check if pg_dump is available
    try {
      await execAsync('pg_dump --version');
    } catch {
      console.error('❌ pg_dump not found in PATH');
      console.error('   Install PostgreSQL client tools:');
      console.error('   - Windows: https://www.postgresql.org/download/windows/');
      console.error('   - macOS: brew install postgresql');
      console.error('   - Linux: apt-get install postgresql-client\n');
      process.exit(1);
    }

    const startTime = Date.now();

    // Run pg_dump with full schema + data
    // Options:
    //   --clean: Add DROP statements before CREATE
    //   --if-exists: Use IF EXISTS with DROP statements
    //   --no-owner: Don't set ownership
    //   --no-privileges: Don't dump privileges (better for portability)
    //   --verbose: Show progress
    const command = `pg_dump "${connectionString}" --clean --if-exists --no-owner --no-privileges --file="${outputPath}"`;

    await execAsync(command, {
      maxBuffer: 1024 * 1024 * 100 // 100MB buffer for large databases
    });

    const executionTime = Date.now() - startTime;
    const fileSize = fs.statSync(outputPath).size;
    const fileSizeMB = (fileSize / 1024 / 1024).toFixed(2);

    console.log(`✅ Backup created successfully!\n`);
    console.log(`📊 Statistics:`);
    console.log(`   File: ${outputPath}`);
    console.log(`   Size: ${fileSizeMB} MB`);
    console.log(`   Time: ${executionTime}ms\n`);

    // List recent backups
    listRecentBackups();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Backup failed: ${message}\n`);
    process.exit(1);
  }
}

/**
 * List recent backup files
 */
function listRecentBackups(): void {
  const files = fs.readdirSync(BACKUPS_DIR)
    .filter(f => f.endsWith('.sql'))
    .map(f => {
      const filepath = path.join(BACKUPS_DIR, f);
      const stats = fs.statSync(filepath);
      return {
        name: f,
        size: stats.size,
        mtime: stats.mtime
      };
    })
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
    .slice(0, 5);

  if (files.length === 0) {
    return;
  }

  console.log('📋 Recent backups:');
  files.forEach(file => {
    const sizeMB = (file.size / 1024 / 1024).toFixed(2);
    const date = file.mtime.toISOString().split('T')[0];
    const time = file.mtime.toISOString().split('T')[1].split('.')[0];
    console.log(`   ${file.name} (${sizeMB} MB) - ${date} ${time}`);
  });
  console.log();
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const outputArg = args.find(arg => arg.startsWith('--output='));
  const customName = outputArg?.split('=')[1];

  ensureBackupsDir();

  const filename = generateBackupFilename(customName);
  await createBackup(filename);
}

// Run the backup
main().catch((error: unknown) => {
  console.error('\n❌ Unexpected error:', error);
  process.exit(1);
});
