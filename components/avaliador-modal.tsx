"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function AvaliadorModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[90%] max-w-xs sm:max-w-sm p-4 rounded-2xl bg-[#FDF8F5] border-none shadow-xl">
        <DialogHeader className="text-left mb-4">
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-500" />
            Modo de Avaliador
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 text-gray-700">
          <p className="mb-2">Você está no modo <b>Avaliador Nacional</b>.</p>
          <p className="text-sm text-gray-600">Em breve, novos modos e funcionalidades estarão disponíveis para você!</p>
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
  );
} 