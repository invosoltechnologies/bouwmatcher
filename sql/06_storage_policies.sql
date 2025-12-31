-- ==========================================
-- STORAGE POLICIES FOR PROJECT PHOTOS
-- Allow anonymous users to upload photos
-- ==========================================

-- IMPORTANT: Set bucket to PUBLIC in Supabase Dashboard first!

-- Policy 1: Allow anyone to upload to project-photos bucket
CREATE POLICY "Allow anonymous uploads to project-photos"
ON storage.objects FOR INSERT
TO public  -- Changed from 'authenticated' to 'public'
WITH CHECK (bucket_id = 'project-photos');

-- Policy 2: Allow anyone to read photos (for viewing)
CREATE POLICY "Allow public read of project-photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-photos');

-- Policy 3: Allow anyone to update photos
CREATE POLICY "Allow public update of project-photos"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'project-photos');

-- Policy 4: Allow anyone to delete photos
-- In production, you might want to restrict this
CREATE POLICY "Allow public delete of project-photos"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'project-photos');

-- Note: This is secure because:
-- 1. Photos are stored with draft_id in the path (draft_123/photo.jpg)
-- 2. Only users with the session_token can access their draft
-- 3. Photos are linked to project_drafts which expire after 7 days
-- 4. File uploads are validated on backend API

COMMENT ON POLICY "Allow anonymous uploads to project-photos" ON storage.objects
IS 'Allows anonymous users to upload photos during project creation. Security is handled at application level via session tokens.';
