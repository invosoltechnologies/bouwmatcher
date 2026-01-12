/**
 * Convert a Supabase storage path to a public URL
 * Handles both full URLs and file paths
 */
export function getPublicStorageUrl(pathOrUrl: string | null | undefined, bucket: string = 'service-pages'): string | null {
  if (!pathOrUrl) return null;

  // If it's already a full URL, extract the path
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    // Try to extract just the file path from signed URL or public URL
    const urlObj = new URL(pathOrUrl);
    const pathParts = urlObj.pathname.split('/');
    // Find the bucket name in the path and get everything after it
    const bucketIndex = pathParts.findIndex(part => part === bucket);
    if (bucketIndex !== -1) {
      const filePath = pathParts.slice(bucketIndex + 1).join('/');
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`;
    }
  }

  // If it's just a file path, construct the full public URL
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${pathOrUrl}`;
}

/**
 * Extract just the file path from a Supabase storage URL
 */
export function extractFilePath(url: string, bucket: string = 'service-pages'): string {
  if (!url) return '';

  // If it's a full URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const bucketIndex = pathParts.findIndex(part => part === bucket);
    if (bucketIndex !== -1) {
      return pathParts.slice(bucketIndex + 1).join('/');
    }
  }

  // If it's already a path
  return url;
}
