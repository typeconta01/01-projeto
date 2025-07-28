import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Book, Star, Hourglass, Clock, Lock } from "lucide-react"
import Link from "next/link"

interface BookCardProps {
  title: string
  author: string
  genre: string
  price: number
  status?: "pending" | "available"
  iconType?: "clock" | "book"
  bloqueado?: boolean
}

export default function BookCard({
  title,
  author,
  genre,
  price,
  status = "pending",
  iconType = "clock",
  bloqueado = false,
}: BookCardProps) {
  return (
    <Card className={`p-4 shadow-md rounded-xl ${bloqueado ? 'opacity-75' : ''}`}>
      <CardContent className="flex items-start gap-4 p-0">
        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          {iconType === "clock" ? (
            <Clock className="w-8 h-8 text-gray-400" />
          ) : (
            <Book className="w-8 h-8 text-red-500" />
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-1">por {author}</p>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            {genre}
          </div>
          <p className="text-lg font-bold text-gray-900">R$ {price.toFixed(2).replace(".", ",")}</p>
          
          {bloqueado ? (
            <div className="mt-4">
              <div className="flex items-center gap-2 text-gray-400 mb-3 font-semibold">
                <Lock className="w-5 h-5" />
                Livro bloqueado
              </div>
              <Link href="/pagamento-exemplo" passHref>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-2 text-sm w-full">
                  <Lock className="w-4 h-4 mr-2" />
                  Fazer Pagamento PIX
                </Button>
              </Link>
            </div>
          ) : status === "pending" ? (
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Hourglass className="w-4 h-4 mr-1" />
              Aguarde ser liberado para sua conta
            </div>
          ) : status === "available" ? (
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-4 py-2 text-sm mt-2">
              <Book className="w-4 h-4 mr-2" />
              Ler e Avaliar
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
