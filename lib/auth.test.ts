// Tests unitarios para autenticación y magic link
import { generateMagicToken, verifyMagicToken } from './auth';

describe('auth', () => {
  it('genera y verifica magic token', () => {
    const email = 'test@example.com';
    const token = generateMagicToken(email);
    const verified = verifyMagicToken(token);
    expect(verified).toBe(email);
  });

  it('token expirado o inválido retorna null', () => {
    expect(verifyMagicToken('invalid')).toBeNull();
  });
});
