"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDF8F5] p-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h1>
          <p className="text-gray-600">Junte-se à comunidade de beta readers</p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-800 font-medium mb-2">
              Nome:
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-orange-500 focus:border-orange-500 text-gray-800 bg-gray-50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
              Email:
            </label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-orange-500 focus:border-orange-500 text-gray-800 bg-gray-50"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-800 font-medium mb-2">
              Telefone:
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999 ou 11999999999"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-orange-500 focus:border-orange-500 text-gray-800 bg-gray-50"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
              Senha:
            </label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Sua senha (mín. 6 caracteres)"
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-orange-500 focus:border-orange-500 text-gray-800 bg-gray-50"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-[calc(50%+0.5rem)] -translate-y-1/2 text-gray-400 hover:bg-transparent"
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
            Criar Conta
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-orange-500 hover:text-orange-600 font-semibold">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}
