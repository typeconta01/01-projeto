'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PixPaymentStatusProps {
  intervalMs?: number
  onPaymentConfirmed?: () => void
  showLoading?: boolean
}

export default function PixPaymentStatus({ 
  intervalMs = 5000, 
  onPaymentConfirmed,
  showLoading = true 
}: PixPaymentStatusProps) {
  const [status, setStatus] = useState<'loading' | 'waiting' | 'paid' | 'error'>('loading')
  const [email, setEmail] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verificarPagamento = async () => {
      try {
        // Obter usuário logado
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user?.email) {
          setStatus('error')
          setError('Usuário não autenticado')
          return
        }

        setEmail(user.email)

        // Verificar status do pagamento
        const { data, error: queryError } = await supabase
          .from('profiles')
          .select('pagamento_pix')
          .eq('email', user.email)
          .single()

        if (queryError) {
          console.error('Erro ao verificar pagamento:', queryError)
          setStatus('error')
          setError('Erro ao verificar status do pagamento')
          return
        }

        if (data?.pagamento_pix === true) {
          setStatus('paid')
          onPaymentConfirmed?.() // Callback opcional
        } else {
          setStatus('waiting')
        }
      } catch (err) {
        console.error('Erro geral:', err)
        setStatus('error')
        setError('Erro inesperado')
      }
    }

    // Verificação inicial
    verificarPagamento()

    // Verificação periódica
    const intervalo = setInterval(verificarPagamento, intervalMs)

    return () => clearInterval(intervalo)
  }, [intervalMs, onPaymentConfirmed])

  const renderStatus = () => {
    switch (status) {
      case 'loading':
        return showLoading ? (
          <div className="text-center">
            <p className="text-gray-600">🔄 Verificando status do pagamento...</p>
          </div>
        ) : null

      case 'waiting':
        return (
          <div className="text-center">
            <p className="text-gray-600">⏳ Aguardando confirmação do pagamento PIX...</p>
            {email && (
              <p className="text-sm text-gray-500 mt-1">
                Email: {email}
              </p>
            )}
          </div>
        )

      case 'paid':
        return (
          <div className="text-center">
            <p className="text-green-600 font-bold text-lg">
              ✅ Pagamento via PIX confirmado!
            </p>
            <p className="text-sm text-green-500 mt-1">
              Seu pagamento foi processado com sucesso.
            </p>
          </div>
        )

      case 'error':
        return (
          <div className="text-center">
            <p className="text-red-600 font-bold">
              ❌ Erro ao verificar pagamento
            </p>
            {error && (
              <p className="text-sm text-red-500 mt-1">
                {error}
              </p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="mt-6">
      {renderStatus()}
    </div>
  )
} 