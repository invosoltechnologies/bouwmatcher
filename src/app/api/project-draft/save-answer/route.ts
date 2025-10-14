import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draftId, questionId, selectedOptionId, answerText } = body;

    // Validate required fields
    if (!draftId || !questionId) {
      return NextResponse.json(
        { error: 'Draft ID and question ID are required' },
        { status: 400 }
      );
    }

    // Verify draft exists
    const { data: draft, error: draftError } = await supabase
      .from('project_drafts')
      .select('id')
      .eq('id', draftId)
      .single();

    if (draftError || !draft) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      );
    }

    // Check if answer already exists for this question
    const { data: existingAnswer } = await supabase
      .from('project_form_answers')
      .select('id')
      .eq('project_draft_id', draftId)
      .eq('question_id', questionId)
      .single();

    let result;

    if (existingAnswer) {
      // Update existing answer
      const { data, error } = await supabase
        .from('project_form_answers')
        .update({
          selected_option_id: selectedOptionId || null,
          answer_text: answerText || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingAnswer.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating answer:', error);
        return NextResponse.json(
          { error: 'Failed to update answer' },
          { status: 500 }
        );
      }

      result = data;
    } else {
      // Create new answer
      const answerId = `ans-${randomUUID()}`;

      const { data, error } = await supabase
        .from('project_form_answers')
        .insert({
          id: answerId,
          project_draft_id: draftId,
          question_id: questionId,
          selected_option_id: selectedOptionId || null,
          answer_text: answerText || null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating answer:', error);
        return NextResponse.json(
          { error: 'Failed to save answer' },
          { status: 500 }
        );
      }

      result = data;
    }

    return NextResponse.json({
      success: true,
      answer: result,
    });

  } catch (error) {
    console.error('Error in save answer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
