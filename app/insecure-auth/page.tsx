'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InsecureAuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // VULNERABLE: Sending credentials over unencrypted connection (in production)
      const response = await fetch('/api/insecure-auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));

      // VULNERABLE: Storing token in localStorage (XSS vulnerable)
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
    } catch (err) {
      setResult('Error: ' + err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>Insecure Authentication</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Vulnerabilities present:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>Weak password requirements (no minimum length, complexity)</li>
          <li>No rate limiting on login attempts</li>
          <li>Credentials sent in plain JSON (no HTTPS in prod scenario)</li>
          <li>Predictable session tokens</li>
          <li>Tokens stored in localStorage (vulnerable to XSS)</li>
          <li>No multi-factor authentication</li>
        </ul>
      </div>

      <form onSubmit={handleLogin} style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Login</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="admin"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="123"
          />
          <small style={{ color: '#6b7280' }}>Try: admin/admin or user/123</small>
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
          Login
        </button>
      </form>

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
        <p><strong>Type:</strong> Broken Authentication</p>
        <p><strong>Issues:</strong></p>
        <ul>
          <li><strong>Weak passwords allowed:</strong> No enforcement of strong passwords</li>
          <li><strong>No rate limiting:</strong> Brute force attacks possible</li>
          <li><strong>Insecure token storage:</strong> localStorage vulnerable to XSS</li>
          <li><strong>Predictable tokens:</strong> Session tokens can be guessed</li>
          <li><strong>No HTTPS enforcement:</strong> Credentials can be intercepted</li>
        </ul>
      </div>
    </div>
  );
}
