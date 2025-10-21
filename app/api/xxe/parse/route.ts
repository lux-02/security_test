import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const xmlText = await request.text();

    // Note: Modern browsers and Node.js have built-in XXE protections
    // This is a simulated vulnerability for demonstration purposes

    // VULNERABLE: In older XML parsers or misconfigured ones,
    // external entities would be processed

    // Check if XML contains external entity declarations
    const hasExternalEntity = xmlText.includes('<!ENTITY') || xmlText.includes('<!DOCTYPE');
    const hasSystemKeyword = xmlText.includes('SYSTEM');

    if (hasExternalEntity && hasSystemKeyword) {
      // Simulate what would happen with a vulnerable parser
      const systemMatch = xmlText.match(/SYSTEM\s+"([^"]+)"/);
      const targetFile = systemMatch ? systemMatch[1] : 'unknown';

      return NextResponse.json({
        success: false,
        warning: 'VULNERABLE: XXE attack detected!',
        vulnerability: 'XML parser would process external entities in vulnerable configurations',
        detectedEntity: targetFile,
        impact: `A vulnerable XML parser would attempt to read: ${targetFile}`,
        message: 'In a real vulnerable system, the file contents would be exposed here.',
        explanation: 'Modern parsers have XXE protection by default, but legacy systems or misconfigured parsers are vulnerable.',
      });
    }

    // Simple XML parsing simulation
    const nameMatch = xmlText.match(/<name>(.*?)<\/name>/);
    const emailMatch = xmlText.match(/<email>(.*?)<\/email>/);

    return NextResponse.json({
      success: true,
      parsed: {
        name: nameMatch ? nameMatch[1] : null,
        email: emailMatch ? emailMatch[1] : null,
      },
      warning: 'This parser simulates XXE vulnerability detection',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
