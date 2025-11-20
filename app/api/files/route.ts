// API route para subir archivos a un ticket
import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '../../../lib/mondayClient';
import { getSessionEmail } from '../../../lib/session';

export async function POST(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  const email = session ? getSessionEmail(session) : null;
  if (!email) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  // Para MVP: solo mock, en real se debe parsear multipart/form-data
  const { ticketId, filename } = await req.json();
  const file = Buffer.from('mock');
  const asset = await uploadFile(ticketId, file, filename);
  return NextResponse.json({ asset });
}
