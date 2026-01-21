# Translation Export/Import Guide

## 🎯 Overview

This guide helps you safely export, translate, and import bulk translation data for your Bouwmatcher project.

## 🔒 Safety Features

- ✅ **Automatic Backup**: Creates timestamped backup before every import
- ✅ **Validation**: Checks for missing IDs, duplicates, and empty values
- ✅ **CSV Format**: Easy to edit in Excel, Google Sheets, or any CSV editor
- ✅ **Minimal Risk**: Only updates translation columns, never touches IDs or structure
- ✅ **Production Ready**: Safe for production database

---

## 📋 Step-by-Step Workflow

### Step 1: Export Current Data

Run this command to export all translatable text:

```bash
npm run translation:export
```

**What happens:**
- Creates `translations/questions.csv` - All question texts
- Creates `translations/question_options.csv` - All option labels
- Only exports ID and text columns (safe and minimal)

**Output files:**
- `translations/questions.csv` - Contains:
  - `id`, `question_text_nl`, `question_text_en`, `placeholder_nl`, `placeholder_en`, `help_text_nl`, `help_text_en`

- `translations/question_options.csv` - Contains:
  - `id`, `option_label_nl`, `option_label_en`

### Step 2: Translate the Data

**Option A: Manual Translation**
1. Open CSV files in Excel or Google Sheets
2. Translate the `*_nl` (Dutch) and `*_en` (English) columns
3. **DO NOT** modify the `id` column
4. Save files (keep same filename and format)

**Option B: AI Translation**
1. Upload CSV to ChatGPT, Claude, or DeepL
2. Ask: "Translate all Dutch (_nl) columns to proper English in the _en columns"
3. Download the translated CSV
4. Replace original files in `translations/` folder

**Example CSV before:**
```csv
id,question_text_nl,question_text_en
q-afbraakwerken-101-3,Moet het puin ook afgevoerd worden?,Should the puin ook removed worden?
```

**Example CSV after:**
```csv
id,question_text_nl,question_text_en
q-afbraakwerken-101-3,Moet het puin ook afgevoerd worden?,Should the debris also be removed?
```

### Step 3: Import Translated Data

Run this command to import translations back to database:

```bash
npm run translation:import
```

**What happens:**
1. ✅ **Validation**: Checks for data integrity
   - All original IDs are present
   - No duplicate IDs
   - No empty translations
2. 💾 **Backup**: Creates timestamped backup in `translations/backup_[timestamp]/`
3. 📥 **Import**: Updates database row by row
4. 📊 **Report**: Shows success/failure count

**If validation fails:**
- Script stops immediately (no changes made)
- Shows detailed error messages
- Fix errors in CSV and try again

**If import succeeds:**
- All translations updated in database
- Backup saved for rollback if needed
- Summary report displayed

---

## 🛡️ Safety Checklist

Before running import:

- [ ] You have exported latest data
- [ ] Translations are complete (no empty cells)
- [ ] IDs are unchanged
- [ ] CSV format is valid (no extra columns, proper encoding)
- [ ] You have `.env` variables configured:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

---

## 🔧 Advanced Usage

### Create Manual Backup Only

```bash
npm run translation:backup
```

Creates backup without importing anything.

### Rollback from Backup

If something goes wrong, restore from backup:

1. Locate backup folder: `translations/backup_[timestamp]/`
2. Use Supabase dashboard or SQL to restore:

```sql
-- Example: Restore questions from backup
-- (Use actual backup JSON data)
UPDATE project_form_questions
SET
  question_text_nl = backup.question_text_nl,
  question_text_en = backup.question_text_en
FROM (VALUES
  ('q-id-1', 'Dutch text', 'English text'),
  -- ... copy from backup JSON
) AS backup(id, question_text_nl, question_text_en)
WHERE project_form_questions.id = backup.id;
```

Or write a restore script if needed.

---

## 📊 CSV Format Guidelines

### ✅ DO:
- Keep the `id` column exactly as exported
- Use UTF-8 encoding
- Quote values with commas or newlines
- Save as `.csv` format

### ❌ DON'T:
- Modify IDs
- Add/remove columns
- Leave translations empty (unless intentional)
- Change file names
- Use Excel-specific formatting

---

## 🐛 Troubleshooting

### Error: "Missing ID in translations"
**Cause:** CSV has fewer rows than original export
**Fix:** Re-export and ensure all rows are present

### Error: "Duplicate IDs found"
**Cause:** CSV has duplicate `id` values
**Fix:** Remove duplicate rows, keep only one entry per ID

### Error: "Empty value for field"
**Cause:** Translation column is empty
**Fix:** Fill in all translation fields or mark as intentional

### Error: "File not found"
**Cause:** CSV file not in correct location
**Fix:** Ensure files are in `translations/` folder with exact names:
- `questions.csv`
- `question_options.csv`

### Error: "Missing Supabase credentials"
**Cause:** Environment variables not set
**Fix:** Check `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
SUPABASE_SERVICE_ROLE_KEY=your-key
```

---

## 🎓 Example Workflow

```bash
# 1. Export current data
npm run translation:export

# 2. Translate files (use AI or manual)
# - Open translations/questions.csv
# - Open translations/question_options.csv
# - Translate *_nl and *_en columns
# - Save files

# 3. Import translated data
npm run translation:import

# ✅ Done! Check your database for updated translations
```

---

## 📞 Support

If you encounter issues:
1. Check backup folder exists
2. Verify CSV format is correct
3. Review validation error messages
4. Test with small batch first (edit CSV to include only few rows)

**Remember:** This script is production-safe with automatic backups and validation! 🚀
