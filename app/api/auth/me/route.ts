import { NextRequest, NextResponse } from 'next/server';
import { mondayQuery } from '../../../../lib/mondayClient';
import { getSessionEmail } from '../../../../lib/session';

const USERS_BOARD_ID = 18386098097;
const USER_COL_ID = 'text_mkxx2x28';

export async function GET(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  const username = session ? getSessionEmail(session) : null;
  if (!username) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  // Consulta todos los usuarios del board
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
  const items = data?.data?.boards?.[0]?.items_page?.items || [];
  const user = items.find((item: any) => {
    const usernameCol = item.column_values.find((col: any) => col.id === USER_COL_ID);
    return usernameCol?.text === username;
  });
  if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  return NextResponse.json({ user });
}
