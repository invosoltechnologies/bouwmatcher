import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { randomUUID } from 'crypto';
import { geocodeAddress } from '@/lib/utils/geocode-address';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draftId, questionId, answerText, currentStep, fieldName } = body;

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

    // Check if this is a general question (has fieldName from frontend)
    if (fieldName) {
      // This is a general question - save to project_drafts column
      let value: string | boolean | null = answerText || null;

      // Special handling for boolean fields
      if (fieldName === 'has_photos') {
        value = answerText === 'yes';
      }

      // Prepare update data
      const updateData: Record<string, string | boolean | null | number> = {
        [fieldName]: value,
        updated_at: new Date().toISOString(),
      };

      // Update current_step if provided
      if (currentStep !== undefined) {
        updateData.current_step = currentStep;
      }

      // Update project_drafts table
      const { error: updateError } = await supabase
        .from('project_drafts')
        .update(updateData)
        .eq('id', draftId);

      if (updateError) {
        console.error('Error updating project draft:', updateError);
        return NextResponse.json(
          { error: 'Failed to save answer to draft' },
          { status: 500 }
        );
      }

      // After saving a location field, check if all location fields are complete
      // If yes, geocode the address and save coordinates
      const locationFields = ['postcode', 'city', 'street_name', 'street_number'];
      if (locationFields.includes(fieldName)) {
        // Fetch current draft to check if all location fields are filled
        const { data: currentDraft } = await supabase
          .from('project_drafts')
          .select('postcode, city, street_name, street_number, latitude, longitude')
          .eq('id', draftId)
          .single();

        if (currentDraft) {
          const hasAllLocationFields =
            currentDraft.postcode &&
            currentDraft.city &&
            currentDraft.street_name &&
            currentDraft.street_number;

          // Only geocode if all fields are present and coordinates are not already set
          if (hasAllLocationFields && !currentDraft.latitude) {
            console.log('[SaveAnswer] All location fields present, geocoding address...');

            const geocodeResult = await geocodeAddress({
              postcode: currentDraft.postcode,
              city: currentDraft.city,
              streetName: currentDraft.street_name,
              streetNumber: currentDraft.street_number,
            });

            if (geocodeResult) {
              console.log('[SaveAnswer] Geocoding successful:', geocodeResult);

              // Save coordinates to draft
              await supabase
                .from('project_drafts')
                .update({
                  latitude: geocodeResult.latitude,
                  longitude: geocodeResult.longitude,
                })
                .eq('id', draftId);
            } else {
              console.warn('[SaveAnswer] Geocoding failed for draft:', draftId);
            }
          }
        }
      }

      return NextResponse.json({
        success: true,
        savedToColumn: fieldName,
        answer: { questionId, value },
      });
    } else {
      // This is a category-specific question - save to project_form_answers
      // Check if answer already exists
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
    }

  } catch (error) {
    console.error('Error in save answer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
