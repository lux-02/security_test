import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { amount, to } = body;

  // VULNERABLE: No CSRF token validation
  // In a real app, this would transfer money from the user's account

  return NextResponse.json({
    success: true,
    message: 'Transfer completed',
    amount: amount,
    to: to,
    from: 'current_user@example.com',
    transactionId: 'TXN-' + Date.now(),
    warning: 'VULNERABLE: No CSRF protection! Money transfer executed without verification.',
    vulnerability: 'An attacker could trick users into transferring money by visiting a malicious website.',
  });
}
