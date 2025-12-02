import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get professional profile
    const { data: profileData, error: profileError } = await supabase
      .from('professional_profiles')
      .select('id, profile_answers')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profileData) {
      return NextResponse.json(
        { error: 'Professional profile not found' },
        { status: 404 }
      );
    }

    // Parse request body
    const { questionId, answer } = await request.json();

    if (!questionId || !answer) {
      return NextResponse.json(
        { error: 'Question ID and answer are required' },
        { status: 400 }
      );
    }

    // Get existing answers or create new object
    const currentAnswers = profileData.profile_answers || {};

    // Update the specific question answer
    const updatedAnswers = {
      ...currentAnswers,
      [questionId]: answer,
    };

    // Update profile with new answers
    const { error: updateError } = await supabase
      .from('professional_profiles')
      .update({ profile_answers: updatedAnswers })
      .eq('id', profileData.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update answer' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Answer updated successfully',
    });
  } catch (error) {
    console.error('Profile answers update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}