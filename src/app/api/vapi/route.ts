import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get the request body
    const body = await request.json();
    
    // Make request to n8n webhook
    const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`n8n request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('VAPI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
