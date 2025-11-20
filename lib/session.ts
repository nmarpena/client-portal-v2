// Manejo de sesión y cookies seguras
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export function createSessionToken(email: string) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
}

export function setSessionCookie(res: NextResponse, email: string) {
  const token = createSessionToken(email);
  res.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 // 7 días
  });
}

export function getSessionEmail(token: string): string | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string };
    return payload.email;
  } catch {
    return null;
  }
}
