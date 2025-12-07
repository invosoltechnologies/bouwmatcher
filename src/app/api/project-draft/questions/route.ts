import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { QuestionWithOptions } from '@/types/questionnaire';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const draftId = searchParams.get('draftId');
    const stepNumber = searchParams.get('stepNumber');
    const parentQuestionId = searchParams.get('parentQuestionId');
    const parentOptionId = searchParams.get('parentOptionId');

    if (!draftId) {
      return NextResponse.json(
        { error: 'Draft ID is required' },
        { status: 400 }
      );
    }

    // Get draft to verify it exists and get category ID
    const { data: draft, error: draftError } = await supabase
      .from('project_drafts')
      .select('id, service_category_id, subcategory_id')
      .eq('id', draftId)
      .single();

    if (draftError || !draft) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      );
    }

    // CASE 1: Initial load for Step 1 - return ROOT question with subcategories as options
    if (!stepNumber && !parentQuestionId && !parentOptionId) {
      // Get the root question for this category
      const { data: rootQuestion, error: questionError } = await supabase
        .from('project_form_questions')
        .select('*')
        .eq('service_category_id', draft.service_category_id)
        .is('service_subcategory_id', null)
        .eq('is_root_question', true)
        .eq('is_active', true)
        .eq('step_number', 1)
        .single();

      if (questionError || !rootQuestion) {
        return NextResponse.json(
          { error: 'No root question found for this category' },
          { status: 404 }
        );
      }

      // Get subcategories as options
      const { data: subcategories, error: subcatError } = await supabase
        .from('service_subcategories')
        .select('id, name_nl, name_en, slug')
        .eq('service_category_id', draft.service_category_id)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (subcatError) {
        return NextResponse.json(
          { error: 'Failed to fetch subcategories' },
          { status: 500 }
        );
      }

      // Format subcategories as question options
      const options = (subcategories || []).map((sub) => ({
        id: sub.id.toString(),
        option_value: sub.id.toString(),
        option_label_nl: sub.name_nl,
        option_label_en: sub.name_en,
        has_follow_up: true,
      }));

      return NextResponse.json({
        questions: [{
          ...rootQuestion,
          options: options
        }]
      });
    }

    // CASE 2: User selected a subcategory - load follow-up questions
    if (parentOptionId && !stepNumber) {
      const subcategoryId = parseInt(parentOptionId);

      // Save subcategory to draft
      await supabase
        .from('project_drafts')
        .update({
          subcategory_id: subcategoryId,
          updated_at: new Date().toISOString()
        })
        .eq('id', draftId);

      // Fetch questions for this subcategory
      const { data: questions, error: questionsError } = await supabase
        .from('project_form_questions')
        .select('*')
        .eq('service_subcategory_id', subcategoryId)
        .eq('is_root_question', true)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (questionsError) {
        return NextResponse.json(
          { error: 'Failed to fetch questions' },
          { status: 500 }
        );
      }

      // Fetch options for each question from project_form_question_options
      const questionsWithOptions: QuestionWithOptions[] = await Promise.all(
        (questions || []).map(async (question) => {
          const { data: options } = await supabase
            .from('project_form_question_options')
            .select('*')
            .eq('question_id', question.id)
            .eq('is_active', true)
            .order('order_index', { ascending: true });

          return {
            ...question,
            options: options || [],
          };
        })
      );

      return NextResponse.json({
        questions: questionsWithOptions,
      });
    }

    // CASE 3: Step-based questions (general questions for other steps)
    if (stepNumber) {
      let query = supabase
        .from('project_form_questions')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      // Fetch questions for a specific step (general questions)
      query = query
        .eq('step_number', parseInt(stepNumber))
        .is('service_category_id', null); // General questions have NULL category_id

      // For Step 6 and 7, we want ALL questions (not just root)
      // because they have multiple input fields displayed together
      if (parseInt(stepNumber) !== 6 && parseInt(stepNumber) !== 7) {
        query = query.eq('is_root_question', true);
      }

      // For Step 7, filter by parent option ID (private vs business)
      if (parseInt(stepNumber) === 7 && parentOptionId) {
        query = query.eq('parent_option_id', parentOptionId);
      }

      const { data: questions, error: questionsError } = await query;

      if (questionsError) {
        console.error('Error fetching questions:', questionsError);
        return NextResponse.json(
          { error: 'Failed to fetch questions' },
          { status: 500 }
        );
      }

      // Fetch options for each question
      const questionsWithOptions: QuestionWithOptions[] = await Promise.all(
        (questions || []).map(async (question) => {
          const { data: options } = await supabase
            .from('project_form_question_options')
            .select('*')
            .eq('question_id', question.id)
            .eq('is_active', true)
            .order('order_index', { ascending: true });

          return {
            ...question,
            options: options || [],
          };
        })
      );

      return NextResponse.json({
        questions: questionsWithOptions,
      });
    }

    // CASE 4: Follow-up questions based on parent relationships
    if (parentQuestionId) {
      const { data: questions, error: questionsError } = await supabase
        .from('project_form_questions')
        .select('*')
        .eq('parent_question_id', parentQuestionId)
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (questionsError) {
        console.error('Error fetching questions:', questionsError);
        return NextResponse.json(
          { error: 'Failed to fetch questions' },
          { status: 500 }
        );
      }

      // Fetch options for each question
      const questionsWithOptions: QuestionWithOptions[] = await Promise.all(
        (questions || []).map(async (question) => {
          const { data: options } = await supabase
            .from('project_form_question_options')
            .select('*')
            .eq('question_id', question.id)
            .eq('is_active', true)
            .order('order_index', { ascending: true });

          return {
            ...question,
            options: options || [],
          };
        })
      );

      return NextResponse.json({
        questions: questionsWithOptions,
      });
    }

    // Default: return empty array
    return NextResponse.json({
      questions: [],
    });

  } catch (error) {
    console.error('Error in get questions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
