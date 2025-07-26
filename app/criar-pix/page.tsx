'use client'

import { useState } from 'react'

interface PixResponse {
  success: boolean;
  data?: {
    qrCode: string;
    qrCodeText: string;
    txid: string;
    value: number;
  };
  error?: string;
}

export default function CriarPix() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    value: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<PixResponse | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch('/api/criar-pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          payer: {
            email: formData.email,
            name: formData.name
          },
          value: parseFloat(formData.value),
          description: formData.description
        })
      })

      const data = await res.json()
      setResponse(data)
    } catch (error) {
      setResponse({
        success: false,
        error: 'Erro ao criar cobrança PIX'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Criar Cobrança PIX</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email do Pagador</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Nome do Pagador</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={formData.value}
            onChange={(e) => setFormData({...formData, value: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Descrição</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? 'Criando...' : 'Criar Cobrança PIX'}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 border rounded">
          {response.success ? (
            <div>
              <h3 className="font-bold text-green-600 mb-2">✅ Cobrança criada com sucesso!</h3>
              <div className="space-y-2 text-sm">
                <p><strong>TXID:</strong> {response.data?.txid}</p>
                <p><strong>Valor:</strong> R$ {response.data?.value?.toFixed(2)}</p>
                <p><strong>QR Code:</strong></p>
                <div className="bg-gray-100 p-2 rounded text-xs break-all">
                  {response.data?.qrCodeText}
                </div>
                {response.data?.qrCode && (
                  <div className="text-center">
                    <img 
                      src={response.data.qrCode} 
                      alt="QR Code PIX" 
                      className="mx-auto border"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-red-600">
              <h3 className="font-bold">❌ Erro ao criar cobrança</h3>
              <p>{response.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 