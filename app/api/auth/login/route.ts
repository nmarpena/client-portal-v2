// API route para login por usuario y contraseña
import { NextRequest, NextResponse } from 'next/server';
import { setSessionCookie } from '../../../../lib/session';
import { mondayQuery } from '../../../../lib/mondayClient';

// Configura el ID del board de usuarios en monday.com
const USERS_BOARD_ID = 18386098097; // <-- ID real del board de usuarios

export async function POST(req: NextRequest) {
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
  console.log('Usuarios recibidos desde monday:', JSON.stringify(items, null, 2));
  // Asume que hay columnas 'username', 'password', 'email' en el board
  const user = items.find((item: any) => {
    const usernameCol = item.column_values.find((col: any) => col.id === 'text_mkxx2x28');
    const passwordCol = item.column_values.find((col: any) => col.id === 'text_mkxwh804');
    console.log('--- DEPURACIÓN LOGIN ---');
    console.log('Input usuario:', username);
    console.log('Input contraseña:', password);
    console.log('Board usuario:', usernameCol?.text);
    console.log('Board contraseña:', passwordCol?.text);
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
