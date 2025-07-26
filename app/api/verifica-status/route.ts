import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdminClient';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const txid = searchParams.get('txid');
    const email = searchParams.get('email');

    console.log('🔍 Verificando status:', { txid, email });

    if (!txid || !email) {
      return NextResponse.json(
        { error: 'txid e email são obrigatórios' },
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

    // Consultar API da PixUp
    const pixupResponse = await fetch(`https://api.pixupbr.com/v2/transactions/${txid}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenData.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!pixupResponse.ok) {
      console.error('❌ Erro ao consultar API PixUp:', pixupResponse.status);
      return NextResponse.json(
        { error: 'Erro ao consultar status na PixUp' },
        { status: 500 }
      );
    }

    const pixupData = await pixupResponse.json();
    console.log('📨 Resposta PixUp:', pixupData);

    const status = pixupData.status;
    const transactionId = pixupData.transactionId || txid;

    // Salvar log na tabela pix_status
    const supabase = getSupabaseAdmin();
    const { error: insertError } = await supabase
      .from('pix_status')
      .insert({
        transaction_id: transactionId,
        status: status || 'UNKNOWN',
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('❌ Erro ao salvar na tabela pix_status:', insertError);
    }

    // Atualizar pagamento_pix se status for PAID
    if (status === 'PAID') {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ pagamento_pix: true })
        .eq('email', email);

      if (updateError) {
        console.error('❌ Erro ao atualizar profiles:', updateError);
        return NextResponse.json(
          { error: 'Erro ao atualizar pagamento_pix' },
          { status: 500 }
        );
      } else {
        console.log('✅ pagamento_pix atualizado para:', email);
        return NextResponse.json({
          success: true,
          status: 'PAID',
          message: 'Pagamento confirmado e atualizado'
        });
      }
    }

    // Retornar status atual
    return NextResponse.json({
      success: true,
      status: status,
      message: `Status atual: ${status}`
    });

  } catch (error) {
    console.error('💥 Erro geral na verificação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', detalhe: (error as Error).message },
      { status: 500 }
    );
  }
} 