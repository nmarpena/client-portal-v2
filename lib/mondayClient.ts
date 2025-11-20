// Cliente centralizado para integración con monday.com
import axios from 'axios';

const MONDAY_API_URL = 'https://api.monday.com/v2';

export async function mondayQuery(query: string, variables?: any) {
  const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;
  if (!MONDAY_API_TOKEN) throw new Error('MONDAY_API_TOKEN no configurado');
  const res = await axios.post(
    MONDAY_API_URL,
    { query, variables },
    {
      headers: {
        Authorization: MONDAY_API_TOKEN,
        'Content-Type': 'application/json'
      }
    }
  );
  return res.data;
}

export async function getClientTickets(email: string) {
  // Ejemplo: obtener items/tickets por email (ajustar query según board y columnas reales)
  const query = `query ($email: String!) {
    items_by_column_values (board_id: 123456, column_id: "email", column_value: $email) {
      id
      name
      column_values { id value text }
    }
  }`;
  const data = await mondayQuery(query, { email });
  return data.data.items_by_column_values;
}

export async function getTicketDetail(ticketId: string) {
  const query = `query ($id: [Int]) {
    items (ids: $id) {
      id
      name
      column_values { id value text }
      updates { id body created_at }
      assets { id name public_url }
    }
  }`;
  const data = await mondayQuery(query, { id: [Number(ticketId)] });
  return data.data.items[0];
}

export async function createTicket(email: string, fields: any) {
  // Crear nuevo ticket (ajustar board y columnas)
  const query = `mutation ($board: Int!, $item: String!, $columnVals: JSON!) {
    create_item (board_id: $board, item_name: $item, column_values: $columnVals) {
      id
    }
  }`;
  const variables = {
    board: 123456,
    item: fields.title,
    columnVals: JSON.stringify({ email, ...fields })
  };
  const data = await mondayQuery(query, variables);
  return data.data.create_item;
}

export async function addComment(ticketId: string, text: string) {
  const query = `mutation ($itemId: Int!, $body: String!) {
    create_update (item_id: $itemId, body: $body) {
      id
    }
  }`;
  const data = await mondayQuery(query, { itemId: Number(ticketId), body: text });
  return data.data.create_update;
}

export async function uploadFile(ticketId: string, file: Buffer, filename: string) {
  // Implementación real requiere endpoint REST de monday para archivos
  // Aquí solo mock para MVP
  return { id: 'mock', name: filename, public_url: '/mock/' + filename };
}
