import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#dc2626' }}>🔓 Security Test Playground - DAST Testing</h1>
      <div style={{
        backgroundColor: '#fee2e2',
        border: '2px solid #dc2626',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <strong>⚠️ WARNING:</strong> This application contains intentional security vulnerabilities.
        <br />Do NOT deploy this to production or any public environment!
      </div>

      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        This Next.js app intentionally includes insecure patterns for SAST (Semgrep) and DAST testing.
      </p>

      <h2>🎯 Vulnerability Test Pages</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>

        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <h3 style={{ marginTop: 0, color: '#1f2937' }}>💉 Injection Attacks</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><Link href="/xss-reflected" style={{ color: '#2563eb' }}>Reflected XSS</Link></li>
            <li><Link href="/xss-stored" style={{ color: '#2563eb' }}>Stored XSS</Link></li>
            <li><Link href="/xss-dom" style={{ color: '#2563eb' }}>DOM-based XSS</Link></li>
            <li><Link href="/sql-injection" style={{ color: '#2563eb' }}>SQL Injection</Link></li>
            <li><Link href="/command-injection" style={{ color: '#2563eb' }}>Command Injection</Link></li>
          </ul>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <h3 style={{ marginTop: 0, color: '#1f2937' }}>🔐 Authentication & Sessions</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><Link href="/insecure-auth" style={{ color: '#2563eb' }}>Insecure Authentication</Link></li>
            <li><Link href="/session-management" style={{ color: '#2563eb' }}>Session Management</Link></li>
            <li><Link href="/broken-access" style={{ color: '#2563eb' }}>Broken Access Control</Link></li>
          </ul>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <h3 style={{ marginTop: 0, color: '#1f2937' }}>🌐 Network & Request Issues</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><Link href="/ssrf" style={{ color: '#2563eb' }}>SSRF (Server-Side Request Forgery)</Link></li>
            <li><Link href="/csrf" style={{ color: '#2563eb' }}>CSRF (Cross-Site Request Forgery)</Link></li>
            <li><Link href="/open-redirect" style={{ color: '#2563eb' }}>Open Redirect</Link></li>
          </ul>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <h3 style={{ marginTop: 0, color: '#1f2937' }}>📁 File & Data Handling</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><Link href="/file-upload" style={{ color: '#2563eb' }}>Insecure File Upload</Link></li>
            <li><Link href="/path-traversal" style={{ color: '#2563eb' }}>Path Traversal</Link></li>
            <li><Link href="/xxe" style={{ color: '#2563eb' }}>XXE (XML External Entity)</Link></li>
          </ul>
        </div>

        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <h3 style={{ marginTop: 0, color: '#1f2937' }}>🔧 Configuration & Misc</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><Link href="/sensitive-data" style={{ color: '#2563eb' }}>Sensitive Data Exposure</Link></li>
            <li><Link href="/insecure-deserialization" style={{ color: '#2563eb' }}>Insecure Deserialization</Link></li>
          </ul>
        </div>

      </div>

      <h2 style={{ marginTop: '3rem' }}>🔬 API Endpoints (for SAST)</h2>
      <ul>
        <li><code>GET /api/xss-var?message=&lt;script&gt;alert(1)&lt;/script&gt;</code></li>
        <li><code>GET /api/xss-direct?output=&lt;img src=x onerror=alert(1)&gt;</code></li>
        <li><code>POST /api/insecure-cookie</code> with JSON body</li>
        <li><code>GET /api/ssrf</code></li>
        <li><code>POST /api/eval</code> with text body</li>
        <li><code>GET /api/api-key-exposure</code></li>
      </ul>
    </main>
  );
}
