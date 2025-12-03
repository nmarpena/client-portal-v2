import { NextRequest, NextResponse } from 'next/server';

const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;
const BOARD_ID = 18386098097;
const USER_COL_ID = 'text_mkxx2x28';
const PASS_COL_ID = 'text_mkxwh804';

export async function POST(req: NextRequest) {
  if (!MONDAY_API_TOKEN) {
    return NextResponse.json({ error: 'MONDAY_API_TOKEN no configurada.' }, { status: 401 });
  }

  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: 'Faltan datos.' }, { status: 400 });
  }

  // GraphQL mutation para crear un nuevo usuario en el board
  const mutation = `mutation ($boardId: Int!, $itemName: String!, $columnVals: JSON!) {
    create_item (board_id: $boardId, item_name: $itemName, column_values: $columnVals) {
      id
      name
    }
  }`;

  const columnValues = {
    [USER_COL_ID]: username,
    [PASS_COL_ID]: password
  };

  const response = await fetch('https://api.monday.com/v2', {
    method: 'POST',
    headers: {
      'Authorization': MONDAY_API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        boardId: BOARD_ID,
        itemName: username,
        columnVals: JSON.stringify(columnValues)
      }
    }),
  });

  const data = await response.json();
  if (data.errors) {
    return NextResponse.json({ error: 'Error al registrar usuario.', details: data.errors }, { status: 500 });
  }

  return NextResponse.json({ ok: true, user: data.data.create_item });
}
