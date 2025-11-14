# Project Draft to Lead Conversion - Implementation Summary

## Overview
Successfully implemented a two-table architecture for handling anonymous project submissions (drafts) and converting them to verified leads (projects) after SMS verification.

---

## Architecture Decision: Two Separate Tables ✅

### **project_drafts** (Temporary, Anonymous)
- Purpose: Store incomplete/anonymous project submissions
- Lifespan: 7 days (auto-expires)
- User: Anonymous (session-based) or optional user reference
- Data: All form fields stored as columns

### **projects** (Permanent, Verified Leads)
- Purpose: Finalized, SMS-verified projects ready for professionals
- Lifespan: Permanent
- User: Required (personal_user OR company)
- Data: Complete project information with phone verification

---

## Database Schema Changes

### 1. **project_drafts Table** - New Columns Added

```sql
ALTER TABLE project_drafts ADD COLUMN:
  - city VARCHAR(100)
  - street_name VARCHAR(255)
  - street_number VARCHAR(20)
  - description TEXT
  - has_photos BOOLEAN DEFAULT FALSE
  - first_name VARCHAR(100)
  - last_name VARCHAR(100)
  - email VARCHAR(255)
  - phone VARCHAR(20)
  - company_name VARCHAR(255)
```

**Why?** General questions (Steps 2-7) are now saved as columns instead of in `project_form_answers` for better performance.

### 2. **projects Table** - Added User References

```sql
ALTER TABLE projects ADD COLUMN:
  - personal_user_id UUID REFERENCES personal_users(id) [nullable]
  - company_id UUID REFERENCES companies(id) [nullable]
  - source_draft_id UUID REFERENCES project_drafts(id) [nullable]
  - execution_timing VARCHAR(50)
  - phone_verified_at TIMESTAMPTZ

DROPPED COLUMN:
  - user_id (replaced with personal_user_id + company_id)

CONSTRAINT:
  - (request_type = 'private' AND personal_user_id IS NOT NULL AND company_id IS NULL)
    OR
  - (request_type = 'business' AND company_id IS NOT NULL AND personal_user_id IS NULL)
```

**User Model:**
- **Private requests:** `personal_user_id` is set, `company_id` is NULL
- **Business requests:** `company_id` is set, `personal_user_id` is NULL
- Mutually exclusive - never both

---

## New Database Functions

### 1. `find_or_create_personal_user()`

Searches for existing personal user by email, creates new if not found.

**Logic:**
1. Search by email
2. If found → update info and return UUID
3. If not found → create new user and return UUID

### 2. `find_or_create_company()`

Searches for existing company by email or company name + phone.

**Logic:**
1. Search by `contact_email` (primary)
2. If not found, search by `company_name` + `contact_phone`
3. If found → update info and return UUID
4. If not found → create new company and return UUID

**Why?** Prevents duplicate companies when same company creates multiple projects.

### 3. `convert_draft_to_project(p_draft_id, p_verification_code)`

Atomically converts a draft to a verified project.

**Process:**
1. Validate draft exists and not already converted
2. Validate verification code (not expired)
3. Create/find personal_user OR company (based on request_type)
4. Update projects record with all draft data
5. Transfer `project_form_answers` (category-specific only)
6. Transfer `project_photos`
7. Mark draft as converted
8. Return project UUID

---

## API Changes

### 1. **Updated:** `/api/project-draft/save-answer` (POST)

**New Logic:**
- Checks if `questionId` is a general question (Steps 2-7)
- **If general:** Saves to `project_drafts` column
- **If category-specific:** Saves to `project_form_answers` table

**Example:**
```typescript
// General question → Column
questionId: 'q-general-contact-email'
→ Updates project_drafts.email

// Category question → Answer table
questionId: 'q-kitchen-size'
→ Inserts into project_form_answers
```

### 2. **New:** `/api/project-draft/verify/send-code` (POST)

**Purpose:** Generate and send SMS verification code

**Request:**
```json
{ "draftId": "uuid" }
```

**Process:**
1. Fetch draft data
2. Validate required fields (phone, email, first_name, last_name)
3. Generate 6-digit code
4. Create/update projects record with status `pending_verification`
5. Send SMS via Twilio (commented out for dev)
6. Return projectId

**Response:**
```json
{
  "success": true,
  "projectId": "uuid",
  "devCode": "123456", // Remove in production
  "message": "Verification code sent"
}
```

### 3. **New:** `/api/project-draft/verify/confirm-code` (POST)

**Purpose:** Verify code and convert draft to project

**Request:**
```json
{
  "draftId": "uuid",
  "code": "123456"
}
```

**Process:**
1. Verify draft exists and not converted
2. Call `convert_draft_to_project()` PostgreSQL function
3. Return success with projectId

**Response:**
```json
{
  "success": true,
  "projectId": "uuid",
  "message": "Project succesvol aangemaakt!"
}
```

---

## Question Field Mapping

### General Questions → Columns

| Question ID | Step | Column Name | Type |
|-------------|------|-------------|------|
| `q-general-request-type` | 2 | `request_type` | VARCHAR |
| `q-general-execution-date` | 3 | `execution_timing` | VARCHAR |
| `q-general-photos` | 4 | `has_photos` | BOOLEAN |
| `q-general-description` | 5 | `description` | TEXT |
| `q-general-location-postcode` | 6 | `postcode` | VARCHAR |
| `q-general-location-city` | 6 | `city` | VARCHAR |
| `q-general-location-street` | 6 | `street_name` | VARCHAR |
| `q-general-location-number` | 6 | `street_number` | VARCHAR |
| `q-general-contact-firstname` | 7 | `first_name` | VARCHAR |
| `q-general-contact-lastname` | 7 | `last_name` | VARCHAR |
| `q-general-contact-phone` | 7 | `phone` | VARCHAR |
| `q-general-contact-email` | 7 | `email` | VARCHAR |
| `q-general-contact-company` | 7 | `company_name` | VARCHAR |

