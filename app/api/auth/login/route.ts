// API route para login por usuario y contraseña
import { NextRequest, NextResponse } from 'next/server';
import { setSessionCookie } from '../../../../lib/session';
import { mondayQuery } from '../../../../lib/mondayClient';

// Configura el ID del board de usuarios en monday.com
const USERS_BOARD_ID = 18386098097; // <-- ID real del board de usuarios

export async function POST(req: NextRequest) {
  // Validación de la variable de entorno MONDAY_API_TOKEN
  const mondayApiToken = process.env.MONDAY_API_TOKEN;
  console.log("MONDAY_API_TOKEN:", mondayApiToken ? "[EXISTE]" : "[NO CONFIGURADA]");
  if (!mondayApiToken) {
    return NextResponse.json({ error: "MONDAY_API_TOKEN no configurada en el entorno." }, { status: 401 });
  }

  const { username, password } = await req.json();
  // Consulta los usuarios desde el board de monday.com
  const query = `query ($board: [Int!]) {
    items (board_ids: $board) {
      id
      name
      column_values { id value text }
    }
  }`;
  const data = await mondayQuery(query, { board: [USERS_BOARD_ID] });
  const items = data.data.items || [];
  console.log('--- ITEMS RECIBIDOS DESDE MONDAY ---');
  items.forEach((item: any) => {
    console.log('Item:', item.name);
    item.column_values.forEach((col: any) => {
      console.log(`  Columna: ${col.id} | Valor: ${col.text}`);
    });
  });
  // Asume que hay columnas 'username', 'password', 'email' en el board
  const user = items.find((item: any) => {
    const usernameCol = item.column_values.find((col: any) => col.id === 'username');
    const passwordCol = item.column_values.find((col: any) => col.id === 'password');
    console.log('Comparando:', {
      usernameInput: username,
      passwordInput: password,
      usernameBoard: usernameCol?.text,
      passwordBoard: passwordCol?.text
    });
    return usernameCol?.text === username && passwordCol?.text === password;
  });
  if (!user) {
    console.log('No se encontró usuario válido para:', username);
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
  }
  const emailCol = user.column_values.find((col: any) => col.id === 'email');
  const res = NextResponse.json({ ok: true });
  setSessionCookie(res, emailCol?.text || '');
  return res;
}
