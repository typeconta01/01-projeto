// app/api/pixup-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📦 Webhook recebido:", JSON.stringify(body, null, 2));
    const email = body?.email ||
                  body?.creditParty?.email ||
                  body?.metadata?.email ||
                  body?.external_id;
    const normalizedEmail = email?.trim()?.toLowerCase();
    const status = body?.status;
    const transactionId = body?.transactionId;
    const externalId = body?.external_id;
    const valor = body?.amount;
    const dateApproval = body?.dateApproval;

    if (!normalizedEmail || !status || !transactionId) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    // Salvar o pagamento na tabela "pagamentos"
    const { error: insertError } = await supabase.from("pagamentos").insert([
      {
        email: normalizedEmail,
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