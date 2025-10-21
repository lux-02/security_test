'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OpenRedirectPage() {
  const [redirectUrl, setRedirectUrl] = useState('');
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [countdown, redirectUrl]);

  const handleRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (redirectUrl) {
      setCountdown(3);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>Open Redirect Vulnerability</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Test payloads:</strong>
        <ul style={{ marginBottom: 0 }}>
          <li><code>http://evil.com</code></li>
          <li><code>https://phishing-site.com</code></li>
          <li>URL parameter: <code>?redirect=http://evil.com</code></li>
        </ul>
      </div>

      <form onSubmit={handleRedirect} style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Redirect Tool</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="url" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Redirect URL:
          </label>
          <input
            id="url"
            type="text"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            placeholder="https://example.com"
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
          Redirect
        </button>
      </form>

      {countdown !== null && countdown > 0 && (
        <div style={{ border: '1px solid #2563eb', padding: '1rem', borderRadius: '8px', backgroundColor: '#dbeafe', marginBottom: '2rem' }}>
          <strong>Redirecting in {countdown} seconds to:</strong>
          <div style={{ marginTop: '0.5rem', wordBreak: 'break-all' }}>{redirectUrl}</div>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> Open Redirect (Unvalidated Redirects)</p>
        <p><strong>Risk:</strong> Application redirects to URLs provided by users without validation.</p>
        <p><strong>Impact:</strong></p>
        <ul>
          <li>Phishing attacks (redirect to fake login pages)</li>
          <li>Malware distribution</li>
          <li>Bypass security filters</li>
          <li>Exploit trust in legitimate domain</li>
        </ul>
        <p><strong>Attack Example:</strong></p>
        <code>https://trusted-site.com/redirect?url=http://phishing.com</code>
      </div>
    </div>
  );
}
