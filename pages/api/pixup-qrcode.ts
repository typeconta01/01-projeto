import type { NextApiRequest, NextApiResponse } from 'next';

const PIXUP_CLIENT_ID = process.env.PIXUP_CLIENT_ID || 'gomes333_6757351846';
const PIXUP_CLIENT_SECRET = process.env.PIXUP_CLIENT_SECRET || 'e97a2f98706c0abfc096b30c354b4b03becc42dfb6182ca8eb4fe9706acdb1b0';

function gerarCpfFake() {
  let cpf = '';
  for (let i = 0; i < 11; i++) {
    cpf += Math.floor(Math.random() * 10);
  }
  return cpf;
}

function gerarNomeFake() {
  const nomes = ['João Silva', 'Maria Souza', 'Carlos Oliveira', 'Ana Paula', 'Lucas Lima', 'Juliana Costa', 'Pedro Santos', 'Larissa Alves', 'Rafael Pereira', 'Camila Rocha'];
  return nomes[Math.floor(Math.random() * nomes.length)];
}

async function getPixupToken() {
  const credentials = Buffer.from(`${PIXUP_CLIENT_ID}:${PIXUP_CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://api.pixupbr.com/v2/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'accept': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Erro ao obter token Pixup');
  return res.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  let { valor, nome, cpf, email, descricao } = req.body;

  // Gerar dados fake se não enviados
  if (!nome) nome = gerarNomeFake();
  if (!cpf) cpf = gerarCpfFake();
  if (!email) email = "teste@email.com";

  try {
    // 1. Obter token de acesso
    const tokenData = await getPixupToken();
    const accessToken = tokenData.access_token;

    // 2. Gerar QR Code PIX
    const pixRes = await fetch('https://api.pixupbr.com/v2/pix/qrcode', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1.00,
        debtor: {
          name: nome,
          document: cpf,
          email: email,
        },
        payer: {
          name: nome,
          document: cpf,
          email: email,
        },
        description: descricao || 'Upgrade para Avaliador Internacional',
        postbackUrl: process.env.NEXT_PUBLIC_PIXUP_WEBHOOK_URL || 'https://seusite.com/api/pixup-webhook',
      }),
    });
    if (!pixRes.ok) {
      const error = await pixRes.text();
      return res.status(400).json({ error });
    }
    const pixData = await pixRes.json();
    return res.status(200).json(pixData);
  } catch (error: any) {
    console.error('Erro Pixup:', error);
    return res.status(500).json({ error: error.message || 'Erro interno' });
  }
} 