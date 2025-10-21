'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReflectedXSSPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Vulnerable: directly using user input without sanitization
    const response = await fetch(`/api/xss-reflected?q=${encodeURIComponent(searchTerm)}`);
    const html = await response.text();
    setResult(html);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>Reflected XSS Vulnerability</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Test payload:</strong> <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code> or <code>&lt;img src=x onerror=alert('XSS')&gt;</code>
      </div>

      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="search" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Search Query:
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="Enter search term (try XSS payload)"
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
          Search
        </button>
      </form>

      {result && (
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <h3>Search Results:</h3>
          {/* VULNERABLE: Using dangerouslySetInnerHTML */}
          <div dangerouslySetInnerHTML={{ __html: result }} />
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> Reflected XSS (Cross-Site Scripting)</p>
        <p><strong>Risk:</strong> User input is reflected back in the response without proper encoding or sanitization.</p>
        <p><strong>Impact:</strong> Attackers can inject malicious scripts that execute in victim browsers.</p>
      </div>
    </div>
  );
}
