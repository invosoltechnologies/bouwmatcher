import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(request: NextRequest) {
  try {
    const { photoId, draftId } = await request.json();

    if (!photoId || !draftId) {
      return NextResponse.json(
        { error: 'Photo ID and draft ID are required' },
        { status: 400 }
      );
    }

    // Get photo details
    const { data: photo, error: photoError } = await supabase
      .from('project_photos')
      .select('*')
      .eq('id', photoId)
      .eq('project_draft_id', draftId)
      .single();

    if (photoError || !photo) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('project-photos')
      .remove([photo.storage_path]);

    if (storageError) {
      console.error('Storage delete error:', storageError);
      // Continue anyway - database record should be deleted
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('project_photos')
      .delete()
      .eq('id', photoId);

    if (deleteError) {
      console.error('Database delete error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete photo' },
        { status: 500 }
      );
    }

    // If deleted photo was primary, set next photo as primary
    if (photo.is_primary) {
      const { data: nextPhoto } = await supabase
        .from('project_photos')
        .select('id')
        .eq('project_draft_id', draftId)
        .order('display_order', { ascending: true })
        .limit(1)
        .single();

      if (nextPhoto) {
        await supabase
          .from('project_photos')
          .update({ is_primary: true })
          .eq('id', nextPhoto.id);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Photo deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
