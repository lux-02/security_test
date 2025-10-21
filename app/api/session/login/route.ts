import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username } = body;

  // VULNERABLE: Predictable session token
  const sessionId = `session_${username}_${Date.now()}`;

  const response = NextResponse.json({
    success: true,
    message: 'Logged in successfully',
    sessionId: sessionId,
    vulnerabilities: [
      'Predictable session token based on username and timestamp',
      'Session ID not regenerated (session fixation possible)',
      'No session timeout configured',
      'Session token exposed in response body',
    ],
  });

  // VULNERABLE: Cookie without secure flags
  response.cookies.set('sessionId', sessionId, {
    // Missing: httpOnly, secure, sameSite
    maxAge: undefined, // No expiration!
  });

  return response;
}
