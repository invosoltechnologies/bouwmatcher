-- Add profile_picture_url column to professional_profiles table
ALTER TABLE professional_profiles
ADD COLUMN profile_picture_url TEXT;

-- Create index for faster queries
CREATE INDEX idx_professional_profiles_profile_picture_url
ON professional_profiles(profile_picture_url);
