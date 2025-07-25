'use client';

import Link from "next/link"
import { ArrowLeft, RefreshCw, Wallet, CircleAlert } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import BottomNav from "@/components/bottom-nav"
import { useState } from "react"

export default function SaquePage() {
  // Mock data for demonstration. In a real app, this would come from a state management or API call.
  const [availableBalance, setAvailableBalance] = useState(0.0)
  const [totalWithdrawn, setTotalWithdrawn] = useState(0.0)
  const minWithdrawal = 1.0

  // Function to simulate refreshing balance
  const handleRefresh = () => {
    // In a real application, you would fetch the latest balance here
    console.log("Refreshing balance...")
    // For demonstration, let's just log
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold text-gray-800"> 1rea de Saque</h1>
        <button onClick={handleRefresh} className="text-gray-600 hover:text-gray-900">
          <RefreshCw className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-1 p-4 space-y-4">
        {/* Saldo Disponível Card */}
        <Card className="bg-green-500 text-white rounded-lg shadow-md p-6">
          <CardContent className="flex items-center justify-between p-0">
            <div>
              <p className="text-sm opacity-90">Saldo Disponível</p>
              <h2 className="text-4xl font-bold mt-1">R$ {availableBalance.toFixed(2).replace(".", ",")}</h2>
              <p className="text-xs opacity-80 mt-1">Total sacado: R$ {totalWithdrawn.toFixed(2).replace(".", ",")}</p>
            </div>
            <Wallet className="w-12 h-12 opacity-70" />
          </CardContent>
        </Card>

        {/* Saque Indisponível Card (Conditional) */}
        {availableBalance < minWithdrawal && (
          <Card className="bg-white rounded-lg shadow-md p-6 text-center">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="bg-gray-100 rounded-full p-3 mb-4">
                <CircleAlert className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Saque Indisponível</h3>
              <p className="text-sm text-gray-600">
                Saldo insuficiente para saque (mínimo R$ {minWithdrawal.toFixed(2).replace(".", ",")})
              </p>
            </CardContent>
          </Card>
        )}

        {/* You could add a withdrawal form here if balance is sufficient */}
        {/* {availableBalance >= minWithdrawal && (
          <Card className="bg-white rounded-lg shadow-md p-6">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Realizar Saque</h3>
              <p className="text-sm text-gray-600">Formulário de saque aqui...</p>
            </CardContent>
          </Card>
        )} */}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
