import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PaymentStatusResponse {
  success: boolean;
  pagamentoConfirmado: boolean;
  email: string;
  timestamp: string;
}

export function usePaymentStatus(intervalMs: number = 3000) {
  const [status, setStatus] = useState<'loading' | 'waiting' | 'paid' | 'error'>('loading');
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkPaymentStatus = useCallback(async () => {
    try {
      // Obter token de sessão
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setStatus('error');
        setError('Usuário não autenticado');
        return;
      }

      // Fazer requisição para a API
      const response = await fetch('/api/verifica-pagamento', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PaymentStatusResponse = await response.json();

      if (data.success) {
        setEmail(data.email);
        
        if (data.pagamentoConfirmado) {
          setStatus('paid');
        } else {
          setStatus('waiting');
        }
      } else {
        setStatus('error');
        setError('Erro ao verificar pagamento');
      }
    } catch (err) {
      console.error('Erro ao verificar status:', err);
      setStatus('error');
      setError('Erro de conexão');
    }
  }, []);

  useEffect(() => {
    // Verificação inicial
    checkPaymentStatus();

    // Verificação periódica
    const interval = setInterval(checkPaymentStatus, intervalMs);

    return () => clearInterval(interval);
  }, [checkPaymentStatus, intervalMs]);

  return {
    status,
    email,
    error,
    checkPaymentStatus // Função para verificação manual
  };
} 