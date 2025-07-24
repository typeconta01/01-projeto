import Link from "next/link"
import { Home, BookOpen, Users, Wallet } from "lucide-react"

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-2 flex justify-around items-center z-50">
      <Link
        href="/dashboard"
        className="flex flex-col items-center text-orange-500 font-semibold text-xs p-2 rounded-lg bg-orange-100"
      >
        <Home className="w-5 h-5 mb-1" />
        Home
      </Link>
      <Link href="#" className="flex flex-col items-center text-gray-600 hover:text-orange-500 text-xs p-2 rounded-lg">
        <BookOpen className="w-5 h-5 mb-1" />
        Livros
      </Link>
      <Link href="#" className="flex flex-col items-center text-gray-600 hover:text-orange-500 text-xs p-2 rounded-lg">
        <Users className="w-5 h-5 mb-1" />
        Comunidade
      </Link>
      <Link href="#" className="flex flex-col items-center text-gray-600 hover:text-orange-500 text-xs p-2 rounded-lg">
        <Wallet className="w-5 h-5 mb-1" />
        Saque
      </Link>
    </nav>
  )
}
