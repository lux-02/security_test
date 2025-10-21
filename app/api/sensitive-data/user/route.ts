import { NextRequest, NextResponse } from 'next/server';

const users = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@example.com',
    // VULNERABLE: Exposing sensitive data
    password: 'hashed_password_12345',
    ssn: '123-45-6789',
    creditCard: '4532-1234-5678-9010',
    salary: 85000,
    apiKey: 'sk_live_51234567890abcdef',
    internalNotes: 'VIP customer, handle with care',
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'hashed_password_67890',
    ssn: '987-65-4321',
    creditCard: '5425-2334-3010-9876',
    salary: 92000,
    apiKey: 'sk_live_abcdef1234567890',
    internalNotes: 'Complained about service',
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = parseInt(searchParams.get('id') || '0');

  const user = users.find(u => u.id === id);

  if (user) {
    // VULNERABLE: Returning ALL user data including sensitive fields
    return NextResponse.json({
      success: true,
      user: user,
      warning: 'VULNERABLE: Sensitive data exposure!',
      exposedFields: [
        'password (should never be returned)',
        'ssn (PII - should be redacted)',
        'creditCard (PCI data - should never be exposed)',
        'salary (confidential)',
        'apiKey (secret credential)',
        'internalNotes (internal only)',
      ],
    });
  } else {
    // VULNERABLE: Detailed error message reveals system information
    return NextResponse.json({
      success: false,
      error: `User with ID ${id} not found in database table 'users' on server db-prod-01.internal`,
      query: `SELECT * FROM users WHERE id = ${id}`,
      databaseVersion: 'PostgreSQL 14.2',
      warning: 'VULNERABLE: Information disclosure in error message!',
    }, { status: 404 });
  }
}
