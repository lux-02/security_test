'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PathTraversalPage() {
  const [filename, setFilename] = useState('');
  const [result, setResult] = useState('');

  const handleReadFile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/path-traversal?file=${encodeURIComponent(filename)}`);
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error: ' + err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>Path Traversal Vulnerability</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Test payloads:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li><code>../package.json</code></li>
          <li><code>../../package.json</code></li>
          <li><code>../../../etc/passwd</code> (Linux)</li>
          <li><code>..\..\..\..\windows\system32\drivers\etc\hosts</code> (Windows)</li>
        </ul>
      </div>

      <form onSubmit={handleReadFile} style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Read File</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="filename" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Filename:
          </label>
          <input
            id="filename"
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="../package.json"
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
          Read File
        </button>
      </form>

      {result && (
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
          <h3>File Content:</h3>
          <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
            {result}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> Path Traversal (Directory Traversal)</p>
        <p><strong>Risk:</strong> Application uses user input to construct file paths without validation.</p>
        <p><strong>Impact:</strong></p>
        <ul>
          <li>Read sensitive system files</li>
          <li>Access configuration files with credentials</li>
          <li>Read application source code</li>
          <li>Access other users' files</li>
        </ul>
      </div>
    </div>
  );
}
