import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function usePixStatus() {
  const [pixPago, setPixPago] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkPixStatus() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user?.email) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('pagamento_pix')
          .eq('email', user.email)
          .single();

        if (error) {
          console.error('Erro ao verificar pagamento PIX:', error);
          setError(error.message);
        } else {
          setPixPago(data?.pagamento_pix === true);
        }
      } catch (err) {
        console.error('Erro ao verificar pagamento PIX:', err);
        setError('Erro ao verificar status do pagamento');
      } finally {
        setLoading(false);
      }
    }

    checkPixStatus();

    // Verificar a cada 5 segundos
    const interval = setInterval(checkPixStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return { pixPago, loading, error };
} 