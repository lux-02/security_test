'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SSRFPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/ssrf-fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
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

      <h1 style={{ color: '#dc2626' }}>SSRF (Server-Side Request Forgery)</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Test payloads:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li><code>http://127.0.0.1:3000/api/xss-var</code> - Access internal API</li>
          <li><code>http://localhost/admin</code> - Access internal services</li>
          <li><code>http://169.254.169.254/latest/meta-data/</code> - AWS metadata (cloud)</li>
          <li><code>file:///etc/passwd</code> - Local file access</li>
        </ul>
      </div>

      <form onSubmit={handleFetch} style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>URL Fetcher</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="url" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            URL to fetch:
          </label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="http://127.0.0.1:3000/api/xss-var"
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
          Fetch URL
        </button>
      </form>

      {result && (
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
          <h3>Response:</h3>
          <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
            {result}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> Server-Side Request Forgery (SSRF)</p>
        <p><strong>Risk:</strong> Application fetches URLs provided by users without validation.</p>
        <p><strong>Impact:</strong></p>
        <ul>
          <li>Access internal services not exposed to the internet</li>
          <li>Scan internal network</li>
          <li>Read cloud metadata (AWS, GCP, Azure)</li>
          <li>Bypass firewall restrictions</li>
        </ul>
      </div>
    </div>
  );
}
