'use client'

import { useState } from 'react'
import { usePixStatus } from '@/hooks/use-pix-status'

export default function PagamentoStatus() {
  const [txid, setTxid] = useState('')
  const [email, setEmail] = useState('')
  const [isChecking, setIsChecking] = useState(false)

  const { status, lastResponse, error, checkStatus } = usePixStatus(
    isChecking ? txid : null,
    isChecking ? email : null,
    10000 // 10 segundos
  )

  const handleStartChecking = () => {
    if (txid && email) {
      setIsChecking(true)
    }
  }

  const handleStopChecking = () => {
    setIsChecking(false)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Status do Pagamento Pix</h1>
      
      {!isChecking ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Transaction ID (txid)</label>
            <input
              type="text"
              value={txid}
              onChange={(e) => setTxid(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Digite o txid do Pix"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Digite o email"
            />
          </div>
          
          <button
            onClick={handleStartChecking}
            disabled={!txid || !email}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Iniciar Verificação
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">Verificando Status...</h2>
            <p className="text-sm text-gray-600">txid: {txid}</p>
            <p className="text-sm text-gray-600">email: {email}</p>
          </div>
          
          <div className="text-center p-4 border rounded">
            {status === 'loading' && <p>🔄 Carregando...</p>}
            {status === 'waiting' && <p>⏳ Aguardando pagamento...</p>}
            {status === 'paid' && <p className="text-green-600 font-bold">✅ Pagamento confirmado!</p>}
            {status === 'error' && <p className="text-red-600">❌ Erro: {error}</p>}
          </div>
          
          {lastResponse && (
            <div className="text-sm bg-gray-100 p-3 rounded">
              <p><strong>Status:</strong> {lastResponse.status}</p>
              <p><strong>Mensagem:</strong> {lastResponse.message}</p>
            </div>
          )}
          
          <div className="flex space-x-2">
            <button
              onClick={checkStatus}
              className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Verificar Agora
            </button>
            <button
              onClick={handleStopChecking}
              className="flex-1 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Parar
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 