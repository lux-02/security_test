'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CSRFPage() {
  const [email, setEmail] = useState('user@example.com');
  const [result, setResult] = useState('');

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/csrf/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error: ' + err);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = (document.getElementById('amount') as HTMLInputElement)?.value;
    const to = (document.getElementById('to') as HTMLInputElement)?.value;

    try {
      const response = await fetch('/api/csrf/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, to }),
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

      <h1 style={{ color: '#dc2626' }}>CSRF (Cross-Site Request Forgery)</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>How to test:</strong>
        <ol style={{ marginBottom: 0 }}>
          <li>Create an HTML file on another domain/port with a form that auto-submits to these endpoints</li>
          <li>No CSRF token is required - requests will be accepted!</li>
          <li>Attackers can trick users into performing unwanted actions</li>
        </ol>
      </div>

      {/* Change Email Form */}
      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Change Email (No CSRF Protection)</h3>
        <form onSubmit={handleChangeEmail}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              New Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Change Email
          </button>
        </form>
      </div>

      {/* Money Transfer Form */}
      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Transfer Money (No CSRF Protection)</h3>
        <form onSubmit={handleTransfer}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="amount" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Amount:
            </label>
            <input
              id="amount"
              type="number"
              defaultValue="100"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="to" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              To Account:
            </label>
            <input
              id="to"
              type="text"
              defaultValue="attacker@evil.com"
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
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Transfer
          </button>
        </form>
      </div>

      {result && (
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
          <h3>Response:</h3>
          <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
            {result}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> Cross-Site Request Forgery (CSRF)</p>
        <p><strong>Risk:</strong> Application doesn't validate that requests are intentionally made by the authenticated user.</p>
        <p><strong>Impact:</strong></p>
        <ul>
          <li>Unauthorized actions on behalf of authenticated users</li>
          <li>Change account settings</li>
          <li>Transfer money</li>
          <li>Delete data</li>
        </ul>
        <p><strong>Attack Example HTML:</strong></p>
        <pre style={{ backgroundColor: '#fff', padding: '0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
{`<form action="http://localhost:3000/api/csrf/transfer" method="POST">
  <input name="amount" value="10000" />
  <input name="to" value="attacker@evil.com" />
</form>
<script>document.forms[0].submit();</script>`}
        </pre>
      </div>
    </div>
  );
}
