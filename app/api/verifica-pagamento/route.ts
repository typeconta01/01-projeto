import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Obter o token de autorização do header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token de autorização necessário' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');

    // Verificar usuário autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user?.email) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    console.log('🔍 Verificando pagamento para:', user.email);

    // Consultar status do pagamento
    const { data, error } = await supabase
      .from('profiles')
      .select('pagamento_pix')
      .eq('email', user.email)
      .single();

    if (error) {
      console.error('❌ Erro ao consultar pagamento:', error);
      return NextResponse.json(
        { error: 'Erro ao verificar status do pagamento' },
        { status: 500 }
      );
    }

    const pagamentoConfirmado = data?.pagamento_pix === true;

    console.log('📊 Status do pagamento:', { 
      email: user.email, 
      pagamentoConfirmado 
    });

    return NextResponse.json({
      success: true,
      pagamentoConfirmado,
      email: user.email,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('💥 Erro geral na verificação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 