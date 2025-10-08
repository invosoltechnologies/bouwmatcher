# Questionnaire Flow Documentation

## Overview

The questionnaire system allows anonymous users to start filling out a project request form without creating an account. A unique session-based draft is created, and answers are progressively saved as the user moves through the questions.

## System Architecture

### 1. Anonymous Session Creation

**When**: User selects category, postcode, and execution date on homepage
**What happens**:
1. User clicks "Project starten"
2. Frontend calls `/api/project-draft/initialize` with category slug
3. Backend:
   - Looks up service category by slug
   - Generates unique UUID session token
   - Creates `project_drafts` record
   - Stores IP address and user agent for security
   - Returns `draftId` and `sessionToken`
4. Frontend:
   - Stores `sessionToken` in localStorage
   - Redirects to `/create-project?draft={draftId}`

### 2. Question Loading (Step 1 - Category-Specific Questions)

**When**: User lands on `/create-project?draft={draftId}`
**What happens**:
1. Page extracts `draftId` from URL params
2. Calls `/api/project-draft/questions?draftId={id}` to load root question
3. Backend:
   - Validates draft exists
   - Gets service category ID from draft
   - Fetches root questions (`is_root_question = true`) for that category
   - Fetches all options for each question
   - Returns questions with options
4. Frontend displays first question with radio options

### 3. Answer Selection & Navigation

**When**: User selects an answer and clicks "Volgende"
**What happens**:

#### If selected option has follow-up (`has_follow_up = true`):
1. Save answer to history (client-side state)
2. Call `/api/project-draft/questions` with:
   - `draftId`
   - `parentQuestionId` = current question ID
   - `parentOptionId` = selected option ID
3. Backend fetches child questions matching these parent IDs
4. Display next question

#### If selected option has NO follow-up:
1. Save answer to history
2. Move to Step 2 (general questions - to be implemented)

### 4. Back Navigation

**When**: User clicks "Vorige"
**What happens**:
1. Pop last item from `questionHistory` state
2. Restore previous question
3. Pre-select previously chosen answer

If no history exists → redirect to homepage

## Database Schema

### project_drafts
Stores anonymous project sessions
```sql
- id (UUID, PK)
- service_category_id (INT8, FK)
- session_token (VARCHAR, unique) - for anonymous user tracking
- ip_address (VARCHAR)
- user_agent (TEXT)
- postcode (VARCHAR)
- execution_timing (VARCHAR)
- current_step (INT)
- last_question_id (VARCHAR)
- is_completed (BOOLEAN)
- is_converted_to_project (BOOLEAN)
- expires_at (TIMESTAMPTZ) - 7 days from creation
```

### project_form_questions
Category-specific questions with conditional branching
```sql
- id (VARCHAR, PK) - e.g., 'q-arch-root', 'q-arch-newbuild-1'
- service_category_id (INT8, FK)
- question_text_nl (TEXT)
- question_text_en (TEXT)
- question_type (VARCHAR) - radio, checkbox, text, etc.
- is_root_question (BOOLEAN) - first question in flow
- parent_question_id (VARCHAR, FK) - for conditional questions
- parent_option_id (VARCHAR) - which answer triggers this
- order_index (INT)
- is_required (BOOLEAN)
- is_active (BOOLEAN)
```

### project_form_question_options
Answer choices for each question
```sql
- id (VARCHAR, PK) - e.g., 'opt-arch-newbuild'
- question_id (VARCHAR, FK)
- option_value (VARCHAR)
- option_label_nl (VARCHAR)
- option_label_en (VARCHAR)
- has_follow_up (BOOLEAN) - triggers child questions
- order_index (INT)
- is_active (BOOLEAN)
```

### project_form_answers
User's answers (to be implemented for persistence)
```sql
- id (INT, PK)
- project_id (INT, FK, nullable)
- project_draft_id (UUID, FK, nullable)
- question_id (VARCHAR, FK)
- selected_option_id (VARCHAR)
- answer_text (TEXT) - for text inputs
```

## File Structure

### API Routes
- `/src/app/api/project-draft/initialize/route.ts` - Create draft session
- `/src/app/api/project-draft/questions/route.ts` - Fetch questions

### Pages
- `/src/app/create-project/page.tsx` - Main questionnaire UI

### Components
- `/src/components/Homepage/ProjectForm.tsx` - Search form with category/postcode
- `/src/components/Questionnaire/QuestionnaireNavbar.tsx` - Simplified navbar
- `/src/components/Questionnaire/QuestionnaireRadio.tsx` - Custom radio buttons

### Types
- `/src/types/questionnaire.ts` - TypeScript interfaces

### SQL
- `/sql/01_create_project_drafts.sql` - Draft tables schema
- `/sql/00_create_tables_string_ids.sql` - Questions tables schema
- `/sql/insert_category_questions_english_ids.sql` - Sample questions data

## Implementation Status

✅ **Completed**:
- Anonymous draft creation with session tokens
- Category lookup by slug
- Root question loading from database
- Conditional follow-up question flow
- Question history for back navigation
- Frontend UI with loading states

⏳ **To Do**:
1. API endpoint to save answers to database
2. Steps 2-8 (general questions common to all categories)
3. Photo upload functionality (Step 4)
4. Contact details collection (Step 7)
5. Convert draft to final project after verification
6. Cron job to cleanup expired drafts (7 days)
7. Add remaining 58 service categories (currently only Architect & Interior)

## Next Steps

### 1. Run SQL Scripts in Supabase
```bash
# Create draft tables
01_create_project_drafts.sql

# Create questionnaire tables
00_create_tables_string_ids.sql

# Insert sample questions (Architect & Interior)
insert_category_questions_english_ids.sql
```

### 2. Test the Flow
1. Go to homepage
2. Select "Architect" category
3. Enter postcode and execution date
4. Click "Project starten"
5. Should redirect to questionnaire with first question
6. Answer questions and see conditional branching

### 3. Add Answer Persistence
Create `/api/project-draft/save-answer` endpoint to save answers to `project_form_answers` table.

## Security Considerations

- **Session tokens**: UUID v4 for unpredictability
- **IP tracking**: Prevent abuse from same IP
- **Expiration**: Drafts auto-expire after 7 days
- **Validation**: Always verify session token matches draft ID
- **Rate limiting**: Should be added to API routes (future)

## Data Flow Diagram

```
Homepage (Select Category)
        ↓
    [API Call] Initialize Draft
        ↓
project_drafts table (new row created)
        ↓
Redirect to /create-project?draft={id}
        ↓
    [API Call] Get Questions (root)
        ↓
Display Question 1
        ↓
User Selects Answer → Save to History
        ↓
  Has Follow-up?
    ↙️         ↘️
  YES          NO
   ↓            ↓
[API] Get    Move to
Child Q's    Step 2
```
