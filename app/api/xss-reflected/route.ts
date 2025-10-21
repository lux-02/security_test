import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  // VULNERABLE: Directly reflecting user input in HTML without sanitization
  const html = `
    <div>
      <p>You searched for: ${query}</p>
      <p>No results found for "${query}"</p>
    </div>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
