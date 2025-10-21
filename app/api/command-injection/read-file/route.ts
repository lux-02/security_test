import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

export const dynamic = 'force-dynamic';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { filename } = body;

  // VULNERABLE: Directly passing user input to shell command
  const command = `cat ${filename}`;

  try {
    // DANGER: This executes arbitrary commands!
    const { stdout, stderr } = await execAsync(command, { timeout: 5000 });

    return NextResponse.json({
      success: true,
      command: command,
      output: stdout,
      error: stderr,
      warning: 'VULNERABLE: Command injection via filename parameter!',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      command: command,
      error: error.message,
      output: error.stdout || '',
      stderr: error.stderr || '',
      warning: 'Command execution failed, but the vulnerability still exists.',
    });
  }
}
