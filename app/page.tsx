export default function HomePage() {
  return (
    <main>
      <h1>Security Test Playground</h1>
      <p>
        This Next.js app intentionally includes insecure patterns designed to trigger custom
        Semgrep rules.
      </p>
      <ul>
        <li>API routes demonstrating response-based XSS exposures</li>
        <li>Cookie setting without secure attributes</li>
        <li>SSRF-prone server-side fetch calls</li>
        <li>Dynamic code execution with eval</li>
      </ul>
      <p>Do not deploy this application to production.</p>
    </main>
  );
}
