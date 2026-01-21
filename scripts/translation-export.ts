/**
 * Safe Translation Export Script
 *
 * Exports translatable fields from project_form_questions and project_form_question_options
 * to CSV format for bulk translation, then safely imports them back.
 *
 * Usage:
 *   npm run translation:export   # Export data to CSV
 *   npm run translation:import   # Import translated data back
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const OUTPUT_DIR = path.join(process.cwd(), 'translations');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Convert array of objects to CSV string
 */
function arrayToCSV(data: any[], headers: string[]): string {
  const escapeCsvValue = (value: any): string => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    // Escape double quotes and wrap in quotes if contains comma, newline, or quote
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvHeaders = headers.join(',');
  const csvRows = data.map(row =>
    headers.map(header => escapeCsvValue(row[header])).join(',')
  );

  return [csvHeaders, ...csvRows].join('\n');
}

/**
 * Parse CSV string to array of objects
 */
function csvToArray(csvContent: string, headers: string[]): any[] {
  const lines = csvContent.split('\n').filter(line => line.trim());

  // Skip header row
  const dataLines = lines.slice(1);

  return dataLines.map(line => {
    const values: string[] = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (insideQuotes && line[i + 1] === '"') {
          // Escaped quote
          currentValue += '"';
          i++;
        } else {
          // Toggle quote state
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue); // Add last value

    // Map values to headers
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    return obj;
  });
}

/**
 * Export project_form_questions translations
 */
async function exportQuestions() {
  console.log('📤 Exporting questions...');

  // Fetch all records with pagination (Supabase default limit is 1000)
  let allData: Array<Record<string, unknown>> = [];
  let offset = 0;
  const limit = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('project_form_questions')
      .select('id, question_text_nl, question_text_en, placeholder_nl, placeholder_en, help_text_nl, help_text_en')
      .order('id')
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('❌ Error fetching questions:', error);
      return;
    }

    if (data && data.length > 0) {
      allData = allData.concat(data);
      offset += limit;
      hasMore = data.length === limit;
      console.log(`  Fetched ${data.length} records (total: ${allData.length})...`);
    } else {
      hasMore = false;
    }
  }

  const headers = ['id', 'question_text_nl', 'question_text_en', 'placeholder_nl', 'placeholder_en', 'help_text_nl', 'help_text_en'];
  const csv = arrayToCSV(allData, headers);

  const filePath = path.join(OUTPUT_DIR, 'questions.csv');
  fs.writeFileSync(filePath, csv, 'utf-8');

  console.log(`✅ Exported ${allData.length} questions to: ${filePath}`);
}

/**
 * Export project_form_question_options translations
 */
async function exportOptions() {
  console.log('📤 Exporting question options...');

  // Fetch all records with pagination (Supabase default limit is 1000)
  let allData: Array<Record<string, unknown>> = [];
  let offset = 0;
  const limit = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('project_form_question_options')
      .select('id, option_label_nl, option_label_en')
      .order('id')
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('❌ Error fetching options:', error);
      return;
    }

    if (data && data.length > 0) {
      allData = allData.concat(data);
      offset += limit;
      hasMore = data.length === limit;
      console.log(`  Fetched ${data.length} records (total: ${allData.length})...`);
    } else {
      hasMore = false;
    }
  }

  const headers = ['id', 'option_label_nl', 'option_label_en'];
  const csv = arrayToCSV(allData, headers);

  const filePath = path.join(OUTPUT_DIR, 'question_options.csv');
  fs.writeFileSync(filePath, csv, 'utf-8');

  console.log(`✅ Exported ${allData.length} question options to: ${filePath}`);
}

/**
 * Create backup before import
 */
async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(OUTPUT_DIR, `backup_${timestamp}`);

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  console.log('💾 Creating backup...');

  // Backup questions
  const { data: questions } = await supabase
    .from('project_form_questions')
    .select('*')
    .order('id');

  if (questions) {
    fs.writeFileSync(
      path.join(backupDir, 'questions_backup.json'),
      JSON.stringify(questions, null, 2),
      'utf-8'
    );
  }

  // Backup options
  const { data: options } = await supabase
    .from('project_form_question_options')
    .select('*')
    .order('id');

  if (options) {
    fs.writeFileSync(
      path.join(backupDir, 'question_options_backup.json'),
      JSON.stringify(options, null, 2),
      'utf-8'
    );
  }

  console.log(`✅ Backup created at: ${backupDir}`);
  return backupDir;
}

/**
 * Validate translation data before import
 */
