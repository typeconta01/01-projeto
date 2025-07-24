import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ShieldCheck,
  Zap,
  CheckCircle,
  Users,
  Star,
  Quote,
  DollarSign,
  Wallet,
  BookOpen,
  ClipboardCheck,
} from "lucide-react"
import Header from "@/components/header"
import Link from "next/link"

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            100% Segura
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Transforme sua paixão por livros em <span className="text-orange-500">renda extra</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Seja pago para ler e avaliar livros incríveis. Mais de{" "}
            <span className="font-bold text-orange-500">R$ 900.000</span> já foram pagos aos nossos leitores. Junte-se à
            maior comunidade de beta readers do Brasil.
          </p>
          <Link href="/cadastro" passHref>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg mb-8">
              <Zap className="w-6 h-6 mr-3" />
              Começar Agora - É Grátis
            </Button>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-gray-600 text-base">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Sem taxas de inscrição
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              3.500+ leitores ativos
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-green-500" />
              4.9/5 avaliação
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              100% seguro
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-green-100 text-green-700 rounded-full text-sm font-medium mx-auto block w-fit">
            <ShieldCheck className="w-4 h-4" />
            100% seguro
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Nossos Números</h2>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Veja o impacto que estamos gerando na vida de milhares de leitores em todo o Brasil.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center shadow-md rounded-xl">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">R$ 900.000+</h3>
                <p className="text-gray-600">Pagos aos leitores</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center shadow-md rounded-xl">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">3.500+</h3>
                <p className="text-gray-600">Leitores ativos</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center shadow-md rounded-xl">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">15.000+</h3>
                <p className="text-gray-600">Avaliações publicadas</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center shadow-md rounded-xl">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Wallet className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">R$ 50-900</h3>
                <p className="text-gray-600">Por avaliação</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Como funciona? É simples!</h2>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Processo transparente e direto para você começar a ganhar dinheiro hoje mesmo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center shadow-md rounded-xl">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-4xl font-extrabold text-gray-900 mb-2">01</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Crie sua conta</h3>
                <p className="text-gray-600">É rápido e gratuito. Leva menos de 2 minutos.</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center shadow-md rounded-xl">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <ClipboardCheck className="w-8 h-8 text-purple-500" />
                </div>
                <span className="text-4xl font-extrabold text-gray-900 mb-2">02</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Escolha um livro</h3>
                <p className="text-gray-600">Temos centenas de livros de diversos gêneros para você escolher.</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center shadow-md rounded-xl">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-orange-500" />
                </div>
                <span className="text-4xl font-extrabold text-gray-900 mb-2">03</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Leia e Avalie</h3>
                <p className="text-gray-600">Escreva uma resenha honesta e detalhada. Mínimo de 300 caracteres.</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center shadow-md rounded-xl">
              <CardContent className="flex flex-col items-center justify-center p-0">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Wallet className="w-8 h-8 text-green-500" />
                </div>
                <span className="text-4xl font-extrabold text-gray-900 mb-2">04</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Receba o Pagamento</h3>
                <p className="text-gray-600">Ganhe R$ X por avaliação. Saque via PIX instantâneo.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">O que nossos leitores dizem</h2>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Histórias reais de pessoas que transformaram sua paixão por livros em renda extra.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 shadow-md rounded-xl">
              <CardContent className="flex flex-col p-0">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Alana Assis" />
                    <AvatarFallback>AA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Alana Assis</h4>
                    <p className="text-sm text-gray-500">Beta Reader</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <Quote className="w-8 h-8 text-gray-300 mb-4" />
                <p className="text-gray-700 mb-6">
                  "Já ganhei mais de R$ 800 lendo livros que eu realmente amo. A plataforma é confiável e os pagamentos
                  são pontuais. Recomendo!"
                </p>
                <Button className="bg-green-100 hover:bg-green-200 text-green-700 font-semibold w-full">
                  Total ganho: R$ 847
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-md rounded-xl">
              <CardContent className="flex flex-col p-0">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Leonardo Sucegan" />
                    <AvatarFallback>LS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Leonardo Sucegan</h4>
                    <p className="text-sm text-gray-500">Leitor Experiente</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <Quote className="w-8 h-8 text-gray-300 mb-4" />
                <p className="text-gray-700 mb-6">
                  "Como estudante, essa renda extra faz toda diferença. Consigo pagar meus livros universitários lendo
                  outros livros. Genial!"
                </p>
                <Button className="bg-green-100 hover:bg-green-200 text-green-700 font-semibold w-full">
                  Total ganho: R$ 623
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-md rounded-xl">
              <CardContent className="flex flex-col p-0">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Michele Senhoreli" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Michele Senhoreli</h4>
                    <p className="text-sm text-gray-500">Avaliadora Expert</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <Quote className="w-8 h-8 text-gray-300 mb-4" />
                <p className="text-gray-700 mb-6">
                  "Descobri uma nova paixão e ainda ganho dinheiro com isso. Os livros são de qualidade e o processo é
                  muito simples."
                </p>
                <Button className="bg-green-100 hover:bg-green-200 text-green-700 font-semibold w-full">
                  Total ganho: R$ 1.234
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
