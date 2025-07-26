import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Função para criar cliente Supabase com validação
function createSupabaseClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Variáveis de ambiente do Supabase não configuradas');
    throw new Error('Configuração do Supabase inválida');
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: Request) {
  console.log('🔔 Webhook PixUp recebido');
  
  try {
    // Criar cliente Supabase
    const supabase = createSupabaseClient();
    
    // Validar método HTTP
    if (request.method !== 'POST') {
      console.log('❌ Método HTTP inválido:', request.method);
      return NextResponse.json(
        { error: 'Método não permitido' }, 
        { status: 405 }
      );
    }

    // Parse do corpo da requisição
    let body: any;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('❌ Erro ao fazer parse do JSON:', parseError);
      return NextResponse.json(
        { error: 'Corpo da requisição inválido' }, 
        { status: 400 }
      );
    }

    console.log('📦 Dados do webhook:', JSON.stringify(body, null, 2));

    // Validação da estrutura do webhook
    if (!body || !body.requestBody) {
      console.log('❌ Webhook inválido - sem requestBody');
      return NextResponse.json(
        { error: 'Estrutura do webhook inválida' }, 
        { status: 400 }
      );
    }

    const { requestBody } = body;

    // Validação dos campos obrigatórios
    if (!requestBody.transactionId || !requestBody.status) {
      console.log('❌ Campos obrigatórios ausentes');
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes' }, 
        { status: 400 }
      );
    }

    console.log('📋 Dados da transação:', JSON.stringify(requestBody, null, 2));

    // Verificar se é uma transação PIX válida
    if (requestBody.transactionType !== 'RECEIVEPIX') {
      console.log('⚠️ Tipo de transação não suportado:', requestBody.transactionType);
      return NextResponse.json(
        { error: 'Tipo de transação não suportado' }, 
        { status: 400 }
      );
    }

    // Salvar dados na tabela pix_status
    const { error: insertError } = await supabase
      .from('pix_status')
      .insert({
        transaction_id: requestBody.transactionId,
        status: requestBody.status,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('❌ Erro ao salvar na tabela pix_status:', insertError);
      return NextResponse.json(
        { error: 'Erro ao salvar dados' }, 
        { status: 500 }
      );
    }

    console.log('✅ Dados salvos na tabela pix_status:', {
      transaction_id: requestBody.transactionId,
      status: requestBody.status
    });

    // Processar baseado no status da transação (opcional - para compatibilidade)
    switch (requestBody.status) {
      case 'PAID':
        console.log('✅ Pagamento confirmado:', requestBody.transactionId);
        break;
        
      case 'PENDING':
        console.log('⏳ Pagamento pendente:', requestBody.transactionId);
        break;
        
      case 'EXPIRED':
        console.log('⏰ Pagamento expirado:', requestBody.transactionId);
        break;
        
      case 'CANCELLED':
        console.log('❌ Pagamento cancelado:', requestBody.transactionId);
        break;
        
      default:
        console.log('⚠️ Status não tratado:', requestBody.status);
        break;
    }

    console.log('✅ Webhook processado com sucesso');
    return NextResponse.json({ message: "OK" }, { status: 200 });

  } catch (error) {
    console.error('💥 Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
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