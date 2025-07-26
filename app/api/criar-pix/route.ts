import { NextRequest, NextResponse } from 'next/server';

interface PixRequest {
  payer: {
    email: string;
    name: string;
  };
  value: number;
  description: string;
  postbackUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PixRequest = await request.json();
    
    console.log('💰 Criando cobrança PIX:', body);

    // Validar dados obrigatórios
    if (!body.payer?.email || !body.payer?.name || !body.value || !body.description) {
      return NextResponse.json(
        { error: 'Dados obrigatórios: payer.email, payer.name, value, description' },
        { status: 400 }
      );
    }

    // Obter token da PixUp
    const tokenResponse = await fetch(`${request.nextUrl.origin}/api/pixup-token`);
    const tokenData = await tokenResponse.json();

    if (!tokenData.token) {
      console.error('❌ Erro ao obter token PixUp:', tokenData);
      return NextResponse.json(
        { error: 'Erro ao obter token de autenticação' },
        { status: 500 }
      );
    }

    // Criar cobrança na PixUp
    const pixupResponse = await fetch('https://api.pixupbr.com/v2/qr-code', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payer: {
          email: body.payer.email,
          name: body.payer.name
        },
        value: body.value,
        description: body.description,
        postbackUrl: body.postbackUrl || `${request.nextUrl.origin}/api/pixup-webhook`
      })
    });

    const pixupData = await pixupResponse.json();

    if (pixupResponse.ok) {
      console.log('✅ Cobrança PIX criada:', pixupData);
      return NextResponse.json({
        success: true,
        data: pixupData
      });
    } else {
      console.error('❌ Erro ao criar cobrança PIX:', pixupData);
      return NextResponse.json(
        { error: 'Erro ao criar cobrança PIX', details: pixupData },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('💥 Erro geral ao criar PIX:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', detalhe: (error as Error).message },
      { status: 500 }
    );
  }
} 