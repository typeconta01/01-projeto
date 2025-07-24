"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF8F5] p-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fazer Login</h1>
          <p className="text-gray-600">Entre na sua conta para continuar</p>
        </div>

        <form className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              placeholder="seu@email.com"
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-orange-500 focus:border-orange-500 text-gray-800 bg-gray-50"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Sua senha"
              className="pl-10 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-orange-500 focus:border-orange-500 text-gray-800 bg-gray-50"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition-colors duration-200"
          >
            Entrar
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Não tem uma conta?{" "}
          <Link href="/cadastro" className="text-orange-500 hover:text-orange-600 font-semibold">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}
