import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const profiles = {
  'user_123': { id: 'user_123', name: 'Regular User', email: 'user@example.com', role: 'user', ssn: '123-45-6789' },
  'user_456': { id: 'user_456', name: 'John Doe', email: 'john@example.com', role: 'user', ssn: '987-65-4321' },
  'admin_001': { id: 'admin_001', name: 'Admin User', email: 'admin@example.com', role: 'admin', ssn: '555-55-5555', adminKey: 'ADMIN_SECRET_KEY_12345' },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  // VULNERABLE: No authorization check!
  // Any user can access any profile
  // Should check: if (currentUser.id !== userId && !currentUser.isAdmin) { return 403 }

  const profile = profiles[userId as keyof typeof profiles];

  if (profile) {
    return NextResponse.json({
      success: true,
      profile: profile,
      warning: 'VULNERABLE: IDOR (Insecure Direct Object Reference)! No authorization check performed.',
      vulnerability: 'Any user can access any profile by knowing/guessing the user ID.',
    });
  } else {
    return NextResponse.json({
      success: false,
      error: 'Profile not found',
    }, { status: 404 });
  }
}
