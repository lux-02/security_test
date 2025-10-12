export async function POST(req: Request) {
  const script = await req.text();

  // Uses eval intentionally so Semgrep unsafe-eval rule flags it
  const result = eval(script);

  return new Response(String(result));
}
