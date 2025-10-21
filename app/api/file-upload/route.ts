import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // VULNERABLE: No file type validation
    // VULNERABLE: No file size limits
    // VULNERABLE: Using original filename without sanitization
    const filename = file.name;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // VULNERABLE: Storing in web-accessible directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadDir, filename);

    // Note: In this test app, we're simulating the upload without actually writing
    // to avoid creating malicious files on the system
    // await writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully (simulated)',
      filename: filename,
      size: buffer.length,
      path: `/uploads/${filename}`,
      vulnerabilities: [
        'No file type validation - any file type accepted',
        'No file size limit - could cause DoS',
        'Original filename used without sanitization',
        'Files would be stored in web-accessible directory',
        'No virus/malware scanning',
        'Executable files could be uploaded',
      ],
      warning: 'In a real scenario, this could lead to remote code execution!',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