### Category-Specific Questions → Answers Table

All questions with `service_category_id IS NOT NULL` remain in `project_form_answers`.

---

## Verification Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Step 1-7: User fills out form                               │
│ ↓                                                            │
│ Data saved to project_drafts (columns) + answers (category) │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 8: User clicks "Verify Phone"                          │
│ ↓                                                            │
│ POST /api/project-draft/verify/send-code                    │
│   - Generate 6-digit code                                   │
│   - Create projects record (status: pending_verification)   │
│   - Send SMS via Twilio                                     │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ User enters verification code                               │
│ ↓                                                            │
│ POST /api/project-draft/verify/confirm-code                 │
│   - Validate code                                           │
│   - Call convert_draft_to_project()                         │
│     ├─ Create/find personal_user OR company                 │
│     ├─ Update projects record (status: active)              │
│     ├─ Transfer answers & photos                            │
│     └─ Mark draft as converted                              │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ ✅ Project created!                                          │
│ - Phone verified                                            │
│ - Ready for professionals to view/purchase                  │
│ - User/company record created                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Files Created/Modified

### Created:
1. `sql/02_create_projects_table.sql` - Migration script
2. `src/app/api/project-draft/verify/send-code/route.ts` - Send SMS verification
3. `src/app/api/project-draft/verify/confirm-code/route.ts` - Confirm code
4. `src/lib/questionFieldMapping.ts` - Shared field mapping utilities

### Modified:
1. `src/app/api/project-draft/save-answer/route.ts` - Updated to save general questions as columns

---

## Next Steps

### 1. **Integrate Twilio**

Install Twilio SDK:
```bash
npm install twilio
```

Add environment variables in `.env.local`:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+31XXXXXXXXX
```

Uncomment Twilio code in [send-code/route.ts:50-63](src/app/api/project-draft/verify/send-code/route.ts#L50-L63)

### 2. **Update Frontend (Step 8)**

Add OTP verification component that:
- Calls `/api/project-draft/verify/send-code` when step 8 loads
- Shows 6-digit input for verification code
- Calls `/api/project-draft/verify/confirm-code` on submit
- Redirects to success page on completion

### 3. **Test Complete Flow**

1. Create project draft (Steps 1-7)
2. Verify phone (Step 8)
3. Check that:
   - Personal user/company created
   - Projects record created with status 'active'
   - Draft marked as converted
   - Answers transferred
   - Photos transferred

### 4. **Production Checklist**

- [ ] Remove `devCode` from send-code response
- [ ] Enable Twilio SMS sending
- [ ] Add rate limiting for SMS sending (prevent spam)
- [ ] Add resend code functionality (max 3 attempts)
- [ ] Add error handling for invalid phone numbers
- [ ] Test with Dutch phone numbers (+31)
- [ ] Monitor SMS costs

---

## Benefits of This Architecture

### ✅ Performance
- Fast queries on leads (no filtering drafts)
- Direct column access (no JOINs for contact info)
- Efficient cleanup of expired drafts

### ✅ Data Integrity
- Foreign key constraints enforce relationships
- CHECK constraints prevent invalid states
- Phone verification required for leads

### ✅ Scalability
- Separate indexes for drafts vs projects
- Category-specific answers still flexible
- Easy to query "all leads for category X"

### ✅ Business Logic
- Clear separation: anonymous vs verified
- Company deduplication built-in
- Audit trail (source_draft_id)

---

## Troubleshooting

### Issue: "Cannot find name 'GENERAL_QUESTION_FIELD_MAP'"
**Solution:** Import from `@/lib/questionFieldMapping`

### Issue: Verification code expired
**Solution:** Code valid for 10 minutes. User must re-request code.

### Issue: Duplicate company created
**Solution:** Check `find_or_create_company()` logic - should search by email first

### Issue: Answers not transferred
**Solution:** Only category-specific answers transfer. General questions are in columns.

---

## Database Queries for Testing

### Check draft data:
```sql
SELECT id, first_name, last_name, email, phone, request_type, is_converted_to_project
FROM project_drafts
WHERE id = 'your-draft-id';
```

### Check if project created:
```sql
SELECT id, personal_user_id, company_id, phone_verified, status, source_draft_id
FROM projects
WHERE source_draft_id = 'your-draft-id';
```

### Check user/company created:
```sql
SELECT * FROM personal_users WHERE email = 'user@example.com';
SELECT * FROM companies WHERE contact_email = 'company@example.com';
```

### Check answers transferred:
```sql
SELECT question_id, answer_text
FROM project_form_answers
WHERE project_id = 'your-project-id';
```

---

## Contact

For questions or issues with this implementation, review:
1. Database migration: `sql/02_create_projects_table.sql`
2. Conversion function: Search for `convert_draft_to_project` in SQL files
3. API endpoints: `src/app/api/project-draft/verify/`

**Status:** ✅ Backend Complete | ⏳ Frontend Integration Pending | ⏳ Twilio Configuration Pending