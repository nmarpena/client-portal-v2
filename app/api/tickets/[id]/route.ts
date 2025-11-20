// API route para detalle de ticket
import { NextRequest, NextResponse } from 'next/server';
import { getTicketDetail } from '../../../../lib/mondayClient';
import { getSessionEmail } from '../../../../lib/session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = req.cookies.get('session')?.value;
  const email = session ? getSessionEmail(session) : null;
  if (!email) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const ticket = await getTicketDetail(params.id);
  // Validar que el ticket pertenece al usuario
  if (!ticket || !ticket.column_values.some((col: any) => col.id === 'email' && col.text === email)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }
  return NextResponse.json({ ticket });
}
