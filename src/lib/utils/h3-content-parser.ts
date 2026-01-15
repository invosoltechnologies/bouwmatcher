/**
 * Parses HTML content and splits it by H3 tags
 * Each H3 becomes a card with the heading as title and following content as body
 *
 * Uses regex-based parsing for consistent results on both server and client
 * to avoid hydration mismatches.
 */

export interface SeoCard {
  title: string;
  content: string;
}

/**
 * Parse HTML content and extract cards based on H3 tags
 * @param html - HTML string to parse
 * @returns Array of cards with title (from H3) and content (HTML between H3s)
 */
export function parseH3Content(html: string): SeoCard[] {
  if (!html || html.trim() === '') {
    return [];
  }

  // Always use regex-based parsing for consistent server/client results
  return regexParseH3(html);
}

/**
 * Regex-based H3 parsing (consistent on server and client)
 */
function regexParseH3(html: string): SeoCard[] {
  const cards: SeoCard[] = [];

  // Find all H3 tags with their positions and text content
  const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
  let matches;
  const h3Positions: Array<{ start: number; end: number; title: string }> = [];

  // First pass: find all H3 tags and extract their text content
  while ((matches = h3Regex.exec(html)) !== null) {
    // Strip HTML tags from title to get plain text
    const titleWithHtml = matches[1];
    const titlePlainText = titleWithHtml.replace(/<[^>]*>/g, '').trim();

    h3Positions.push({
      start: matches.index,
      end: matches.index + matches[0].length,
      title: titlePlainText,
    });
  }

  // If no H3s found, return empty array
  if (h3Positions.length === 0) {
    return [];
  }

  // Second pass: extract content between H3s
  h3Positions.forEach((pos, index) => {
    // Get content from end of current H3 to start of next H3 (or end of HTML)
    const contentStart = pos.end;
    const contentEnd = h3Positions[index + 1]?.start || html.length;
    const content = html.substring(contentStart, contentEnd).trim();

    // Only add card if there's actual content
    if (content && content.length > 0) {
      cards.push({
        title: pos.title,
        content,
      });
    }
  });

  return cards;
}
