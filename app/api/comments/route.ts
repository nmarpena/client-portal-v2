// API route para agregar comentarios a un ticket
import { NextRequest, NextResponse } from 'next/server';
import { addComment } from '../../../lib/mondayClient';
import { getSessionEmail } from '../../../lib/session';

export async function POST(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  const email = session ? getSessionEmail(session) : null;
  if (!email) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const { ticketId, text } = await req.json();
  if (!ticketId || !text) return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  const comment = await addComment(ticketId, text);
  return NextResponse.json({ comment });
}
