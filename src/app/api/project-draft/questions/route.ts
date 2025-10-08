import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { QuestionWithOptions } from '@/types/questionnaire';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const draftId = searchParams.get('draftId');
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

    // Build query based on whether we're looking for root questions or follow-ups
    let query = supabase
      .from('project_form_questions')
      .select('*')
      .eq('service_category_id', draft.service_category_id)
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (!parentQuestionId && !parentOptionId) {
      // Get root questions (first questions for this category)
      query = query.eq('is_root_question', true);
    } else {
      // Get follow-up questions based on parent
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
