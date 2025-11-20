// API route para enviar magic link
import { NextRequest, NextResponse } from 'next/server';
import { sendMagicLink } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
  try {
    await sendMagicLink(email);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Error enviando el enlace' }, { status: 500 });
  }
}
