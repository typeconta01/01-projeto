import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdminClient';

export async function POST(request: Request) {
  try {
    console.log('🚨 Webhook PixUp recebido');

    const supabase = getSupabaseAdmin();

    const body = await request.json();

    const status = body?.status;
    const email = body?.email?.trim().toLowerCase(); // Normaliza o email
    const transactionId = body?.transactionId;

    console.log('📩 Dados recebidos:', { status, email, transactionId });

    // Inserir log na tabela pix_status
    const { error: insertError, data } = await supabase
      .from('pix_status')
      .insert({
        transaction_id: transactionId || 'sem-id',
        status: status || 'UNKNOWN',
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('❌ Erro ao salvar na tabela pix_status:', insertError);
    }

    // Atualizar pagamento_pix se status for PAID e houver email
    if (status === 'PAID' && email) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ pagamento_pix: true })
        .eq('email', email);

      if (updateError) {
        console.error('❌ Erro ao atualizar profiles:', updateError);
      } else {
        console.log('✅ pagamento_pix atualizado para:', email);
      }
    }

    return NextResponse.json({ message: "OK (Webhook processado)" }, { status: 200 });

  } catch (error) {
    console.error('💥 Erro geral no webhook:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', detalhe: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Webhook PixUp está funcionando',
    timestamp: new Date().toISOString()
  });
} 