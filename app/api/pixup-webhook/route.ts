import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdminClient';

export async function POST(request: Request) {
  try {
    console.log('🔔 Webhook PixUp recebido');

    // Supabase Admin
    const supabase = getSupabaseAdmin();
    console.log("🔍 Supabase client:", supabase);

    // Obter o corpo da requisição
    const requestBody = await request.json();
    console.log('📨 Request body:', requestBody);

    // Teste simples de insert fixo
    const { error: insertError, data } = await supabase
      .from('pix_status')
      .insert({
        transaction_id: "teste-error-debug",
        status: "TEST",
        created_at: new Date().toISOString()
      });

    console.log("🧪 Insert result:", { data, insertError });

    if (insertError) {
      console.error('❌ Erro ao salvar na tabela pix_status:', insertError);
      return NextResponse.json(
        { error: 'Erro ao salvar dados', detalhe: insertError.message },
        { status: 500 }
      );
    }

    console.log('✅ Dados inseridos com sucesso (teste)');

    // Lógica baseada no status recebido
    switch (requestBody.status) {
      case 'PAID':
        console.log('✅ Pagamento confirmado:', requestBody.transactionId);

        if (requestBody.email) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ pagamento_pix: true })
            .eq('email', requestBody.email);

          if (updateError) {
            console.error('❌ Erro ao atualizar pagamento_pix em profiles:', updateError);
          } else {
            console.log('✅ Campo pagamento_pix atualizado com sucesso para:', requestBody.email);
          }
        } else {
          console.warn('⚠️ Email não fornecido no requestBody. Não foi possível atualizar profiles.');
        }
        break;
      default:
        console.log('ℹ️ Status recebido não requer ação especial:', requestBody.status);
        break;
    }

    return NextResponse.json({ message: "OK (teste de insert)" }, { status: 200 });

  } catch (error) {
    console.error('💥 Erro geral no webhook:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', detalhe: (error as Error).message },
      { status: 500 }
    );
  }
}

// Método GET para verificar se o webhook está funcionando
export async function GET() {
  console.log('🔍 Verificação de saúde do webhook');
  return NextResponse.json({ 
    status: 'ok', 
    message: 'Webhook PixUp está funcionando',
    timestamp: new Date().toISOString()
  });
} 