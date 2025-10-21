import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  // VULNERABLE: No server-side session invalidation
  // Just removes the cookie on client side

  const response = NextResponse.json({
    success: true,
    message: 'Logged out',
    warning: 'VULNERABLE: No server-side session invalidation! Session still valid if token is known.',
  });

  // Only removes cookie, doesn't invalidate session on server
  response.cookies.delete('sessionId');

  return response;
}
