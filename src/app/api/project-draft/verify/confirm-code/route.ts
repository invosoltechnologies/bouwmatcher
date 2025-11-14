import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draftId, code } = body;

    if (!draftId || !code) {
      return NextResponse.json(
        { error: 'Draft ID and verification code are required' },
        { status: 400 }
      );
    }

    // Verify draft exists
    const { data: draft, error: draftError } = await supabase
      .from('project_drafts')
      .select('id, is_converted_to_project')
      .eq('id', draftId)
      .single();

    if (draftError || !draft) {
      return NextResponse.json(
        { error: 'Draft not found' },
        { status: 404 }
      );
    }

    if (draft.is_converted_to_project) {
      return NextResponse.json(
        { error: 'Draft has already been converted' },
        { status: 400 }
      );
    }

    // Call the PostgreSQL function to convert draft to project
    const { data: projectId, error: conversionError } = await supabase
      .rpc('convert_draft_to_project', {
        p_draft_id: draftId,
        p_verification_code: code,
      });

    if (conversionError) {
      console.error('Error converting draft:', conversionError);

      // Check for specific error messages
      if (conversionError.message?.includes('Invalid or expired')) {
        return NextResponse.json(
          { error: 'Ongeldige of verlopen verificatiecode' },
          { status: 400 }
        );
      }

      if (conversionError.message?.includes('already converted')) {
        return NextResponse.json(
          { error: 'Dit project is al geverifieerd' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Verificatie mislukt. Probeer het opnieuw.' },
        { status: 500 }
      );
    }

    // Conversion successful
    return NextResponse.json({
      success: true,
      projectId,
      message: 'Project succesvol aangemaakt!',
    });

  } catch (error) {
    console.error('Error in confirm verification code:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}