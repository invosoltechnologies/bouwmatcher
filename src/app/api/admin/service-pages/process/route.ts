import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const service_page_id = searchParams.get('service_page_id');

    if (!service_page_id) {
      return NextResponse.json(
        { error: 'service_page_id is required' },
        { status: 400 }
      );
    }

    // Get process section
    const { data: processData, error: processError } = await supabase
      .from('service_page_process')
      .select('*')
      .eq('service_page_id', service_page_id)
      .single();

    if (processError && processError.code === 'PGRST116') {
      // No rows found
      return NextResponse.json(null);
    }

    if (processError) {
      console.error('Supabase error:', processError);
      return NextResponse.json(
        { error: 'Failed to fetch process section' },
        { status: 500 }
      );
    }

    // Get process steps
    const { data: stepsData, error: stepsError } = await supabase
      .from('service_page_process_steps')
      .select('*')
      .eq('process_id', processData.id)
      .order('step_order', { ascending: true });

    if (stepsError) {
      console.error('Supabase error:', stepsError);
      return NextResponse.json(
        { error: 'Failed to fetch process steps' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...processData,
      steps: stepsData || [],
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const {
      service_page_id,
      heading_nl,
      heading_en,
      description_nl,
      description_en,
      steps,
    } = body;

    // Validate step count
    if (!Array.isArray(steps) || steps.length < 4 || steps.length > 8) {
      return NextResponse.json(
        { error: 'Process must have between 4 and 8 steps' },
        { status: 400 }
      );
    }

    // Check if process exists
    const { data: existingProcess } = await supabase
      .from('service_page_process')
      .select('id')
      .eq('service_page_id', service_page_id)
      .single();

    let processId: string;

    if (existingProcess) {
      // Update existing process
      const { error: updateError } = await supabase
        .from('service_page_process')
        .update({
          heading_nl,
          heading_en,
          description_nl,
          description_en,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingProcess.id);

      if (updateError) {
        console.error('Update error:', updateError);
        return NextResponse.json(
          { error: 'Failed to update process section' },
          { status: 500 }
        );
      }

      processId = existingProcess.id;

      // Delete existing steps
      await supabase
        .from('service_page_process_steps')
        .delete()
        .eq('process_id', processId);
    } else {
      // Create new process
      const { data: newProcess, error: insertError } = await supabase
        .from('service_page_process')
        .insert({
          service_page_id,
          heading_nl,
          heading_en,
          description_nl,
          description_en,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        return NextResponse.json(
          { error: 'Failed to create process section' },
          { status: 500 }
        );
      }

      processId = newProcess.id;
    }

    // Insert new steps
    const stepsToInsert = steps.map((step: any) => ({
      process_id: processId,
      heading_nl: step.heading_nl,
      heading_en: step.heading_en,
      description_nl: step.description_nl,
      description_en: step.description_en,
      image_url: step.image_url || null,
      icon_url: step.icon_url || null,
      step_order: step.step_order,
    }));

    const { data: insertedSteps, error: stepsInsertError } = await supabase
      .from('service_page_process_steps')
      .insert(stepsToInsert)
      .select();

    if (stepsInsertError) {
      console.error('Steps insert error:', stepsInsertError);
      return NextResponse.json(
        { error: 'Failed to save process steps' },
        { status: 500 }
      );
    }

    // Get updated process
    const { data: updatedProcess, error: fetchError } = await supabase
      .from('service_page_process')
      .select('*')
      .eq('id', processId)
      .single();

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch updated process' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: existingProcess
          ? 'Process section updated successfully'
          : 'Process section created successfully',
        process: {
          ...updatedProcess,
          steps: insertedSteps,
        },
      },
      { status: existingProcess ? 200 : 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
