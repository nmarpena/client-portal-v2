// API route para verificar el token del magic link
import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicToken } from '../../../../lib/auth';
import { setSessionCookie } from '../../../../lib/session';

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const email = verifyMagicToken(token);
  if (!email) return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
  // Emite cookie de sesión
  const res = NextResponse.json({ ok: true });
  setSessionCookie(res, email);
  return res;
}
