'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InsecureDeserializationPage() {
  const [serializedData, setSerializedData] = useState('{"user":"john","role":"user","isAdmin":false}');
  const [result, setResult] = useState('');

  const handleDeserialize = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/insecure-deserialization/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: serializedData }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error: ' + err);
    }
  };

  const loadMaliciousPayload = () => {
    setSerializedData('{"user":"attacker","role":"admin","isAdmin":true,"__proto__":{"isAdmin":true}}');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>Insecure Deserialization</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Vulnerabilities:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li>Deserializing untrusted data without validation</li>
          <li>No integrity checks on serialized objects</li>
          <li>Prototype pollution in JavaScript</li>
        </ul>
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
          Load Malicious Payload
        </button>
      </div>

      <form onSubmit={handleDeserialize} style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Deserialize Data</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="data" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Serialized Data (JSON):
          </label>
          <textarea
            id="data"
            value={serializedData}
            onChange={(e) => setSerializedData(e.target.value)}
            rows={6}
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
          Process Data
        </button>
      </form>

      {result && (
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
          <h3>Processing Result:</h3>
          <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
            {result}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> Insecure Deserialization</p>
        <p><strong>Risk:</strong> Application deserializes untrusted data without validation.</p>
        <p><strong>Impact:</strong></p>
        <ul>
          <li>Remote Code Execution (RCE)</li>
          <li>Privilege escalation</li>
          <li>Prototype pollution (JavaScript)</li>
          <li>Object injection attacks</li>
        </ul>
        <p><strong>JavaScript-specific risks:</strong></p>
        <pre style={{ backgroundColor: '#fff', padding: '0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
{`// Prototype pollution example
{"__proto__": {"isAdmin": true}}

// This can pollute Object.prototype
// and affect all objects in the application`}
        </pre>
      </div>
    </div>
  );
}
