'use client';

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Settings, ArrowRight, DollarSign, Zap, Trophy, Star, Gamepad, Eye, Book, Globe, Lock } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import BookCard from "@/components/book-card"
import Link from "next/link"
import { supabase } from '@/lib/supabaseClient'
import { SettingsDialog } from '@/components/settings-dialog';
import { usePixStatus } from "@/hooks/use-pix-status";

export default function DashboardPage() {
  const [userName, setUserName] = useState("Carregando...")
  const [userLevel, setUserLevel] = useState("Nível bronze")
  const [loading, setLoading] = useState(true)
  const { pixPago, upgradePago, loading: loadingPix } = usePixStatus();

  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Pegar o nome dos metadados do usuário
          const name = user.user_metadata?.name || user.email?.split('@')[0] || 'Usuário'
          setUserName(name)
        } else {
          setUserName('Usuário')
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error)
        setUserName('Usuário')
      } finally {
        setLoading(false)
      }
    }

    getUserData()
  }, [])

  if (typeof window === "undefined") return null;

  return (
    <div className="min-h-screen bg-[#FDF8F5] pb-20">
      {pixPago && !upgradePago && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold shadow">
          ✅ Pagamento básico aprovado! Livros nacionais liberados.
        </div>
      )}
      {upgradePago && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded-lg text-center font-semibold shadow">
          🌍 Upgrade para Avaliador Internacional ativado! Todos os livros liberados.
        </div>
      )}
      {/* pb-20 para dar espaço para a nav inferior */}
      <header className="p-4 bg-white shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={userName} />
            <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-gray-900">{userName}</h2>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <User className="w-3 h-3" />
              {upgradePago ? "Avaliador Internacional" : "Avaliador Nacional"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SettingsDialog />
          {/* Botão de Sair que redireciona para /login */}
          <Link href="/login" passHref>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {/* Saldo e Pontos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="p-4 shadow-md rounded-xl bg-white">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Saldo</span>
                </div>
                <Zap className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-3xl font-bold text-green-600 mb-1">R$ 0,00</p>
              <p className="text-sm text-gray-500 mb-2">Total sacado: R$ 0,00</p>
              <Link href="/saque" passHref legacyBehavior>
                <Button asChild variant="link" className="p-0 h-auto text-orange-500 hover:text-orange-600 text-sm">
                  <a>Toque para sacar</a>
              </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="p-4 shadow-md rounded-xl bg-white">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">Pontos</span>
                </div>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">Pontos acumulados</p>
            </CardContent>
          </Card>
        </section>

        {/* Boas-vindas e Atividade */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            Olá, {userName}! <Gamepad className="w-6 h-6 text-gray-500" />
          </h2>
          <p className="text-gray-600 flex items-center gap-2">
            <Eye className="w-5 h-5 text-orange-500" />
            Você avaliou <span className="font-semibold">0</span> livros hoje
          </p>
        </section>

        {/* Títulos para Avaliar */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-between">
            Encontramos títulos para você avaliar
            <Zap className="w-5 h-5 text-orange-500" />
          </h2>
          <div className="space-y-4">
            <BookCard
              title="As Sombras de Eldoria"
              author="Marina Silvestre"
              genre="Fantasia Épica"
              price={1.0}
              status="available"
              iconType="book"
              bloqueado={false} // Sempre disponível
            />
            <BookCard
              title="Código Vermelho"
              author="Alexandre Ferreira"
              genre="Thriller Tecnológico"
              price={75.0}
              status={pixPago ? "available" : "pending"}
              iconType={pixPago ? "book" : "clock"}
              bloqueado={!pixPago} // Bloqueado se não pagou PIX básico
            />
            <BookCard
              title="O Jardim das Memórias Perdidas"
              author="Clara Monteiro"
              genre="Romance Contemporâneo"
              price={125.0}
              status={pixPago ? "available" : "pending"}
              iconType={pixPago ? "book" : "clock"}
              bloqueado={!pixPago} // Bloqueado se não pagou PIX básico
            />
          </div>
        </section>

        {/* Seção de Livros Internacionais (só aparece se fez upgrade) */}
        {upgradePago && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Livros Internacionais
              </div>
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Premium</span>
            </h2>
            <div className="space-y-4">
              <BookCard
                title="The Quantum Garden"
                author="Derek Künsken"
                genre="Science Fiction"
                price={150.0}
                status="available"
                iconType="book"
                bloqueado={false}
              />
              <BookCard
                title="The Midnight Library"
                author="Matt Haig"
                genre="Contemporary Fiction"
                price={200.0}
                status="available"
                iconType="book"
                bloqueado={false}
              />
            </div>
          </section>
        )}

        {/* Seção de Upgrade (só aparece se não fez upgrade) */}
        {!upgradePago && pixPago && (
          <section className="mb-8">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
              <CardContent className="p-0">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Upgrade para Avaliador Internacional</h3>
                  <p className="text-gray-600 mb-4">
                    Acesse livros em inglês e receba pagamentos em dólares. Expanda seus horizontes!
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">Taxa de upgrade:</p>
                    <p className="text-2xl font-bold text-blue-600">R$ 39,99</p>
                    <p className="text-xs text-gray-500">Pagamento único via PIX</p>
                  </div>
                  <Link href="/upgrade-internacional" passHref>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3">
                      <Globe className="w-4 h-4 mr-2" />
                      Fazer Upgrade
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Explorar Seções */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 text-center shadow-md rounded-xl bg-white">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Book className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Todos os Livros</h3>
                <p className="text-gray-600">Ver biblioteca completa</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center shadow-md rounded-xl bg-white">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Comunidade</h3>
                <p className="text-gray-600">Rankings e reviews</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
