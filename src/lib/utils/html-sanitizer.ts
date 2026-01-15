/**
 * Sanitizes HTML content from TinyMCE tables by removing unwanted elements,
 * classes, IDs, and inline styles while preserving the table structure and
 * semantic bold/strong tags.
 *
 * Uses regex-based sanitization for consistent results on both server and client.
 */

export function sanitizeTableHTML(html: string): string {
  if (!html || html.trim() === '') {
    return '';
  }

  // Always use regex-based sanitization for consistent server/client results
  return serverSideSanitize(html);
}

/**
 * Clean content inside table cells by removing wrapper elements
 * while preserving text and bold/strong tags
 */
function cleanCellContent(cell: Element): void {
  const childNodes = Array.from(cell.childNodes);

  childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;

      // If it's a wrapper div or p with unwanted classes, unwrap it
      if (
        element.tagName === 'DIV' ||
        element.tagName === 'P' ||
        element.tagName === 'SPAN'
      ) {
        // Check if it has classes (unwanted styled wrappers)
        if (
          element.hasAttribute('class') ||
          element.hasAttribute('style') ||
          element.hasAttribute('id')
        ) {
          // Unwrap: replace element with its contents
          const contents = Array.from(element.childNodes);
          contents.forEach((child) => {
            cell.insertBefore(child, element);
          });
          element.remove();
        } else if (element.tagName !== 'STRONG' && element.tagName !== 'B') {
          // Even without classes, unwrap divs/p/spans (keep only text and bold)
          const contents = Array.from(element.childNodes);
          contents.forEach((child) => {
            cell.insertBefore(child, element);
          });
          element.remove();
        }
      }

      // Keep strong and b tags, but remove their attributes
      if (element.tagName === 'STRONG' || element.tagName === 'B') {
        Array.from(element.attributes).forEach((attr) => {
          element.removeAttribute(attr.name);
        });
      }
    }
  });

  // Normalize whitespace
  cell.normalize();
}

/**
 * Server-side sanitization using regex (fallback when DOM is not available)
 */
function serverSideSanitize(html: string): string {
  let cleaned = html;

  // Remove colgroup and col elements
  cleaned = cleaned.replace(/<colgroup[^>]*>[\s\S]*?<\/colgroup>/gi, '');
  cleaned = cleaned.replace(/<col[^>]*\/?>/gi, '');

  // Remove all attributes from table, tbody, thead, tr, td, th
  cleaned = cleaned.replace(
    /<(table|tbody|thead|tfoot|tr|td|th)(\s+[^>]*)?>/gi,
    '<$1>'
  );

  // Remove wrapper divs and paragraphs with classes inside td/th
  cleaned = cleaned.replace(
    /<(td|th)>[\s]*<div[^>]*>([\s\S]*?)<\/div>[\s]*<\/(td|th)>/gi,
    '<$1>$2</$3>'
  );
  cleaned = cleaned.replace(
    /<(td|th)>[\s]*<p[^>]*>([\s\S]*?)<\/p>[\s]*<\/(td|th)>/gi,
    '<$1>$2</$3>'
  );

  // Remove nested divs/spans
  cleaned = cleaned.replace(/<div[^>]*>/gi, '');
  cleaned = cleaned.replace(/<\/div>/gi, '');
  cleaned = cleaned.replace(/<span[^>]*>/gi, '');
  cleaned = cleaned.replace(/<\/span>/gi, '');
  cleaned = cleaned.replace(/<p[^>]*>/gi, '');
  cleaned = cleaned.replace(/<\/p>/gi, '');

  // Clean strong/b tags (remove attributes but keep tags)
  cleaned = cleaned.replace(/<(strong|b)(\s+[^>]*)?>/gi, '<$1>');

  // Remove empty paragraphs
  cleaned = cleaned.replace(/<p>&nbsp;<\/p>/gi, '');
  cleaned = cleaned.replace(/<p>\s*<\/p>/gi, '');

  // Trim whitespace
  cleaned = cleaned.trim();

  return cleaned;
}
