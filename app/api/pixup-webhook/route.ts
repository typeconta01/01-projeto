// app/api/pixup-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const status = body?.status;
    const email = body?.creditParty?.email;
    const transactionId = body?.transactionId;
    const externalId = body?.external_id;
    const valor = body?.amount;
    const dateApproval = body?.dateApproval;

    if (!email || !status || !transactionId) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    // Salvar o pagamento na tabela "pagamentos"
    const { error: insertError } = await supabase.from("pagamentos").insert([
      {
        email,
        status,
        transaction_id: transactionId,
        external_id: externalId,
        valor,
        aprovado_em: dateApproval,
      },
    ]);

    if (insertError) {
      console.error("Erro ao inserir pagamento:", insertError);
      return NextResponse.json({ error: "Erro ao salvar pagamento" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro geral no webhook:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Webhook PixUp está funcionando',
    timestamp: new Date().toISOString()
  });
} 