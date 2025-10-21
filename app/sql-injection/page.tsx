'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SQLInjectionPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/sql-injection/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Request failed');
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await fetch(`/api/sql-injection/user?id=${userId}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Request failed');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>SQL Injection Vulnerability</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Test payloads:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>Login bypass: <code>admin' OR '1'='1</code> (username) with any password</li>
          <li>Login bypass: <code>' OR '1'='1' --</code></li>
          <li>User search: <code>1 OR 1=1</code></li>
          <li>Union attack: <code>1 UNION SELECT null, null, null</code></li>
        </ul>
      </div>

      {/* Login Form */}
      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerable Login Form</h3>
        <form onSubmit={handleLogin}>
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
              placeholder="Try: admin' OR '1'='1"
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
              placeholder="Any value"
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
            Login
          </button>
        </form>
      </div>

      {/* User Search Form */}
      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerable User Search</h3>
        <form onSubmit={handleSearch}>
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
              placeholder="Try: 1 OR 1=1"
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
      </div>

      {/* Results */}
      {result && (
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f0fdf4', marginBottom: '2rem' }}>
          <h3 style={{ marginTop: 0 }}>Query Result:</h3>
          <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(result, null, 2)}
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
        <p><strong>Type:</strong> SQL Injection</p>
        <p><strong>Risk:</strong> User input is directly concatenated into SQL queries without parameterization.</p>
        <p><strong>Impact:</strong> Attackers can:</p>
        <ul>
          <li>Bypass authentication</li>
          <li>Extract sensitive data</li>
          <li>Modify or delete database records</li>
          <li>Execute administrative operations</li>
        </ul>
        <p><strong>Vulnerable Code Pattern:</strong></p>
        <pre style={{ backgroundColor: '#fff', padding: '0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
{`// VULNERABLE
const query = \`SELECT * FROM users
WHERE username = '\${username}'
AND password = '\${password}'\`;`}
        </pre>
      </div>
    </div>
  );
}
