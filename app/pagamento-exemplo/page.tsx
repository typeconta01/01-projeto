'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, DollarSign, QrCode, Copy } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { ensureProfileExists } from '@/lib/profile-utils'
import PaymentStatusSimple from '@/components/payment-status-simple'

export default function PagamentoExemplo() {
  const [qrCode, setQrCode] = useState<string>('')
  const [pixCode, setPixCode] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [showPaymentStatus, setShowPaymentStatus] = useState(false)

  const handleGerarPix = async () => {
    setLoading(true)
    setError('')
    setQrCode('')
    setPixCode('')

    try {
      // Obter dados do usuário logado
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user?.email) {
        setError('Usuário não autenticado')
        return
      }

      // Garantir que o perfil existe
      await ensureProfileExists(user.email, user.id)

      // Gerar PIX
      const response = await fetch('/api/criar-pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payer: {
            email: user.email,
            name: user.user_metadata?.name || user.email.split('@')[0]
          },
          value: 0.01, // 1 centavo para teste
          description: 'Desbloqueio de livros premium'
        })
      })

      const data = await response.json()

      if (data.success) {
        setQrCode(data.data.qr_code || '')
        setPixCode(data.data.pix_code || '')
        setShowPaymentStatus(true)
      } else {
        setError(data.error || 'Erro ao gerar PIX')
      }
    } catch (err) {
      setError('Erro ao gerar PIX: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode)
      alert('Código PIX copiado!')
    } catch (err) {
      alert('Erro ao copiar código PIX')
    }
  }

  const handlePaymentConfirmed = () => {
    alert('✅ Pagamento confirmado! Você será redirecionado para o dashboard.')
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5] p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pagamento via PIX</h1>
          <p className="text-gray-600">Desbloqueie todos os livros premium</p>
        </div>

        {/* Card de Pagamento */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Valor: R$ 0,01</h2>
              <p className="text-gray-600">Pagamento único para desbloquear todos os livros</p>
            </div>

            {!qrCode ? (
              <Button 
                onClick={handleGerarPix} 
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
              >
                {loading ? 'Gerando PIX...' : 'Gerar PIX'}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    Escaneie o QR Code ou copie o código abaixo e pague no app do seu banco.
                  </p>
                  
                  {qrCode && (
                    <div className="mb-4">
                      <QrCode className="w-48 h-48 mx-auto border-2 border-gray-200" />
                    </div>
                  )}
                  
                  {pixCode && (
                    <div className="mb-4">
                      <textarea
                        value={pixCode}
                        readOnly
                        className="w-full h-24 p-3 border border-gray-200 rounded-lg text-xs font-mono bg-gray-50 resize-none"
                      />
                      <Button 
                        onClick={handleCopyPixCode}
                        variant="outline"
                        className="w-full mt-2"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar código PIX
                      </Button>
                    </div>
                  )}
                </div>

                {/* Status do Pagamento */}
                {showPaymentStatus && (
                  <PaymentStatusSimple 
                    intervalMs={3000}
                    onPaymentConfirmed={handlePaymentConfirmed}
                  />
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informações */}
        <div className="text-center text-sm text-gray-500">
          * Após o pagamento via PIX, sua conta será automaticamente atualizada.
        </div>
      </div>
    </div>
  )
} 