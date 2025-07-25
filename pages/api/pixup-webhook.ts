import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Adicione sua service role key no .env.local
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { requestBody } = req.body;
  if (!requestBody || requestBody.status !== 'PAID') {
    return res.status(200).json({ ok: true }); // Ignora eventos que não são de pagamento confirmado
  }

  const { taxId, email } = requestBody.creditParty || {};

  // Atualize o status do usuário pelo CPF (taxId) ou email
  const { error } = await supabase
    .from('profiles')
    .update({ pagamento_pix: true })
    .or(`e_mail.eq.${email},taxId.eq.${taxId}`); // ajuste o campo conforme seu banco

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true });
} 