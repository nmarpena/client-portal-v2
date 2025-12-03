// API route para login por usuario y contraseña
import { NextRequest, NextResponse } from 'next/server';
import { setSessionCookie } from '../../../../lib/session';
import { mondayQuery } from '../../../../lib/mondayClient';

// Configura el ID del board de usuarios en monday.com
const USERS_BOARD_ID = 18386098097; // <-- ID real del board de usuarios

export async function POST(req: NextRequest) {
  // Validación de la variable de entorno MONDAY_API_TOKEN
  const mondayApiToken = process.env.MONDAY_API_TOKEN;
  console.log("MONDAY_API_TOKEN valor:", mondayApiToken);
  console.log("MONDAY_API_TOKEN:", mondayApiToken ? "[EXISTE]" : "[NO CONFIGURADA]");
  if (!mondayApiToken) {
    return NextResponse.json({ error: "MONDAY_API_TOKEN no configurada en el entorno." }, { status: 401 });
  }

  const { username, password } = await req.json();
  // Consulta los usuarios desde el board de monday.com
  const query = `query ($board: [ID!]) {
    boards (ids: $board) {
      items_page {
        items {
          id
          name
          column_values { id value text }
        }
      }
    }
  }`;
  const data = await mondayQuery(query, { board: [String(USERS_BOARD_ID)] });
  console.log('--- RESPUESTA COMPLETA DE MONDAY ---');
  console.log(JSON.stringify(data, null, 2));
  if (!data || !data.data || !data.data.boards || !data.data.boards[0] || !data.data.boards[0].items_page || !data.data.boards[0].items_page.items) {
    return NextResponse.json({ error: 'Error en la consulta a Monday.com', details: data }, { status: 500 });
  }
  const items = data.data.boards[0].items_page.items || [];
  console.log('--- ITEMS RECIBIDOS DESDE MONDAY ---');
  items.forEach((item: any) => {
    console.log('Item:', item.name);
    item.column_values.forEach((col: any) => {
      console.log(`  Columna: ${col.id} | Valor: ${col.text}`);
    });
  });
  // Usar los IDs reales de las columnas de Monday.com
  const USER_COL_ID = 'text_mkxx2x28';
  const PASS_COL_ID = 'text_mkxwh804';
  const STATUS_COL_ID = 'status'; // ID correcto de la columna de estado
  const user = items.find((item: any) => {
    const usernameCol = item.column_values.find((col: any) => col.id === USER_COL_ID);
    return usernameCol?.text === username;
  });
  if (!user) {
    console.log('No se encontró usuario válido para:', username);
    return NextResponse.json({ error: 'Usuario o contraseña incorrectos.' }, { status: 401 });
  }
  // Validar estado del usuario
  const statusCol = user.column_values.find((col: any) => col.id === STATUS_COL_ID);
  if (statusCol && statusCol.text === 'Inactivo') {
    return NextResponse.json({ error: 'Usuario inactivo. No puede iniciar sesión.', code: 'usuario_inactivo' }, { status: 403 });
  }
  // Validar contraseña
  const passwordCol = user.column_values.find((col: any) => col.id === PASS_COL_ID);
  if (!passwordCol || passwordCol.text !== password) {
    return NextResponse.json({ error: 'Usuario o contraseña incorrectos.' }, { status: 401 });
  }
  const usernameCol = user.column_values.find((col: any) => col.id === USER_COL_ID);
  const res = NextResponse.json({ ok: true });
  setSessionCookie(res, usernameCol?.text || '');
  return res;
}
