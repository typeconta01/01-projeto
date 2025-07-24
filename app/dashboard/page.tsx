import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Settings, ArrowRight, DollarSign, Zap, Trophy, Star, Gamepad, Eye, Book } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import BookCard from "@/components/book-card"
import Link from "next/link" // Importar Link do next/link

export default function DashboardPage() {
  const userName = "Higor" // Exemplo de nome de usuário
  const userLevel = "Nível bronze"

  return (
    <div className="min-h-screen bg-[#FDF8F5] pb-20">
      {" "}
      {/* pb-20 para dar espaço para a nav inferior */}
      <header className="p-4 bg-white shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={userName} />
            <AvatarFallback>HS</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-gray-900">{userName}</h2>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <User className="w-3 h-3" />
              {userLevel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </Button>
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
              <Button variant="link" className="p-0 h-auto text-orange-500 hover:text-orange-600 text-sm">
                Toque para sacar
              </Button>
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
            />
            <BookCard
              title="Código Vermelho"
              author="Alexandre Ferreira"
              genre="Thriller Tecnológico"
              price={75.0}
              status="pending"
              iconType="clock"
            />
            <BookCard
              title="O Jardim das Memórias Perdidas"
              author="Clara Monteiro"
              genre="Romance Contemporâneo"
              price={125.0}
              status="pending"
              iconType="clock"
            />
          </div>
        </section>

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
