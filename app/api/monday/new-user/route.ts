import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Aquí procesas el payload recibido de Monday.com
    // Por ejemplo, puedes extraer nombre y email:
    // const { event } = data;
    // const name = event.columnValues.find(c => c.id === 'name')?.value;
    // const email = event.columnValues.find(c => c.id === 'email')?.value;

    // TODO: Registrar usuario y enviar magic link

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
