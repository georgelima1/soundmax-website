import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nome, email, mensagem, consentimento } = data || {};

    if (!nome || !email || !mensagem || consentimento !== true) {
      return NextResponse.json({ ok: false, error: "Dados inválidos" }, { status: 400 });
    }

    // TODO: Integrar com SendGrid/Resend ou webhook/CRM
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Erro inesperado" }, { status: 500 });
  }
}
