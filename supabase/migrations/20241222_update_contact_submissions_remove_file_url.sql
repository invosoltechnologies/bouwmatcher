-- Remove file_url column from contact_submissions table
-- Files are sent as email attachments only, not stored in database

ALTER TABLE public.contact_submissions
DROP COLUMN IF EXISTS file_url;

-- file_name column remains to track if an attachment was sent
