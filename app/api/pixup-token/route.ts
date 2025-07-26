import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = 'gomes333_6757351846';
  const clientSecret = 'e97a2f98706c0abfc096b30c354b4b03becc42dfb6182ca8eb4fe9706acdb1b0';

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