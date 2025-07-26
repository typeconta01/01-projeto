'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function CheckoutStatus() {
  const [status, setStatus] = useState<'loading' | 'paid' | 'waiting'>('waiting')
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const checkStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setEmail(user.email || null)

      const { data, error } = await supabase
        .from('profiles')
        .select('pagamento_pix')
        .eq('email', user.email)
        .single()

      if (error) {
        console.error('Erro ao buscar status do pagamento:', error)
        return
      }

      if (data?.pagamento_pix) {
        setStatus('paid')
      } else {
        setStatus('waiting')
      }
    }

    checkStatus()

    const interval = setInterval(() => {
      checkStatus()
    }, 5000) // Verifica a cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      {status === 'loading' && <p>Carregando...</p>}
      {status === 'waiting' && <p>⏳ Aguardando pagamento Pix...</p>}
      {status === 'paid' && <h2>✅ Pix confirmado com sucesso!</h2>}
    </div>
  )
} 