function validateTranslations(original: Array<Record<string, unknown>>, translated: Array<Record<string, unknown>>, idField: string = 'id'): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check if all original IDs are present
  const originalIds = new Set(original.map(item => item[idField]));
  const translatedIds = new Set(translated.map(item => item[idField]));

  originalIds.forEach(id => {
    if (!translatedIds.has(id)) {
      errors.push(`Missing ID in translations: ${id}`);
    }
  });

  // Check for duplicate IDs
  const duplicates = translated.filter((item, index, self) =>
    self.findIndex(t => t[idField] === item[idField]) !== index
  );

  if (duplicates.length > 0) {
    errors.push(`Duplicate IDs found: ${duplicates.map(d => d[idField]).join(', ')}`);
  }

  // Check for empty translations
  translated.forEach(item => {
    Object.entries(item).forEach(([key, value]) => {
      if (key !== idField && !value && typeof value === 'string') {
        errors.push(`Empty value for ${idField}=${item[idField]}, field=${key}`);
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Import translated questions
 */
async function importQuestions() {
  const filePath = path.join(OUTPUT_DIR, 'questions.csv');

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  console.log('📥 Importing questions...');

  const csvContent = fs.readFileSync(filePath, 'utf-8');
  const headers = ['id', 'question_text_nl', 'question_text_en', 'placeholder_nl', 'placeholder_en', 'help_text_nl', 'help_text_en'];
  const translations = csvToArray(csvContent, headers);

  // Fetch original data for validation with pagination
  let allOriginal: Array<Record<string, unknown>> = [];
  let offset = 0;
  const limit = 1000;
  let hasMore = true;

  console.log('Fetching original data for validation...');
  while (hasMore) {
    const { data, error } = await supabase
      .from('project_form_questions')
      .select('id, question_text_nl, question_text_en, placeholder_nl, placeholder_en, help_text_nl, help_text_en')
      .order('id')
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('❌ Could not fetch original data for validation');
      return;
    }

    if (data && data.length > 0) {
      allOriginal = allOriginal.concat(data);
      offset += limit;
      hasMore = data.length === limit;
    } else {
      hasMore = false;
    }
  }

  // Validate
  const validation = validateTranslations(allOriginal, translations);
  if (!validation.valid) {
    console.error('❌ Validation failed:');
    validation.errors.forEach(err => console.error(`  - ${err}`));
    return;
  }

  // Create backup
  await createBackup();

  // Import with batch updates
  let successCount = 0;
  let errorCount = 0;

  for (const item of translations) {
    const { id, ...updateData } = item;

    const { error } = await supabase
      .from('project_form_questions')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error(`❌ Failed to update question ${id}:`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`✅ Import complete: ${successCount} updated, ${errorCount} failed`);
}

/**
 * Import translated question options
 */
async function importOptions() {
  const filePath = path.join(OUTPUT_DIR, 'question_options.csv');

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return;
  }

  console.log('📥 Importing question options...');

  const csvContent = fs.readFileSync(filePath, 'utf-8');
  const headers = ['id', 'option_label_nl', 'option_label_en'];
  const translations = csvToArray(csvContent, headers);

  // Fetch original data for validation with pagination
  let allOriginal: Array<Record<string, unknown>> = [];
  let offset = 0;
  const limit = 1000;
  let hasMore = true;

  console.log('Fetching original data for validation...');
  while (hasMore) {
    const { data, error } = await supabase
      .from('project_form_question_options')
      .select('id, option_label_nl, option_label_en')
      .order('id')
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('❌ Could not fetch original data for validation');
      return;
    }

    if (data && data.length > 0) {
      allOriginal = allOriginal.concat(data);
      offset += limit;
      hasMore = data.length === limit;
    } else {
      hasMore = false;
    }
  }

  // Validate
  const validation = validateTranslations(allOriginal, translations);
  if (!validation.valid) {
    console.error('❌ Validation failed:');
    validation.errors.forEach(err => console.error(`  - ${err}`));
    return;
  }

  // Create backup (if not already created by questions import)
  await createBackup();

  // Import with batch updates
  let successCount = 0;
  let errorCount = 0;

  for (const item of translations) {
    const { id, ...updateData } = item;

    const { error } = await supabase
      .from('project_form_question_options')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error(`❌ Failed to update option ${id}:`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`✅ Import complete: ${successCount} updated, ${errorCount} failed`);
}

/**
 * Main CLI
 */
async function main() {
  const command = process.argv[2];

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in environment variables');
    process.exit(1);
  }

  switch (command) {
    case 'export':
      await exportQuestions();
      await exportOptions();
      console.log('\n📋 Next steps:');
      console.log('1. Open CSV files in the translations/ folder');
      console.log('2. Translate the *_nl and *_en columns');
      console.log('3. Save the files (keep the same format and IDs)');
      console.log('4. Run: npm run translation:import');
      break;

    case 'import':
      await importQuestions();
      await importOptions();
      console.log('\n✅ Import complete! Backup saved in translations/backup_*');
      break;

    case 'backup':
      await createBackup();
      break;

    default:
      console.log('Usage:');
      console.log('  npm run translation:export  - Export data to CSV');
      console.log('  npm run translation:import  - Import translated data');
      console.log('  npm run translation:backup  - Create backup only');
  }
}

main().catch(console.error);
