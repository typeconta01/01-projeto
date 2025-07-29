"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Globe, DollarSign, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { PixPayment } from "@/components/pix-payment";

export function EvaluatorModeDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[90%] max-w-xs sm:max-w-sm p-4 rounded-2xl bg-white border-none shadow-xl">
        <DialogHeader className="flex flex-row items-center justify-between mb-4">
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
            Modo de Avaliador
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          {/* Avaliador Nacional Card */}
          <Card
            className={cn(
              "p-3 rounded-xl shadow-sm bg-white flex items-center gap-3 cursor-pointer transition-colors",
              "border-2 border-green-400 bg-green-50", // Green border and light green background
            )}
          >
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">Avaliador Nacional</h3>
              <p className="text-xs text-gray-600">Livros em português • Pagamento em R$</p>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </Card>

          {/* Avaliador Internacional Card */}
          <Card className="p-3 rounded-xl shadow-sm bg-white flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Avaliador Internacional</h3>
              <p className="text-xs text-gray-600">Livros em inglês • Pagamento em USD</p>
            </div>
          </Card>
        </div>

        {/* Upgrade Section */}
        <div className="flex flex-col items-center text-center mt-6">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Upgrade para Avaliador Internacional</h2>
          <p className="text-sm text-gray-600 mb-4">
            Desbloqueie a avaliação de livros em inglês e receba pagamentos em dólares. Acesse nossa biblioteca exclusiva de livros internacionais!
          </p>

          {/* Upgrade Fee Card */}
          <Card className="p-4 rounded-xl shadow-sm bg-blue-50 text-blue-700 border border-blue-200 w-full mb-4">
            <CardContent className="p-0 flex flex-col items-center">
              <p className="text-sm font-medium">Taxa de upgrade:</p>
              <h3 className="text-2xl font-bold">R$ 39,99</h3>
              <p className="text-xs">Pagamento único via PIX</p>
            </CardContent>
          </Card>
          <PixPayment />
          <p className="text-xs text-gray-500 mt-3">
            * Após o pagamento via PIX, sua conta será automaticamente atualizada para Avaliador Internacional.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
} 