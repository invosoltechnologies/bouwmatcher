'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useState } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
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

      {/* Headings */}
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
    </div>
  );
};

export default ToolbarPlugin;
