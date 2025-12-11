import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { geocodeAddress } from '@/lib/utils/geocode-address';

/**
 * Batch save multiple answers at once
 * Reduces API calls from N to 1 for multi-field steps
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draftId, answers, currentStep } = body;

    // Validate required fields
    if (!draftId || !answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Draft ID and answers object are required' },
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

    // Build update data object
    const updateData: Record<string, string | boolean | number> = {
      updated_at: new Date().toISOString(),
    };

    if (currentStep !== undefined) {
      updateData.current_step = currentStep;
    }

    // Process each answer
    for (const [, answerValue] of Object.entries(answers)) {
      const { answerText, fieldName } = answerValue as {
        answerText: string;
        fieldName?: string;
      };

      if (fieldName) {
        // General question - add to update data
        let value: string | boolean = answerText;

        // Special handling for boolean fields
        if (fieldName === 'has_photos') {
          value = answerText === 'yes';
        }

        updateData[fieldName] = value;
      }
    }

    // Update project_drafts table with all fields at once
    const { error: updateError } = await supabase
      .from('project_drafts')
      .update(updateData)
      .eq('id', draftId);

    if (updateError) {
      console.error('[BatchSave] Error updating project draft:', updateError);
      return NextResponse.json(
        { error: 'Failed to save answers' },
        { status: 500 }
      );
    }

    // After saving, check if we should geocode
    // (Only if all location fields are present)
    const hasLocationFields =
      'postcode' in updateData &&
      'city' in updateData &&
      'street_name' in updateData &&
      'street_number' in updateData;

    if (hasLocationFields) {
      console.log('[BatchSave] All location fields saved, geocoding address...');

      const geocodeResult = await geocodeAddress({
        postcode: updateData.postcode as string,
        city: updateData.city as string,
        streetName: updateData.street_name as string,
        streetNumber: updateData.street_number as string,
      });

      if (geocodeResult) {
        console.log('[BatchSave] Geocoding successful:', geocodeResult);

        // Save coordinates
        await supabase
          .from('project_drafts')
          .update({
            latitude: geocodeResult.latitude,
            longitude: geocodeResult.longitude,
          })
          .eq('id', draftId);
      } else {
        console.warn('[BatchSave] Geocoding failed for draft:', draftId);
      }
    }

    return NextResponse.json({
      success: true,
      savedFields: Object.keys(updateData).filter((k) => k !== 'updated_at'),
    });
  } catch (error) {
    console.error('[BatchSave] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
