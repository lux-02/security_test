'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BrokenAccessPage() {
  const [userId, setUserId] = useState('');
  const [result, setResult] = useState('');

  const handleGetProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/broken-access/profile/${userId}`);
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error: ' + err);
    }
  };

  const handleDeleteUser = async (deleteId: string) => {
    try {
      const response = await fetch(`/api/broken-access/user/${deleteId}`, {
        method: 'DELETE',
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

      <h1 style={{ color: '#dc2626' }}>Broken Access Control</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Test scenarios:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>Access other users' profiles by changing user ID</li>
          <li>Access admin functions without admin role</li>
          <li>Perform privileged actions (delete, modify) on other users' data</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>IDOR: View Any User Profile</h3>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Current user: <strong>user_123</strong> (regular user)
        </p>
        <form onSubmit={handleGetProfile}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="userId" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              User ID to view:
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
              placeholder="Try: admin_001, user_456"
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
            View Profile
          </button>
        </form>
      </div>

      <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Privilege Escalation: Delete Users</h3>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          You are a regular user, but can you delete other users?
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={() => handleDeleteUser('user_456')}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Delete user_456
          </button>
          <button
            onClick={() => handleDeleteUser('admin_001')}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Delete admin_001
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
        <p><strong>Type:</strong> Broken Access Control (IDOR + Privilege Escalation)</p>
        <p><strong>Issues:</strong></p>
        <ul>
          <li><strong>IDOR:</strong> Insecure Direct Object Reference - access any user's data by ID</li>
          <li><strong>Missing Authorization:</strong> No checks if user should access this resource</li>
          <li><strong>Privilege Escalation:</strong> Regular users can perform admin actions</li>
          <li><strong>No RBAC:</strong> Role-based access control not implemented</li>
        </ul>
      </div>
    </div>
  );
}
