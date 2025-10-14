# SQL Execution Order

Execute these SQL files in Supabase in the following order:

## 1. Initial Setup (if not already done)
```sql
-- Run these first if starting fresh:
00_create_tables_string_ids.sql          -- Creates questionnaire tables
01_create_project_drafts.sql             -- Creates project_drafts table
insert_category_questions_english_ids.sql -- Inserts Architect & Interior questions
```

## 2. New SQL Files (Run these now)
```sql
03_insert_general_questions.sql          -- ✅ Steps 2-8 general questions
04_create_users_companies_tables.sql     -- ✅ Personal users & companies tables
```

---

## What's in Each File:

### `03_insert_general_questions.sql`
Creates all general questions (Steps 2-8):
- **Step 2**: Request type (Private/Business) - 2 options
- **Step 3**: Execution date - 4 options
- **Step 4**: Photos upload (Yes/No) - 2 options
- **Step 5**: Project description - textarea
- **Step 6**: Project location - 4 text fields (postcode, city, street, number)
- **Step 7**: Contact details - **CONDITIONAL**:
  - If Private: 4 fields (firstname, lastname, phone, email)
  - If Business: 5 fields (company name, firstname, lastname, phone, email)
- **Step 8**: Phone verification - handled in frontend (OTP)

### `04_create_users_companies_tables.sql`
Creates:
- **`personal_users`** table - for private individuals
- **`companies`** table - for businesses
- Updates **`project_drafts`** table with:
  - `personal_user_id` (UUID, nullable)
  - `company_id` (UUID, nullable)
  - `request_type` (varchar: 'private' or 'business')

---

## Data Flow:

```
1. User fills Step 1 (category-specific questions)
   └─> Saved to project_form_answers

2. User fills Step 2 (request type: Private/Business)
   └─> Determines which fields show in Step 7
   └─> Saved to project_form_answers
   └─> Updates project_drafts.request_type

3. User fills Steps 3-6 (general questions)
   └─> All saved to project_form_answers

4. User fills Step 7 (contact details)
   └─> Creates entry in:
       - personal_users (if private) OR
       - companies (if business)
   └─> Links to project_drafts via:
       - personal_user_id OR
       - company_id

5. User completes Step 8 (phone verification)
   └─> Updates phone_verified = TRUE
   └─> Marks project_drafts.is_completed = TRUE
   └─> Ready to convert to final project
```

---

## Important Notes:

### Conditional Logic (Step 7):
- Questions with `parent_question_id = 'q-general-request-type'` are conditional
- `parent_option_id = 'opt-request-type-private'` → Show for private users
- `parent_option_id = 'opt-request-type-business'` → Show for business users

### General vs Category-Specific:
- **General questions**: `service_category_id = NULL`, `step_number = 2-8`
- **Category-specific**: `service_category_id = [category_id]`, `step_number = 1`

### API Query Pattern:
```typescript
// Step 1 (category-specific)
?draftId={id}

// Steps 2-8 (general)
?draftId={id}&stepNumber=2

// Step 7 conditional (based on Step 2 answer)
?draftId={id}&stepNumber=7&parentOptionId=opt-request-type-private
```

---

## Verification Checklist:

After running the SQL files:

✅ Check `project_form_questions` has:
- Step 2: 1 question (q-general-request-type)
- Step 3: 1 question (q-general-execution-date)
- Step 4: 1 question (q-general-photos)
- Step 5: 1 question (q-general-description)
- Step 6: 4 questions (location fields)
- Step 7: 9 questions (4 private + 5 business, conditional)

✅ Check `project_form_question_options`:
- Step 2: 2 options (private, business)
- Step 3: 4 options (execution dates)
- Step 4: 2 options (yes, no)

✅ Check new tables exist:
- `personal_users`
- `companies`

✅ Check `project_drafts` has new columns:
- `personal_user_id`
- `company_id`
- `request_type`
