// Tests unitarios para integración con monday.com
import { mondayQuery, getClientTickets } from './mondayClient';

describe('mondayClient', () => {
  it('mondayQuery ejecuta una consulta', async () => {
    const query = '{ boards { id name } }';
    const data = await mondayQuery(query);
    expect(data).toHaveProperty('data');
  });

  it('getClientTickets retorna tickets', async () => {
    const tickets = await getClientTickets('test@example.com');
    expect(Array.isArray(tickets)).toBe(true);
  });
});
