# 🤖 AI Translation Tips

## Using ChatGPT/Claude for Translation

### Step 1: Export your data
```bash
npm run translation:export
```

### Step 2: Upload CSV to AI

**Prompt for ChatGPT/Claude:**

```
I have a CSV file with translation data for a Dutch home improvement platform (Bouwmatcher).

Please translate ALL Dutch text (_nl columns) to proper, natural English in the _en columns.

Context:
- This is for homeowners creating renovation/construction projects
- Professional, clear language
- Technical terms should be accurate

Rules:
1. DO NOT modify the 'id' column
2. Translate ONLY the _nl → _en columns
3. Keep the same CSV format
4. Ensure natural, professional English
5. Preserve any HTML tags or special characters

Return the complete translated CSV file that I can directly download and use.
```

### Step 3: Review sample translations

After AI responds, check a few translations to ensure quality:

**Example translations to verify:**

| Dutch (NL) | English (EN) | ✅/❌ |
|------------|--------------|-------|
| Moet het puin ook afgevoerd worden? | Should the debris also be removed? | ✅ |
| Wat wil je laten afbreken? | What would you like to have demolished? | ✅ |
| Bedrijfspand | Commercial property | ✅ |
| Woning | Residential property | ✅ |
| Afbraakwerken | Demolition work | ✅ |

### Step 4: Download and import

Download the translated CSV from AI, then:

```bash
npm run translation:import
```

---

## Translation Quality Checklist

Before importing, verify:

- [ ] Professional tone (not too casual)
- [ ] Technical terms accurate (construction/renovation)
- [ ] Questions make sense to English speakers
- [ ] No machine-translation artifacts (e.g., "puin ook removed")
- [ ] Consistent terminology throughout
- [ ] No missing translations

---

## Common Dutch → English Construction Terms

| Dutch | English |
|-------|---------|
| Afbraakwerken | Demolition work |
| Aanbouw | Extension |
| Verbouwing | Renovation |
| Schilderwerk | Painting work |
| Timmerwerk | Carpentry |
| Stukadoor | Plasterer |
| Metselwerk | Brickwork / Masonry |
| Dakwerk | Roofing |
| Loodgieterswerk | Plumbing |
| Elektrisch werk | Electrical work |
| Vloerwerk | Flooring |
| Isolatie | Insulation |
| Kozijnen | Window frames |
| Badkamer | Bathroom |
| Keuken | Kitchen |
| Tuin | Garden |
| Terras | Patio |
| Schutting | Fence |
| Oprit | Driveway |
| Puin | Debris / Rubble |
| Offerte | Quote |
| Vakman | Tradesperson / Professional |
| Bedrijfspand | Commercial property |
| Woning | Residential property / Home |

---

## Alternative Tools

### Option 1: DeepL (Recommended for Dutch → English)
1. Go to https://www.deepl.com
2. Upload CSV file
3. Select Dutch → English
4. Download translated file

**Pros:** Very accurate for NL→EN, preserves CSV format
**Cons:** May need manual review for context-specific terms

### Option 2: Google Sheets + Formula
1. Upload CSV to Google Sheets
2. Use `=GOOGLETRANSLATE(A2, "nl", "en")` formula
3. Apply to all _en columns
4. Download as CSV

**Pros:** Free, integrated
**Cons:** Lower quality than ChatGPT/DeepL

### Option 3: Python Script (for developers)
```python
import pandas as pd
from deep_translator import GoogleTranslator

# Load CSV
df = pd.read_csv('questions.csv')

# Translate
translator = GoogleTranslator(source='nl', target='en')
df['question_text_en'] = df['question_text_nl'].apply(translator.translate)

# Save
df.to_csv('questions_translated.csv', index=False)
```

---

## Post-Import Verification

After importing, verify in your app:

1. **Create test project**: Go through project creation flow in English
2. **Check questions**: Ensure all questions display properly
3. **Check options**: Verify all radio/checkbox options are correct
4. **Test edge cases**: Long text, special characters, etc.

If something is wrong:
1. Locate backup in `translations/backup_[timestamp]/`
2. Fix specific translations in CSV
3. Re-import

---

## Batch Testing Script (Optional)

Create a simple test to verify all translations exist:

```typescript
// scripts/verify-translations.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

async function verify() {
  // Check questions
  const { data: questions } = await supabase
    .from('project_form_questions')
    .select('id, question_text_nl, question_text_en');

  const emptyEN = questions?.filter(q => !q.question_text_en);
  if (emptyEN && emptyEN.length > 0) {
    console.log('❌ Missing English translations for questions:', emptyEN.map(q => q.id));
  } else {
    console.log('✅ All questions have English translations');
  }

  // Check options
  const { data: options } = await supabase
    .from('project_form_question_options')
    .select('id, option_label_nl, option_label_en');

  const emptyENOptions = options?.filter(o => !o.option_label_en);
  if (emptyENOptions && emptyENOptions.length > 0) {
    console.log('❌ Missing English translations for options:', emptyENOptions.map(o => o.id));
  } else {
    console.log('✅ All options have English translations');
  }
}

verify();
```

Run with: `tsx scripts/verify-translations.ts`

---

## 🎯 Final Tip

**Start small!** Try exporting, translating, and importing just 5-10 rows first to get comfortable with the workflow. Once confident, process the full dataset.
