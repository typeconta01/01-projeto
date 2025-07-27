'use client'

import { useEffect, useRef } from 'react'
import { usePaymentStatus } from '@/hooks/use-payment-status'

interface PaymentStatusSimpleProps {
  intervalMs?: number
  onPaymentConfirmed?: () => void
}

export default function PaymentStatusSimple({ 
  intervalMs = 3000,
  onPaymentConfirmed 
}: PaymentStatusSimpleProps) {
  const { status, email, error } = usePaymentStatus(intervalMs)

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

  const renderStatus = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center p-4">
            <p className="text-gray-600">🔄 Verificando status do pagamento...</p>
          </div>
        )

      case 'waiting':
        return (
          <div className="text-center p-4">
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
          <div className="text-center p-4 bg-green-50 border border-green-200 rounded">
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
          <div className="text-center p-4 bg-red-50 border border-red-200 rounded">
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
    <div className="mt-4">
      {renderStatus()}
    </div>
  )
} 