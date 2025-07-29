// app/api/verifica-status/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ status: "error", message: "Email não fornecido" });
  }

  const { data, error } = await supabase
    .from("pagamentos")
    .select("status")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json({ status: "PENDING" });
  }

  return NextResponse.json({ status: data.status === "PAID" ? "PAID" : "PENDING" });
} 