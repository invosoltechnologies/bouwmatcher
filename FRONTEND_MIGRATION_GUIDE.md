# Frontend Migration Guide: Database to Frontend Questions

## 🎯 Goal
Move general questions (Steps 2-8) from database to frontend for better performance and maintainability.

---

## ✅ What's Already Done

1. ✅ Created `src/data/generalQuestions.ts` with all questions for steps 2-8
2. ✅ Updated `/api/project-draft/save-answer` to:
   - Accept `fieldName` directly from frontend (no mapping needed!)
   - Save general questions to columns
   - Update `current_step` in database
   - Save category questions to `project_form_answers`
3. ✅ Deleted `src/lib/questionFieldMapping.ts` (no longer needed!)

---

## 📋 What You Need to Update in Frontend

### **File:** `src/components/CreateProject/CreateProjectContent.tsx`

#### **Change 1: Import frontend questions**

Add at the top:
```typescript
import { getQuestionsForStep } from '@/data/generalQuestions';
import type { Question } from '@/data/generalQuestions';
```

#### **Change 2: Update `loadQuestionsForStep` function**

**Replace the entire function with:**
```typescript
const loadQuestionsForStep = async (step: number, requestType?: 'private' | 'business') => {
  setIsLoading(true);
  try {
    if (step === 1) {
      // Step 1: Load category-specific questions from API
      const params = new URLSearchParams({ draftId: draftId! });
      const response = await fetch(`/api/project-draft/questions?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load questions');
      }

      if (data.questions && data.questions.length > 0) {
        setCurrentQuestions(data.questions);
        setCurrentQuestionIndex(0);
        setAnswers({});
      }
    } else if (step >= 2 && step <= 7) {
      // Steps 2-7: Load from frontend (no API call!)
      const questions = getQuestionsForStep(step, requestType);

      if (questions && questions.length > 0) {
        // Convert Question[] to QuestionWithOptions[] format
        const convertedQuestions = questions.map(q => ({
          id: q.id,
          question_text_nl: q.labelNl,
          question_text_en: q.labelEn,
          question_type: q.type,
          is_required: q.required,
          placeholder_nl: q.placeholderNl,
          placeholder_en: q.placeholderEn,
          help_text_nl: q.helpNl,
          help_text_en: q.helpEn,
          fieldName: q.fieldName, // Add fieldName for saving
          options: q.options?.map(opt => ({
            id: opt.value, // Use value as ID
            option_value: opt.value,
            option_label_nl: opt.labelNl,
            option_label_en: opt.labelEn,
          })) || []
        }));

        setCurrentQuestions(convertedQuestions);
        setCurrentQuestionIndex(0);
        setAnswers({});
      }
    } else if (step === 8) {
      // Step 8: Verification step
      setShowOTPVerification(true);
    }
  } catch (error) {
    console.error('Error loading questions:', error);
    alert('Er is een fout opgetreden bij het laden van de vragen.');
  } finally {
    setIsLoading(false);
  }
};
```

#### **Change 3: Update TypeScript interface**

Add `fieldName` to your question type:

```typescript
// At the top of the file, update the interface
interface QuestionWithOptions {
  id: string;
  question_text_nl: string;
  question_text_en: string;
  question_type: string;
  is_required: boolean;
  placeholder_nl?: string;
  placeholder_en?: string;
  help_text_nl?: string;
  help_text_en?: string;
  fieldName?: string; // Add this line
  options?: Array<{
    id: string;
    option_value: string;
    option_label_nl: string;
    option_label_en: string;
  }>;
}
```

#### **Change 4: Update `saveAnswer` function**

Update to send `fieldName` to API:

```typescript
const saveAnswer = async (questionId: string, selectedOptionId?: string, answerText?: string) => {
  try {
    // Find the current question to get fieldName
    const question = currentQuestions.find(q => q.id === questionId);

    await fetch('/api/project-draft/save-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        draftId,
        questionId,
        answerText,
        currentStep, // Add current step
        fieldName: question?.fieldName, // Add fieldName from question
      }),
    });
  } catch (error) {
    console.error('Error saving answer:', error);
  }
};
```

#### **Change 5: Update `saveAllCurrentAnswers` function**

For radio questions, save the **option value** directly:

```typescript
const saveAllCurrentAnswers = async () => {
  setIsSaving(true);
  try {
    await Promise.all(
      Object.entries(answers).map(([questionId, answer]) => {
        const question = currentQuestions.find(q => q.id === questionId);
        if (!question) return Promise.resolve();

        // For all question types, just pass the answer as answerText
        // Frontend questions have values like 'private', 'within_1_month', etc.
        return saveAnswer(questionId, undefined, answer);
      })
    );
  } catch (error) {
    console.error('Error saving answers:', error);
  } finally {
    setIsSaving(false);
  }
};
```

#### **Change 6: Update `moveToNextStep` for Step 7**

Update to get request type from the new question ID:

```typescript
const moveToNextStep = async () => {
  // Save all answers from current step
  await saveAllCurrentAnswers();

  // Merge current answers into all answers
  setAllAnswers(prev => ({ ...prev, ...answers }));

  // Save to history
  setQuestionHistory(prev => [...prev, {
    step: currentStep,
    questions: currentQuestions,
    answers,
  }]);

  const nextStep = currentStep + 1;

  if (nextStep > totalSteps) {
    // All steps completed
    alert('Formulier voltooid!');
    return;
  }

  setCurrentStep(nextStep);

  // Special handling for Step 7 (conditional based on Step 2)
  if (nextStep === 7) {
    // Get request type from Step 2 answer (new ID: lead_request_type)
    const requestTypeAnswer = allAnswers['lead_request_type'];
    const requestType = requestTypeAnswer === 'business' ? 'business' : 'private';
    await loadQuestionsForStep(7, requestType);
  } else {
    await loadQuestionsForStep(nextStep);
  }
};
```

---

## 🗑️ What to Clean Up (Optional - Do Later)

1. **Delete API endpoint** (no longer needed for steps 2-8):
   - `src/app/api/project-draft/questions/route.ts`

2. **Delete from database** (clean up old data):
   ```sql
   -- Delete general questions from database
   DELETE FROM project_form_question_options
   WHERE question_id IN (
     SELECT id FROM project_form_questions
     WHERE service_category_id IS NULL
   );

   DELETE FROM project_form_answers
   WHERE question_id IN (
     SELECT id FROM project_form_questions
     WHERE service_category_id IS NULL
   );

   DELETE FROM project_form_questions
   WHERE service_category_id IS NULL;
   ```

---

## 🧪 How to Test

1. **Start the project**: `npm run dev`
2. **Go to create-project page**
3. **Test each step:**
   - Step 1: Should load from API (category questions)
   - Step 2: Should load from frontend instantly (request type)
   - Step 3: Should load from frontend instantly (execution timing)
   - Step 4: Should load from frontend instantly (photos)
   - Step 5: Should load from frontend instantly (description)
   - Step 6: Should load from frontend instantly (location - 4 fields)
   - Step 7: Should load from frontend instantly (contact - different for private/business)
   - Step 8: Verification

4. **Check database after each step:**
   ```sql
   SELECT
     request_type,
     execution_timing,
     has_photos,
     description,
     city,
     first_name,
     email,
     current_step
   FROM project_drafts
   WHERE id = 'your-draft-id';
   ```

   **Expected values:**
   - `request_type`: `'private'` or `'business'`
   - `execution_timing`: `'within_1_month'`, `'1_to_3_months'`, etc.
   - `has_photos`: `true` or `false` (boolean)
   - `description`: Text string
   - `city`: City name
   - `first_name`: Contact name
   - `email`: Email address
   - `current_step`: 2, 3, 4, 5, 6, 7, etc.

---

## 🎯 Key Differences from Old System

### **Old System (Database):**
```typescript
// Complex IDs
questionId: "q-general-contact-phone"
// Option IDs stored
answer: "opt-request-type-business"
// Needed mapping to convert
```

### **New System (Frontend):**
```typescript
// Simple IDs
questionId: "lead_phone"
// Direct values stored
answer: "business"
// No mapping needed!
```

---

## 📝 API Request Format

**Old format:**
```json
{
  "draftId": "uuid",
  "questionId": "q-general-contact-phone",
  "selectedOptionId": "opt-request-type-business",
  "answerText": null
}
```

**New format:**
```json
{
  "draftId": "uuid",
  "questionId": "lead_request_type",
  "answerText": "business",
  "fieldName": "request_type",
  "currentStep": 2
}
```

**Key changes:**
- ✅ `answerText` now contains the direct value (e.g., 'business', 'within_1_month')
- ✅ `fieldName` comes from `question.fieldName` (database column name)
- ✅ `currentStep` is sent to track progress
- ❌ `selectedOptionId` is removed (not needed)

---

## 🚨 Common Issues & Solutions

### Issue: "Questions not loading"
**Solution:** Check browser console for errors. Ensure `getQuestionsForStep` is imported correctly.

### Issue: "Data not saving to database"
**Solution:**
- Check that you're sending `fieldName` in the request
- Check that `answerText` contains the actual value (not option ID)
- Check API logs for errors

### Issue: "Step 7 shows wrong fields"
**Solution:** Ensure `requestType` is passed correctly from Step 2 answer (`lead_request_type`).

### Issue: "TypeScript errors about fieldName"
**Solution:** Add `fieldName?: string` to the `QuestionWithOptions` interface.

### Issue: "has_photos saving as string instead of boolean"
**Solution:** This is handled automatically in the API. 'yes' → `true`, anything else → `false`.

---

## 🎯 Expected Benefits

After migration:

- ✅ **Instant loading** - No API calls for steps 2-8 (100ms → 0ms)
- ✅ **Type-safe** - Questions defined in TypeScript with autocomplete
- ✅ **Easier to maintain** - Edit `generalQuestions.ts` and redeploy
- ✅ **Better DX** - Version control, refactoring tools work
- ✅ **Cleaner database** - Only category-specific questions remain
- ✅ **No mapping needed** - Direct values, no transformation

---

## 📞 Need Help?

If you encounter issues, check:
1. Browser console for frontend errors
2. Network tab to see API requests/responses
3. Server logs for API errors
4. Database to verify data is saved correctly

Good luck with the migration! 🚀
