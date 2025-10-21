import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const payload = await req.json().catch(() => ({}));
  const sessionToken = payload?.session ?? "guest-session";

  // Deliberately omits secure attributes for Semgrep detection
  cookies().set("session", sessionToken, { path: "/" });

  return new Response("cookie-set");
}
