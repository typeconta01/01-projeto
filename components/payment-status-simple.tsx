'use client'

import { useEffect, useRef } from 'react'
import { usePaymentStatus } from '@/hooks/use-payment-status'
import { Loader2, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface PaymentStatusSimpleProps {
  intervalMs?: number
  onPaymentConfirmed?: () => void
}

export default function PaymentStatusSimple({ 
  intervalMs = 3000,
  onPaymentConfirmed 
}: PaymentStatusSimpleProps) {
  const { status, email, error, checkPaymentStatus } = usePaymentStatus(intervalMs)

  // Debug: log status e email
  useEffect(() => {
    console.log('[PaymentStatusSimple] status:', status, '| email:', email)
  }, [status, email])

  // Executar callback quando pagamento for confirmado (apenas uma vez por transição)
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (status === 'paid' && onPaymentConfirmed) {
      timeout = setTimeout(() => {
        onPaymentConfirmed();
      }, 100);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [status, onPaymentConfirmed]);

  return (
    <div className="mt-6">
      <div className="text-xs text-gray-400 mb-3">
        {/* Debug info */}
        <div>Email usado na consulta: <span className="font-mono">{email || 'N/A'}</span></div>
        <button
          className="underline text-blue-500 text-xs mt-1"
          onClick={checkPaymentStatus}
        >
          Forçar verificação agora
        </button>
      </div>
      {renderStatus(status, email, error)}
    </div>
  )
}

function renderStatus(status: string, email: string | null, error: string | null) {
  switch (status) {
    case 'loading':
      return (
        <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
          <p className="text-blue-700 font-semibold">🔄 Verificando status do pagamento...</p>
          <p className="text-sm text-blue-600 mt-1">Aguarde um momento</p>
        </div>
      )
    case 'waiting':
      return (
        <div className="text-center p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <p className="text-yellow-700 font-semibold text-lg">⏳ Aguardando confirmação do pagamento PIX</p>
          <p className="text-sm text-yellow-600 mt-1">
            Após fazer o pagamento, aguarde alguns segundos para a confirmação automática
          </p>
          {email && (
            <p className="text-xs text-yellow-500 mt-2">
              Email: {email}
            </p>
          )}
        </div>
      )
    case 'paid':
      return (
        <div className="text-center p-6 bg-green-50 border-2 border-green-300 rounded-xl animate-pulse">
          <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
          <p className="text-green-700 font-bold text-xl">
            ✅ Pagamento via PIX confirmado!
          </p>
          <p className="text-sm text-green-600 mt-2">
            Seu upgrade para Avaliador Internacional foi ativado com sucesso!
          </p>
          <p className="text-xs text-green-500 mt-2">
            Você será redirecionado automaticamente...
          </p>
        </div>
      )
    case 'error':
      return (
        <div className="text-center p-6 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-red-700 font-bold">
            ❌ Erro ao verificar pagamento
          </p>
          {error && (
            <p className="text-sm text-red-600 mt-1">
              {error}
            </p>
          )}
        </div>
      )
    default:
      return null
  }
} 