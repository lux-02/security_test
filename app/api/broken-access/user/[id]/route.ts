import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  // VULNERABLE: No role/permission check!
  // Any user can delete any other user
  // Should check: if (!currentUser.isAdmin) { return 403 }

  return NextResponse.json({
    success: true,
    message: `User ${userId} deleted successfully`,
    warning: 'VULNERABLE: Privilege escalation! Regular users can delete other users.',
    vulnerability: 'No role-based access control (RBAC) implemented.',
    impact: 'Regular users can perform administrative actions.',
  });
}
