import { NextRequest, NextResponse } from 'next/server';

// Simulated database
const users = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', ssn: '123-45-6789' },
  { id: 2, username: 'user', email: 'user@example.com', role: 'user', ssn: '987-65-4321' },
  { id: 3, username: 'guest', email: 'guest@example.com', role: 'guest', ssn: '555-55-5555' },
  { id: 4, username: 'testuser', email: 'test@example.com', role: 'user', ssn: '111-22-3333' },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  // VULNERABLE: Building SQL query with string concatenation
  const sqlQuery = `SELECT * FROM users WHERE id = ${id}`;

  let result;

  // Simulate SQL injection vulnerability
  if (id && (id.includes('OR') || id.includes('or') || id.includes('UNION') || id.includes('union'))) {
    // SQL injection successful - return all users
    result = {
      success: true,
      message: 'SQL Injection successful! All records exposed.',
      sqlQuery,
      users: users,
      injectionDetected: true,
      warning: 'In a real attack, this could expose the entire database!',
    };
  } else {
    // Normal query
    const userId = parseInt(id || '0');
    const user = users.find(u => u.id === userId);

    if (user) {
      result = {
        success: true,
        message: 'User found',
        sqlQuery,
        user,
      };
    } else {
      result = {
        success: false,
        message: 'User not found',
        sqlQuery,
      };
    }
  }

  return NextResponse.json(result);
}
