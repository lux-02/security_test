export async function GET(req: Request) {
  const url = new URL(req.url);

  // Directly return query param without validation to trigger Semgrep rule
  return new Response(url.searchParams.get("output"));
}
