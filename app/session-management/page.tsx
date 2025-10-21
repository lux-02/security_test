'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SessionManagementPage() {
  const [result, setResult] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/session/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser' }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error: ' + err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/session/logout', { method: 'POST' });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error: ' + err);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>Insecure Session Management</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Vulnerabilities:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>Session fixation - session ID not regenerated on login</li>
          <li>No session timeout</li>
          <li>Predictable session tokens</li>
          <li>Session tokens in URL</li>
          <li>No secure/httpOnly cookie flags</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Session Actions</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleLogin}
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
          <button
            onClick={handleLogout}
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
            Logout
          </button>
        </div>
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
        <p><strong>Type:</strong> Broken Session Management</p>
        <p><strong>Issues:</strong></p>
        <ul>
          <li><strong>Session Fixation:</strong> Session ID not regenerated after login</li>
          <li><strong>Weak Tokens:</strong> Predictable session identifiers</li>
          <li><strong>No Timeout:</strong> Sessions never expire</li>
          <li><strong>Insecure Cookies:</strong> Missing httpOnly, secure, sameSite flags</li>
        </ul>
      </div>
    </div>
  );
}
