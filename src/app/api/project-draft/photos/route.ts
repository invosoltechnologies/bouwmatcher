import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const draftId = searchParams.get('draftId');

    if (!draftId) {
      return NextResponse.json(
        { error: 'Draft ID is required' },
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

    // Get all photos for this draft
    const { data: photos, error: photosError } = await supabase
      .from('project_photos')
      .select('*')
      .eq('project_draft_id', draftId)
      .eq('upload_status', 'completed')
      .order('display_order', { ascending: true });

    if (photosError) {
      console.error('Error fetching photos:', photosError);
      return NextResponse.json(
        { error: 'Failed to fetch photos' },
        { status: 500 }
      );
    }

    // Add public URLs to each photo
    const photosWithUrls = photos?.map(photo => {
      const { data: publicUrlData } = supabase.storage
        .from('project-photos')
        .getPublicUrl(photo.storage_path);

      return {
        ...photo,
        url: publicUrlData.publicUrl,
      };
    }) || [];

    return NextResponse.json({
      photos: photosWithUrls,
    });

  } catch (error) {
    console.error('Error in get photos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
