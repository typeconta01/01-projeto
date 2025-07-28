import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdminClient';

export async function POST(request: Request) {
  try {
    console.log('🚨 Webhook PixUp recebido');

    const supabase = getSupabaseAdmin();

    const json = await request.json();
    const requestBody = json?.requestBody;

    const status = requestBody?.status;
    const email = requestBody?.email || 
                  requestBody?.metadata?.email || 
                  requestBody?.external_id || 
                  requestBody?.creditParty?.email;
    const normalizedEmail = email?.trim().toLowerCase(); // Normaliza o email
    const transactionId = requestBody?.transactionId;

    console.log('📩 Dados recebidos:', { status, email, normalizedEmail, transactionId });
    console.log('🔍 requestBody completo:', JSON.stringify(requestBody, null, 2));

    // Inserir log na tabela pix_status
    const { error: insertError, data } = await supabase
      .from('pix_status')
      .insert({
        transaction_id: transactionId || 'sem-id',
        status: status || 'UNKNOWN',
        email: normalizedEmail || email || null, // Adicionado campo email
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('❌ Erro ao salvar na tabela pix_status:', insertError);
    }

    // Atualizar pagamento_pix se status for PAID e houver email
    if (status === 'PAID' && normalizedEmail) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ pagamento_pix: true })
        .eq('email', normalizedEmail);

      if (updateError) {
        console.error('❌ Erro ao atualizar profiles:', updateError);
      } else {
        console.log('✅ pagamento_pix atualizado para:', normalizedEmail);
      }

      // Salvar na tabela pagamentos
      const { error: pagamentoError } = await supabase
        .from('pagamentos')
        .insert({
          email: normalizedEmail,
          transaction_id: transactionId,
          status: status,
          created_at: new Date().toISOString()
        });

      if (pagamentoError) {
        console.error('❌ Erro ao salvar na tabela pagamentos:', pagamentoError);
      } else {
        console.log('✅ Pagamento salvo na tabela pagamentos para:', normalizedEmail);
      }
    } else if (status === 'PAID' && !normalizedEmail) {
      console.warn('⚠️ Status PAID recebido, mas email não encontrado em metadata, external_id ou email');
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