import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { data } = body;

  try {
    // VULNERABLE: Deserializing untrusted data without validation
    const deserializedData = JSON.parse(data);

    // Check for prototype pollution attempts
    const hasProtoPollution = data.includes('__proto__') || data.includes('constructor') || data.includes('prototype');

    // VULNERABLE: No integrity check, no signature verification
    // In languages like Java/Python, this could lead to RCE via gadget chains

    return NextResponse.json({
      success: true,
      deserializedData: deserializedData,
      warning: hasProtoPollution ?
        'VULNERABLE: Prototype pollution detected! This could affect the entire application.' :
        'VULNERABLE: Insecure deserialization! Untrusted data processed without validation.',
      vulnerabilities: [
        'No integrity check on serialized data',
        'No signature verification',
        'Direct JSON.parse without sanitization',
        'Prototype pollution possible via __proto__',
      ],
      impact: hasProtoPollution ?
        'Attacker could pollute Object.prototype and modify application behavior' :
        'In languages with binary serialization (Java, Python), this could lead to RCE',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      warning: 'Deserialization failed, but vulnerability still exists',
    }, { status: 400 });
  }
}
