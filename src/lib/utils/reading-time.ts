/**
 * Calculate estimated reading time for a given text
 * @param text - The text content to analyze (can include HTML)
 * @param wordsPerMinute - Average reading speed (default: 200 words/min)
 * @returns Reading time in minutes (rounded up)
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): number {
  if (!text || text.trim().length === 0) {
    return 1; // Minimum 1 minute for empty content
  }

  // Remove HTML tags if present
  const plainText = text.replace(/<[^>]*>/g, ' ');

  // Split by whitespace and filter out empty strings
  const words = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  const wordCount = words.length;

  // Calculate reading time in minutes (round up to nearest minute)
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Ensure minimum of 1 minute
  return Math.max(1, readingTime);
}
