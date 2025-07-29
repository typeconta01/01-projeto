import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.PIXUP_CLIENT_ID as string;
  const clientSecret = process.env.PIXUP_CLIENT_SECRET as string;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'PixUp credentials not configured' },
      { status: 500 }
    );
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch('https://api.pixupbr.com/v2/oauth/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ token: data.access_token });
    } else {
      return NextResponse.json({ error: data }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter token PixUp' }, { status: 500 });
  }
} 