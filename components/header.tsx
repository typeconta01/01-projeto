import { Button } from "@/components/ui/button"
import { Book, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm md:px-8 lg:px-12">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Book className="w-5 h-5 text-orange-500" />
        <span className="text-sm font-bold text-gray-800">
          <span className="font-extrabold text-gray-900">Reader</span>
          <span className="font-normal text-gray-600"> Go</span>
          <span className="font-light text-gray-500"> Beta</span>
        </span>
      </div>

      {/* Center Section (empty as requested) */}
      <div className="flex-grow" />

      {/* Buttons Section */}
      <div className="flex items-center gap-2">
        <Link href="/login" passHref>
          <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-md">
            <LogIn className="w-3 h-3 mr-2" />
            Entrar
          </Button>
        </Link>
        <Link href="/cadastro" passHref>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-1.5 shadow-md transition-colors duration-200">
            <UserPlus className="w-3 h-3 mr-2" />
            Cadastrar
          </Button>
        </Link>
      </div>
    </header>
  )
}
