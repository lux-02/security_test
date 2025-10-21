'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DOMXSSPage() {
  const [output, setOutput] = useState('');

  useEffect(() => {
    // VULNERABLE: DOM-based XSS using URL hash
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1);
      if (hash) {
        // Vulnerable: directly injecting hash into DOM
        const decoded = decodeURIComponent(hash);
        setOutput(decoded);
      }
    }
  }, []);

  const handleClick = () => {
    // VULNERABLE: Using document.write with user input
    if (typeof window !== 'undefined') {
      const userInput = (document.getElementById('userInput') as HTMLInputElement)?.value;
      if (userInput) {
        // This is a classic DOM XSS vulnerability
        document.write(`<div>You entered: ${userInput}</div>`);
      }
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>DOM-based XSS Vulnerability</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Test methods:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>Add to URL: <code>#&lt;img src=x onerror=alert('DOM XSS')&gt;</code></li>
          <li>Try URL: <code>{typeof window !== 'undefined' ? window.location.origin : ''}/xss-dom#&lt;script&gt;alert('XSS')&lt;/script&gt;</code></li>
          <li>Enter payload in the input below</li>
        </ul>
      </div>

      {/* Vulnerability 1: innerHTML with URL hash */}
      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability 1: URL Hash Injection</h3>
        <p>Current URL hash content:</p>
        {/* VULNERABLE: Rendering unescaped user input from URL */}
        <div
          style={{ backgroundColor: '#f9fafb', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
          dangerouslySetInnerHTML={{ __html: output || '<em>No hash in URL</em>' }}
        />
      </div>

      {/* Vulnerability 2: document.write */}
      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability 2: document.write</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="userInput" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Enter text:
          </label>
          <input
            id="userInput"
            type="text"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Try: <img src=x onerror=alert('XSS')>"
          />
        </div>
        <button
          onClick={handleClick}
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Execute (document.write)
        </button>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
          Warning: This will rewrite the entire page!
        </p>
      </div>

      {/* Vulnerability 3: eval() with user input */}
      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability 3: eval() execution</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="evalInput" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            JavaScript code:
          </label>
          <input
            id="evalInput"
            type="text"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Try: alert('eval XSS')"
          />
        </div>
        <button
          onClick={() => {
            const code = (document.getElementById('evalInput') as HTMLInputElement)?.value;
            if (code) {
              // VULNERABLE: Using eval() with user input
              try {
                eval(code);
              } catch (e) {
                alert('Error: ' + e);
              }
            }
          }}
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Execute eval()
        </button>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> DOM-based XSS</p>
        <p><strong>Risk:</strong> JavaScript code processes user-controlled data in an unsafe way (URL parameters, hash, etc.)</p>
        <p><strong>Impact:</strong> Malicious scripts execute without ever being sent to the server, making it harder to detect.</p>
        <p><strong>Vulnerable Patterns:</strong></p>
        <ul>
          <li><code>dangerouslySetInnerHTML</code> with user input</li>
          <li><code>document.write()</code> with user input</li>
          <li><code>eval()</code> with user input</li>
          <li>URL hash/fragment manipulation</li>
        </ul>
      </div>
    </div>
  );
}
