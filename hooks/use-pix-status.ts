import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function usePixStatus() {
  const [pixPago, setPixPago] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setPixPago(false);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('pagamento_pix')
        .eq('id', user.id)
        .single();
      setPixPago(data?.pagamento_pix === true);
      setLoading(false);
    }
    fetchStatus();
  }, []);

  return { pixPago, loading };
} 