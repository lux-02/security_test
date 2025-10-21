import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// In-memory storage (simulating a database)
let comments: Array<{
  id: number;
  author: string;
  text: string;
  timestamp: string;
}> = [];

let nextId = 1;

export async function GET() {
  return NextResponse.json({ comments });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { author, text } = body;

  // VULNERABLE: Storing user input without sanitization
  const comment = {
    id: nextId++,
    author: author,
    text: text,
    timestamp: new Date().toLocaleString(),
  };

  comments.push(comment);

  return NextResponse.json({ success: true, comment });
}

// DELETE endpoint to clear comments
export async function DELETE() {
  comments = [];
  nextId = 1;
  return NextResponse.json({ success: true });
}
