'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CommandInjectionPage() {
  const [hostname, setHostname] = useState('');
  const [filename, setFilename] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handlePing = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/command-injection/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostname }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setError('Request failed: ' + err);
    }
  };

  const handleFileRead = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/command-injection/read-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setError('Request failed: ' + err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>Command Injection Vulnerability</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Test payloads:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>Ping: <code>127.0.0.1; ls -la</code></li>
          <li>Ping: <code>127.0.0.1 && whoami</code></li>
          <li>Ping: <code>127.0.0.1 | cat /etc/passwd</code></li>
          <li>File: <code>test.txt; ls -la</code></li>
          <li>File: <code>$(whoami).txt</code></li>
        </ul>
      </div>

      {/* Ping Tool */}
      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerable Ping Tool</h3>
        <form onSubmit={handlePing}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="hostname" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Hostname or IP:
            </label>
            <input
              id="hostname"
              type="text"
              value={hostname}
              onChange={(e) => setHostname(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
              placeholder="Try: 127.0.0.1; ls -la"
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
            Execute Ping
          </button>
        </form>
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <strong>How it works:</strong> The server executes: <code>ping -c 4 [your_input]</code>
        </div>
      </div>

      {/* File Read Tool */}
      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerable File Reader</h3>
        <form onSubmit={handleFileRead}>
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
              placeholder="Try: test.txt; ls"
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
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          <strong>How it works:</strong> The server executes: <code>cat [your_input]</code>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f0fdf4', marginBottom: '2rem' }}>
          <h3 style={{ marginTop: 0 }}>Command Output:</h3>
          <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
            {result}
          </pre>
        </div>
      )}

      {error && (
        <div style={{ border: '1px solid #dc2626', padding: '1rem', borderRadius: '8px', backgroundColor: '#fee2e2', marginBottom: '2rem' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> Command Injection (OS Command Injection)</p>
        <p><strong>Risk:</strong> User input is passed directly to system commands without proper validation.</p>
        <p><strong>Impact:</strong> Attackers can:</p>
        <ul>
          <li>Execute arbitrary system commands</li>
          <li>Read sensitive files</li>
          <li>Modify or delete files</li>
          <li>Establish reverse shells</li>
          <li>Completely compromise the server</li>
        </ul>
        <p><strong>Vulnerable Code Pattern:</strong></p>
        <pre style={{ backgroundColor: '#fff', padding: '0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
{`// VULNERABLE (Node.js)
const { exec } = require('child_process');
exec(\`ping -c 4 \${userInput}\`, callback);

// VULNERABLE (Python)
os.system(f"ping -c 4 {user_input}")`}
        </pre>
        <p><strong>Common Injection Characters:</strong> <code>; | & $ ` \\ ( ) &lt; &gt; &gt;&gt; * ? [ ]</code></p>
      </div>
    </div>
  );
}
