import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  // VULNERABLE: No CSRF token validation
  // In a real app, this would update the user's email in the database

  return NextResponse.json({
    success: true,
    message: 'Email changed successfully',
    newEmail: email,
    warning: 'VULNERABLE: No CSRF protection! This endpoint accepts requests from any origin.',
    vulnerability: 'An attacker could create a malicious page that changes the victim\'s email when visited.',
  });
}
