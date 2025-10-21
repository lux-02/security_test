import { NextRequest, NextResponse } from 'next/server';

// Simulated database
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', email: 'admin@example.com' },
  { id: 2, username: 'user', password: 'user123', role: 'user', email: 'user@example.com' },
  { id: 3, username: 'guest', password: 'guest123', role: 'guest', email: 'guest@example.com' },
];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  // VULNERABLE: Building SQL query with string concatenation
  // In a real app, this would be an actual SQL query
  const sqlQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  // Simulate SQL injection vulnerability
  let result;

  // Check for common SQL injection patterns
  if (
    username.includes("' OR '") ||
    username.includes("' or '") ||
    username.includes("OR 1=1") ||
    username.includes("or 1=1") ||
    username.toLowerCase().includes("' or ") ||
    username.includes("--") ||
    username.includes("#")
  ) {
    // SQL injection successful - return all users
    result = {
      success: true,
      message: 'SQL Injection successful! Authentication bypassed.',
      sqlQuery,
      users: users,
      injectionDetected: true,
    };
  } else {
    // Normal authentication
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      result = {
        success: true,
        message: 'Login successful',
        sqlQuery,
        user: { id: user.id, username: user.username, role: user.role, email: user.email },
      };
    } else {
      result = {
        success: false,
        message: 'Invalid credentials',
        sqlQuery,
      };
    }
  }

  return NextResponse.json(result);
}
