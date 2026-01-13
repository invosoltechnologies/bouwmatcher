'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useState } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $createParagraphNode,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, HeadingTagType, $createQuoteNode } from '@lexical/rich-text';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import {
  Bold,
  Italic,
  Underline,
  Undo,
  Redo,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Pilcrow,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
} from 'lucide-react';

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const imageHtml = `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`;
          const parser = new DOMParser();
          const dom = parser.parseFromString(imageHtml, 'text/html');
          const imgElement = dom.body.firstChild as HTMLElement;
          if (imgElement) {
            selection.insertRawText(imageHtml);
          }
        }
      });
    }
  };

  const insertTable = () => {
    const rows = prompt('Number of rows:', '3');
    const cols = prompt('Number of columns:', '3');

    if (rows && cols) {
      const rowCount = parseInt(rows, 10);
      const colCount = parseInt(cols, 10);

      if (rowCount > 0 && colCount > 0 && rowCount <= 20 && colCount <= 10) {
        editor.dispatchCommand(INSERT_TABLE_COMMAND, {
          rows: String(rowCount),
          columns: String(colCount),
        });
      } else {
        alert('Please enter valid numbers (max 20 rows, 10 columns)');
      }
    }
  };

  return (
    <div className='flex items-center gap-1 p-2 border-b border-slate-300 bg-slate-50 flex-wrap'>
      {/* Undo / Redo */}
      <button
        type='button'
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className='p-2 hover:bg-slate-200 rounded transition-colors'
        aria-label='Undo'
      >
        <Undo className='w-4 h-4 text-slate-700' />
      </button>
      <button
        type='button'
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className='p-2 hover:bg-slate-200 rounded transition-colors'
        aria-label='Redo'
      >
        <Redo className='w-4 h-4 text-slate-700' />
      </button>

      <div className='w-px h-6 bg-slate-300 mx-1' />

      {/* Text Formatting */}
      <button
        type='button'
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className={`p-2 hover:bg-slate-200 rounded transition-colors ${
          isBold ? 'bg-slate-300' : ''
        }`}
        aria-label='Bold'
      >
        <Bold className='w-4 h-4 text-slate-700' />
      </button>
      <button
        type='button'
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className={`p-2 hover:bg-slate-200 rounded transition-colors ${
          isItalic ? 'bg-slate-300' : ''
        }`}
        aria-label='Italic'
      >
        <Italic className='w-4 h-4 text-slate-700' />
      </button>
      <button
        type='button'
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
        }
        className={`p-2 hover:bg-slate-200 rounded transition-colors ${
          isUnderline ? 'bg-slate-300' : ''
        }`}
        aria-label='Underline'
      >
        <Underline className='w-4 h-4 text-slate-700' />
      </button>

      <div className='w-px h-6 bg-slate-300 mx-1' />

      {/* Block Formatting */}
      <button
        type='button'
        onClick={formatParagraph}
        className='p-2 hover:bg-slate-200 rounded transition-colors'
        aria-label='Paragraph'
      >
        <Pilcrow className='w-4 h-4 text-slate-700' />
      </button>
      <button
        type='button'
        onClick={() => formatHeading('h2')}
        className='p-2 hover:bg-slate-200 rounded transition-colors'
        aria-label='Heading 2'
      >
        <Heading2 className='w-4 h-4 text-slate-700' />
      </button>
      <button
        type='button'
        onClick={() => formatHeading('h3')}
        className='p-2 hover:bg-slate-200 rounded transition-colors'
        aria-label='Heading 3'
      >
        <Heading3 className='w-4 h-4 text-slate-700' />
      </button>

      <div className='w-px h-6 bg-slate-300 mx-1' />

      {/* Lists */}
      <button
        type='button'
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
        className='p-2 hover:bg-slate-200 rounded transition-colors'
        aria-label='Bullet List'
      >
        <List className='w-4 h-4 text-slate-700' />
      </button>
      <button
        type='button'
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
        className='p-2 hover:bg-slate-200 rounded transition-colors'
        aria-label='Numbered List'
      >
        <ListOrdered className='w-4 h-4 text-slate-700' />
      </button>

      <div className='w-px h-6 bg-slate-300 mx-1' />

      {/* Link, Image, and Table */}
      <button
        type='button'
        onClick={insertLink}
        className='p-2 hover:bg-slate-200 rounded transition-colors'
        aria-label='Insert Link'
      >
        <LinkIcon className='w-4 h-4 text-slate-700' />
      </button>
      <button
        type='button'
        onClick={insertImage}
        className='p-2 hover:bg-slate-200 rounded transition-colors'
        aria-label='Insert Image'
      >
        <ImageIcon className='w-4 h-4 text-slate-700' />
      </button>
      <button
        type='button'
        onClick={insertTable}
        className='p-2 hover:bg-slate-200 rounded transition-colors'
        aria-label='Insert Table'
      >
        <TableIcon className='w-4 h-4 text-slate-700' />
      </button>
    </div>
  );
};

export default ToolbarPlugin;
