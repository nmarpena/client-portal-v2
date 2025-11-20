// API route para listado y creación de tickets
import { NextRequest, NextResponse } from 'next/server';
import { getClientTickets, createTicket } from '../../../lib/mondayClient';
import { getSessionEmail } from '../../../lib/session';

export async function GET(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  const email = session ? getSessionEmail(session) : null;
  if (!email) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const tickets = await getClientTickets(email);
  return NextResponse.json({ tickets });
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  const email = session ? getSessionEmail(session) : null;
  if (!email) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const fields = await req.json();
  const ticket = await createTicket(email, fields);
  return NextResponse.json({ ticket });
}
