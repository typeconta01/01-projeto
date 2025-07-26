import { useState, useEffect, useCallback } from 'react';

interface PixStatusResponse {
  success: boolean;
  status: string;
  message: string;
}

export function usePixStatus(txid: string | null, email: string | null, intervalMs: number = 10000) {
  const [status, setStatus] = useState<'loading' | 'waiting' | 'paid' | 'error'>('loading');
  const [lastResponse, setLastResponse] = useState<PixStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = useCallback(async () => {
    if (!txid || !email) {
      setStatus('error');
      setError('txid e email são obrigatórios');
      return;
    }

    try {
      const response = await fetch(`/api/verifica-status?txid=${txid}&email=${email}`);
      const data: PixStatusResponse = await response.json();

      setLastResponse(data);

      if (data.success) {
        if (data.status === 'PAID') {
          setStatus('paid');
        } else {
          setStatus('waiting');
        }
      } else {
        setStatus('error');
        setError(data.message || 'Erro ao verificar status');
      }
    } catch (err) {
      setStatus('error');
      setError('Erro de conexão');
      console.error('Erro ao verificar status:', err);
    }
  }, [txid, email]);

  useEffect(() => {
    if (!txid || !email) return;

    // Verificação inicial
    checkStatus();

    // Verificação periódica
    const interval = setInterval(checkStatus, intervalMs);

    return () => clearInterval(interval);
  }, [txid, email, intervalMs, checkStatus]);

  return {
    status,
    lastResponse,
    error,
    checkStatus // Função para verificação manual
  };
} 