"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Eye, Globe, Rocket, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { AvaliadorModal } from "@/components/avaliador-modal";
import { EvaluatorModeDialog } from "@/components/evaluator-mode-dialog";

export function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] max-w-xs sm:max-w-sm p-4 rounded-2xl bg-[#FDF8F5] border-none shadow-xl">
        <DialogHeader className="text-left mb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">Configurações</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          {/* Editar Perfil Beta Reader */}
          <Card className="p-3 rounded-xl shadow-sm bg-white flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Editar Perfil Beta Reader</h3>
              <p className="text-xs text-gray-600">Alterar preferências de onboarding</p>
            </div>
          </Card>

          {/* Ver Perfil */}
          <Card className="p-3 rounded-xl shadow-sm bg-white flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Eye className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Ver Perfil</h3>
              <p className="text-xs text-gray-600">Visualizar dados do usuário</p>
            </div>
          </Card>

          {/* Modo de Avaliador */}
          <EvaluatorModeDialog>
            <Card className="p-3 rounded-xl shadow-sm bg-white flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Modo de Avaliador</h3>
                <p className="text-xs text-gray-600">Avaliador Nacional</p>
              </div>
            </Card>
          </EvaluatorModeDialog>

          {/* Novidades em Breve */}
          <Card
            className={cn(
              "p-3 rounded-xl shadow-md text-white",
              "bg-gradient-to-br from-blue-600 to-purple-600", // Gradiente azul-roxo
            )}
          >
            <CardContent className="p-0 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-0.5">Novidades em Breve</h3>
                <p className="text-xs">
                  Muitas funções e áreas ainda serão desbloqueadas conforme você sobe de pontuação!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full mt-4 rounded-xl bg-white text-gray-700 border-gray-200 hover:bg-gray-50 text-sm"
          >
            Fechar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
} 