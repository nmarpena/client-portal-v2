// Endpoint para recibir webhooks de monday.com y validar la firma
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const SIGNING_SECRET = process.env.MONDAY_SIGNING_SECRET || '';

function isValidSignature(req: NextRequest, body: string) {
  const signature = req.headers.get('x-monday-signature');
  const hash = crypto.createHmac('sha256', SIGNING_SECRET).update(body).digest('hex');
  return signature === hash;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  if (!isValidSignature(req, rawBody)) {
    return NextResponse.json({ error: 'Firma inválida' }, { status: 401 });
  }
  const body = JSON.parse(rawBody);
  // Procesa el evento recibido
  console.log('Webhook recibido:', body);
  // Aquí puedes agregar lógica para actualizar tickets, usuarios, etc.
  return NextResponse.json({ ok: true });
}
