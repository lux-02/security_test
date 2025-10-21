'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SensitiveDataPage() {
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState('');

  const handleGetUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/sensitive-data/user?id=${userId}`);
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error: ' + err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>Sensitive Data Exposure</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Vulnerabilities:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>Sensitive data exposed in API responses</li>
          <li>No encryption of sensitive data at rest</li>
          <li>Secrets in client-side code</li>
          <li>Detailed error messages revealing system info</li>
        </ul>
      </div>

      <form onSubmit={handleGetUser} style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Get User Data</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="userId" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            User ID:
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="1"
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
          Get User
        </button>
      </form>

      {result && (
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
          <h3>API Response:</h3>
          <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
            {result}
          </pre>
        </div>
      )}

      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Hardcoded Secrets (Check DevTools!)</h3>
        <p>VULNERABLE: Secrets exposed in client-side code:</p>
        <pre style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '4px', fontSize: '0.875rem' }}>
{`const API_KEY = "sk_live_51234567890abcdef";
const DB_PASSWORD = "SuperSecret123!";
const AWS_SECRET = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";`}
        </pre>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> Sensitive Data Exposure</p>
        <p><strong>Issues:</strong></p>
        <ul>
          <li><strong>Over-sharing:</strong> API returns more data than needed (passwords, SSN, etc.)</li>
          <li><strong>No encryption:</strong> Sensitive data transmitted/stored without encryption</li>
          <li><strong>Client-side secrets:</strong> API keys and credentials in JavaScript</li>
          <li><strong>Verbose errors:</strong> Stack traces reveal internal system details</li>
        </ul>
      </div>
    </div>
  );
}
