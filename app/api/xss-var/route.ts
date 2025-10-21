export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const message = url.searchParams.get("message");

  /* Intentionally reflects user-controlled input without sanitization for Semgrep testing */
  return new Response(message);
}
