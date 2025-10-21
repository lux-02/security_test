import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { url } = body;

  try {
    // VULNERABLE: No validation of the URL
    // Allows accessing internal services, cloud metadata, etc.
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'VulnerableApp/1.0',
      },
    });

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return NextResponse.json({
      success: true,
      requestedUrl: url,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data: data,
      warning: 'VULNERABLE: SSRF detected! This endpoint fetches arbitrary URLs without validation.',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      requestedUrl: url,
      error: error.message,
      warning: 'Request failed, but SSRF vulnerability still exists.',
    });
  }
}
