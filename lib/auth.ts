// Utilidades de autenticación y generación de magic link
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

export function generateMagicToken(email: string) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '15m' });
}

export async function sendMagicLink(email: string) {
  const token = generateMagicToken(email);
  const magicUrl = `${NEXTAUTH_URL}/login?token=${token}`;
  // Mock de envío en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log(`Magic link para ${email}: ${magicUrl}`);
    return;
  }
  // Envío real
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Tu acceso al Client Portal',
    text: `Haz clic en el siguiente enlace para acceder: ${magicUrl}`
  });
}

export function verifyMagicToken(token: string): string | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string };
    return payload.email;
  } catch {
    return null;
  }
}
