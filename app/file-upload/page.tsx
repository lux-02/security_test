'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FileUploadPage() {
  const [result, setResult] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) {
      setResult('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/file-upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error: ' + err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>Insecure File Upload</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Test payloads:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>Upload a file with double extension: <code>shell.php.jpg</code></li>
          <li>Upload executable files: <code>.exe, .sh, .php, .jsp</code></li>
          <li>Upload with null byte: <code>shell.php%00.jpg</code></li>
          <li>Large files to cause DoS</li>
        </ul>
      </div>

      <form onSubmit={handleUpload} style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Upload File</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="fileInput" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Select file:
          </label>
          <input
            id="fileInput"
            type="file"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Upload
        </button>
      </form>

      {result && (
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
          <h3>Upload Result:</h3>
          <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
            {result}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> Unrestricted File Upload</p>
        <p><strong>Vulnerabilities:</strong></p>
        <ul>
          <li>No file type validation</li>
          <li>No file size limits</li>
          <li>Files stored in web-accessible directory</li>
          <li>No virus/malware scanning</li>
          <li>Original filename preserved (no sanitization)</li>
        </ul>
        <p><strong>Impact:</strong></p>
        <ul>
          <li>Remote code execution via uploaded web shells</li>
          <li>Stored XSS via HTML/SVG files</li>
          <li>DoS via large files</li>
          <li>Overwriting system files</li>
        </ul>
      </div>
    </div>
  );
}
