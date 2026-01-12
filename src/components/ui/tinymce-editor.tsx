'use client';

import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  height?: number;
}

export default function TinyMCEEditor({
  value,
  onChange,
  placeholder = 'Enter text...',
  className = '',
  height = 400,
}: TinyMCEEditorProps) {
  const editorRef = useRef<any>(null);

  return (
    <div className={className}>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={onChange}
        init={{
          height: height,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | ' +
            'blocks | ' +
            'bold italic underline strikethrough | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | ' +
            'table | image link | ' +
            'removeformat | code | help',
          blocks: [
            { title: 'Paragraph', value: 'p' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Heading 5', value: 'h5' },
            { title: 'Heading 6', value: 'h6' },
          ],
          table_toolbar:
            'tableprops tabledelete | ' +
            'tableinsertrowbefore tableinsertrowafter tabledeleterow | ' +
            'tableinsertcolbefore tableinsertcolafter tabledeletecol',
          table_appearance_options: true,
          table_grid: true,
          table_resize_bars: true,
          table_default_attributes: {
            border: '1',
          },
          table_default_styles: {
            'border-collapse': 'collapse',
            width: '100%',
          },
          content_style:
            'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; } ' +
            'table { border-collapse: collapse; width: 100%; } ' +
            'table td, table th { border: 1px solid #ddd; padding: 8px; } ' +
            'table th { background-color: #f3f4f6; font-weight: 600; }',
          placeholder: placeholder,
          branding: false,
          promotion: false,
          resize: false,
          statusbar: true,
          elementpath: false,
          image_advtab: true,
          image_caption: true,
          image_title: true,
          automatic_uploads: false,
          file_picker_types: 'image',
          file_picker_callback: (callback: any, value: any, meta: any) => {
            if (meta.filetype === 'image') {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.onchange = function () {
                const file = (input as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = function () {
                    const id = 'blobid' + new Date().getTime();
                    const blobCache = editorRef.current.editorUpload.blobCache;
                    const base64 = (reader.result as string).split(',')[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    callback(blobInfo.blobUri(), { title: file.name });
                  };
                  reader.readAsDataURL(file);
                }
              };

              input.click();
            }
          },
        }}
      />
    </div>
  );
}
