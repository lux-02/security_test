import { NextRequest, NextResponse } from 'next/server';

// Simulated user database with WEAK passwords
const users = [
  { username: 'admin', password: 'admin', role: 'admin' },
  { username: 'user', password: '123', role: 'user' },
  { username: 'test', password: 'password', role: 'user' },
];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  // VULNERABLE: No rate limiting - brute force attacks possible
  // VULNERABLE: Passwords stored in plain text (simulated)
  // VULNERABLE: No password complexity requirements

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // VULNERABLE: Predictable token generation
    const token = `${user.username}-${Date.now()}`;

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        username: user.username,
        role: user.role,
      },
      vulnerabilities: [
        'No rate limiting on login attempts',
        'Weak password accepted (e.g., "123")',
        'Predictable session token',
        'Token should be stored in httpOnly cookie, not sent to client',
      ],
    });
  } else {
    // VULNERABLE: Reveals whether username exists
    const userExists = users.some(u => u.username === username);

    return NextResponse.json({
      success: false,
      message: userExists ? 'Invalid password' : 'User not found',
      vulnerability: 'Information disclosure - reveals if username exists',
    }, { status: 401 });
  }
}
