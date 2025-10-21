// Force this route to be dynamic (not prerendered at build time)
export const dynamic = 'force-dynamic';

export async function GET() {
  // Simulate server-side call into an internal IP address for Semgrep testing
  const response = await fetch("http://127.0.0.1:3000/internal-status");
  const body = await response.text();

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
