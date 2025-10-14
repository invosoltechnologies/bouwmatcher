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
      .select('id, service_category_id')
      .eq('id', draftId)
      .single();

    if (draftError || !draft) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      );
    }

    // Build query based on step number or parent relationships
    let query = supabase
      .from('project_form_questions')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (stepNumber) {
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
    } else if (!parentQuestionId && !parentOptionId) {
      // Get root questions for Step 1 (category-specific)
      query = query
        .eq('service_category_id', draft.service_category_id)
        .eq('is_root_question', true)
        .eq('step_number', 1);
    } else {
      // Get follow-up questions based on parent (still category-specific)
      query = query.eq('service_category_id', draft.service_category_id);

      if (parentQuestionId) {
        query = query.eq('parent_question_id', parentQuestionId);
      }
      if (parentOptionId) {
        query = query.eq('parent_option_id', parentOptionId);
      }
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

  } catch (error) {
    console.error('Error in get questions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
