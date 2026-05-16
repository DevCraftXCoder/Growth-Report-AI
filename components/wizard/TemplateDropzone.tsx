'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useWizardState } from '@/lib/wizard/use-wizard-state';
import '@/styles/wizard.css';

export function TemplateDropzone() {
  const { setCustomTemplate } = useWizardState();
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFileName(file.name);
        setCustomTemplate(file);
      }
    },
    [setCustomTemplate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '28px 20px',
        borderRadius: 12,
        border: `2px dashed ${isDragActive ? '#7C3AED' : 'rgba(255,255,255,0.12)'}`,
        background: isDragActive ? 'rgba(124,58,237,0.08)' : 'rgba(255,255,255,0.02)',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, background 0.2s ease',
        outline: 'none',
      }}
    >
      <input {...getInputProps()} />

      {/* Upload icon */}
      <svg
        width={32}
        height={32}
        viewBox="0 0 24 24"
        fill="none"
        stroke={isDragActive ? '#7C3AED' : 'rgba(255,255,255,0.35)'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: 'stroke 0.2s ease', flexShrink: 0 }}
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>

      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 500,
          }}
        >
          {fileName
            ? fileName
            : isDragActive
            ? 'Release to upload'
            : 'Drop your template file'}
        </p>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          Accepts .md, .txt, .docx
        </p>
      </div>
    </div>
  );
}
