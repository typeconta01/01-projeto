'use client'

import { useState } from 'react'
import PixPaymentStatus from '@/components/pix-payment-status'

export default function PagamentoExemplo() {
  const [qrCodeGerado, setQrCodeGerado] = useState(false)
  const [qrCodeData, setQrCodeData] = useState<any>(null)

  const handleGerarPix = async () => {
    try {
      const response = await fetch('/api/criar-pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          payer: {
            email: 'teste@exemplo.com',
            name: 'Usuário Teste'
          },
          value: 0.01,
          description: 'Pagamento de teste'
        })
      })

      const data = await response.json()

      if (data.success) {
        setQrCodeData(data.data)
        setQrCodeGerado(true)
      } else {
        alert('Erro ao gerar PIX: ' + data.error)
      }
    } catch (error) {
      alert('Erro ao gerar PIX')
    }
  }

  const handlePagamentoConfirmado = () => {
    // Callback executado quando o pagamento for confirmado
    console.log('🎉 Pagamento confirmado!')
    // Aqui você pode redirecionar, mostrar mensagem, etc.
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Exemplo de Pagamento PIX</h1>
      
      {!qrCodeGerado ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Clique no botão abaixo para gerar um QR Code PIX de teste
          </p>
          <button
            onClick={handleGerarPix}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Gerar PIX de Teste
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">QR Code PIX Gerado</h2>
            {qrCodeData?.qrCode && (
              <img 
                src={qrCodeData.qrCode} 
                alt="QR Code PIX" 
                className="mx-auto border rounded"
              />
            )}
            <p className="text-sm text-gray-600 mt-2">
              Valor: R$ {qrCodeData?.value?.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              TXID: {qrCodeData?.txid}
            </p>
          </div>

          {/* Componente de verificação de status */}
          <PixPaymentStatus 
            intervalMs={3000} // Verifica a cada 3 segundos
            onPaymentConfirmed={handlePagamentoConfirmado}
            showLoading={true}
          />

          <div className="text-center">
            <button
              onClick={() => setQrCodeGerado(false)}
              className="text-gray-500 text-sm hover:text-gray-700"
            >
              Gerar novo PIX
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 