'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import PaymentStatusSimple from '@/components/payment-status-simple'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function TestePagamento() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          // Verificar perfil diretamente
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('email', user.email)
            .single()

          if (!error) {
            setProfile(profileData)
          }
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const handlePaymentConfirmed = () => {
    alert('🎉 Pagamento confirmado via callback!')
    // Recarregar dados do perfil
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Teste de Pagamento</h1>
        <p className="text-red-600 text-center">Usuário não autenticado</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Teste de Pagamento</h1>
      
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Dados do Usuário:</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>

        {profile && (
          <div className="bg-blue-100 p-4 rounded">
            <h2 className="font-semibold mb-2">Dados do Perfil:</h2>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>ID:</strong> {profile.id}</p>
            <p><strong>Pagamento PIX:</strong> {profile.pagamento_pix ? '✅ TRUE' : '❌ FALSE'}</p>
          </div>
        )}

        <div className="bg-green-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Status em Tempo Real:</h2>
          <PaymentStatusSimple 
            intervalMs={2000} // Verifica a cada 2 segundos
            onPaymentConfirmed={handlePaymentConfirmed}
          />
        </div>

        <div className="text-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Atualizar Dados
          </button>
        </div>
      </div>
    </div>
  )
} 