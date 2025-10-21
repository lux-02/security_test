import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filename = searchParams.get('file') || '';

  // VULNERABLE: No path validation - allows directory traversal
  const filepath = path.join(process.cwd(), 'public', 'files', filename);

  try {
    const content = await readFile(filepath, 'utf-8');

    return NextResponse.json({
      success: true,
      filename: filename,
      resolvedPath: filepath,
      content: content,
      warning: 'VULNERABLE: Path traversal detected! User input used directly in file path.',
    });
  } catch (error: any) {
    // Try without the 'public/files' prefix for demonstration
    try {
      const altPath = path.join(process.cwd(), filename);
      const content = await readFile(altPath, 'utf-8');

      return NextResponse.json({
        success: true,
        filename: filename,
        resolvedPath: altPath,
        content: content.substring(0, 1000) + (content.length > 1000 ? '\n...[truncated]' : ''),
        warning: 'VULNERABLE: Successfully read file outside intended directory!',
      });
    } catch (err: any) {
      return NextResponse.json({
        success: false,
        filename: filename,
        error: err.message,
        attemptedPaths: [filepath, path.join(process.cwd(), filename)],
        warning: 'File not found, but path traversal vulnerability still exists.',
      }, { status: 404 });
    }
  }
}
