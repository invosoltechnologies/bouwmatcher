'use client';

import '@/app/[locale]/service/service-tables.css';
import { sanitizeTableHTML } from '@/lib/utils/html-sanitizer';
import { useMemo } from 'react';

interface CostTableRow {
  [key: string]: string | number;
}

interface ServiceCostTableProps {
  heading: string;
  description?: string;
  content?: string; // CMS HTML content (optional)
  columns?: string[]; // Fallback data for non-CMS pages
  rows?: CostTableRow[]; // Fallback data for non-CMS pages
}

export default function ServiceCostTable({
  heading,
  description,
  content,
  columns,
  rows,
}: ServiceCostTableProps) {
  // Sanitize HTML content (fallback for old data that wasn't sanitized)
  // Uses regex-based sanitization for consistent server/client results
  const sanitizedContent = useMemo(() => {
    if (content && content.trim() !== '') {
      return sanitizeTableHTML(content);
    }
    return '';
  }, [content]);

  // Determine which rendering mode to use
  const useCmsContent = content && content.trim() !== '';
  const useFallbackStructured = !useCmsContent && columns && columns.length > 0 && rows && rows.length > 0;

  // Safety check - return null if no content available
  if (!useCmsContent && !useFallbackStructured) {
    return null;
  }

  return (
    <section className='py-14 md:py-20 bg-white'>
      <div className='custom-container'>
        {/* Heading and Description */}
        <div className='text-center mb-8 md:mb-[60px]'>
          <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-2 md:mb-5 px-4'>
            {heading}
          </h2>
          {description && (
            <p className='text-muted-foreground text-base md:text-2xl px-4'>
              {description}
            </p>
          )}
        </div>

        {/* Render CMS content or fallback structured table */}
        <div className='max-w-full px-0 md:max-w-6xl mx-auto md:px-0'>
          {useCmsContent ? (
            // CMS HTML Table Content from TinyMCE
            <div
              className='service-overview-table-content'
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          ) : (
            // Fallback: Render structured table for non-CMS pages
            <div className='overflow-x-auto rounded-2xl border border-neutral-200'>
              <table className='w-full'>
                {/* Table Header */}
                <thead>
                  <tr
                    style={{
                      background:
                        'linear-gradient(135deg, #0AB27E 0%, #023AA2 100%)',
                    }}
                  >
                    {columns!.map((column) => (
                      <th
                        key={column}
                        className='px-4 md:px-6 py-4 md:py-5 text-left text-xs md:text-sm font-semibold text-white whitespace-nowrap'
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {rows!.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`border-t border-neutral-200 ${
                        rowIndex % 2 === 0
                          ? 'bg-white'
                          : 'bg-gray-50/50'
                      } hover:bg-accent/5 transition-colors`}
                    >
                      {columns!.map((column) => {
                        const cellValue = row[column];
                        const isPrice =
                          typeof cellValue === 'string' &&
                          (cellValue.includes('€') ||
                            cellValue.includes('$') ||
                            cellValue.match(/^\d+[\s-]*\d+/));

                        return (
                          <td
                            key={`${rowIndex}-${column}`}
                            className='px-4 md:px-6 py-4 md:py-5 text-xs md:text-sm text-muted-foreground'
                          >
                            {isPrice ? (
                              <span
                                className='inline-block px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium text-white'
                                style={{
                                  background:
                                    'linear-gradient(135deg, rgba(10, 178, 126, 0.9) 0%, rgba(2, 58, 162, 0.9) 100%)',
                                }}
                              >
                                {cellValue}
                              </span>
                            ) : (
                              cellValue
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
