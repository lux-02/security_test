'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

export default function StoredXSSPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const response = await fetch('/api/xss-stored');
    const data = await response.json();
    setComments(data.comments || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/xss-stored', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ author, text }),
    });

    setAuthor('');
    setText('');
    loadComments();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#2563eb', marginBottom: '1rem', display: 'inline-block' }}>← Back to Home</Link>

      <h1 style={{ color: '#dc2626' }}>Stored XSS Vulnerability</h1>

      <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Test payload:</strong> <code>&lt;img src=x onerror=alert('Stored XSS')&gt;</code>
        <br />
        <small>The malicious script is stored in the database and executed every time the page loads.</small>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Add Comment</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="author" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Name:
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="text" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Comment:
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            required
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
          Post Comment
        </button>
      </form>

      <div>
        <h3>Comments ({comments.length})</h3>
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              border: '1px solid #ddd',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              backgroundColor: '#f9fafb'
            }}
          >
            {/* VULNERABLE: Using dangerouslySetInnerHTML for stored content */}
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: comment.author }} />
            <div style={{ marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: comment.text }} />
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{comment.timestamp}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Vulnerability Details:</h3>
        <p><strong>Type:</strong> Stored XSS (Persistent XSS)</p>
        <p><strong>Risk:</strong> Malicious scripts are permanently stored and executed for all users who view the content.</p>
        <p><strong>Impact:</strong> More dangerous than reflected XSS as it affects all users, not just the one who clicked a malicious link.</p>
      </div>
    </div>
  );
}
