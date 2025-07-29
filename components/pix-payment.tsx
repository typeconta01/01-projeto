"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { X, DollarSign, Copy } from "lucide-react";

export function PixPayment() {
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [statusPix, setStatusPix] = useState<"idle" | "aguardando" | "confirmado">("idle");

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? null);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (statusPix !== "aguardando" || !userEmail) return;

    const interval = setInterval(async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("pagamento_pix")
        .eq("email", userEmail)
        .single();

      if (data?.pagamento_pix === true) {
        setStatusPix("confirmado");
        clearInterval(interval);
      }
    }, 2000); // verifica a cada 2 segundos

    return () => clearInterval(interval);
  }, [statusPix, userEmail]);

  async function handlePix() {
    setLoading(true);
    setError(null);
    setPix(null);
    setCopied(false);
    setStatusPix("idle");
    try {
      const res = await fetch("/api/pixup-qrcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          valor: 39.99,
          descricao: "Upgrade para Avaliador Internacional"
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao gerar PIX");
      setPix(data);
      setOpen(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const copiaCola = pix?.qrcode || pix?.copiaecola || pix?.copiaECola || "";

  function handleCopy() {
    if (copiaCola) {
      navigator.clipboard.writeText(copiaCola);
      setCopied(true);
      setStatusPix("aguardando");
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <>
      <Button onClick={handlePix} disabled={loading} className="w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-base py-3">
        {loading ? "Gerando PIX..." : "Pagar com PIX"}
      </Button>
      {error && <div className="text-red-600 text-center mt-2">{error}</div>}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative max-w-sm w-[90%] p-6 rounded-2xl bg-white border-none shadow-xl flex flex-col items-center">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4 mt-2">
              <DollarSign className="w-6 h-6 text-white" />
            </div>

            <div className="mb-2 w-full text-center">
              <div className="text-xl font-bold text-gray-900">Pagamento via PIX</div>
              <div className="text-lg font-semibold text-blue-600 mt-1">R$ 39,99</div>
            </div>

            <p className="text-gray-700 text-sm mb-2 text-center">
              Escaneie o QR Code ou copie o código abaixo e pague no app do seu banco.
            </p>

            {copiaCola && (
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(copiaCola)}`}
                alt="QR Code PIX"
                className="w-48 h-48 mx-auto border rounded bg-white mb-4"
              />
            )}

            <textarea
              value={copiaCola}
              readOnly
              rows={3}
              className="w-full p-2 border rounded bg-gray-100 text-gray-800 mb-4 text-center font-mono text-base"
              style={{ resize: 'none' }}
            />

            <Button onClick={handleCopy} className="w-full mb-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copiado!" : "Copiar código PIX"}
            </Button>

            {/* MENSAGEM DE STATUS DO PAGAMENTO */}
            {statusPix === "aguardando" && (
              <p className="text-yellow-600 text-sm mt-2 font-medium">⏳ Aguardando pagamento...</p>
            )}
            {statusPix === "confirmado" && (
              <p className="text-green-600 text-sm mt-2 font-semibold">✅ Pagamento confirmado!</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
