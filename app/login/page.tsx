"use client";
// Pantalla de login por usuario y contraseña
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      window.location.href = '/dashboard';
    } else {
      const data = await res.json();
      if (data.code === 'usuario_inactivo') {
        setError('Usuario inactivo. No puede iniciar sesión.');
      } else {
        setError(data.error || 'Usuario o contraseña incorrectos.');
      }
    }
  };

  return (
    <main className="login-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#3b3b3b', fontFamily: 'Montserrat, Arial, sans-serif' }}>
      <img src="/login/colorb-s.png" alt="Logo Redsis" className="login-logo" style={{ width: '90px', height: '90px', marginBottom: '32px', objectFit: 'contain' }} />
      <h1 className="portal-title" style={{ textAlign: 'center', color: '#fff', fontFamily: 'Montserrat, Arial, sans-serif', fontSize: '0.9rem', fontWeight: 500, marginBottom: '2px', marginTop: '-24px', letterSpacing: '1px' }}>Client Portal</h1>
      <div style={{ height: '2em' }}></div>
      <form className="login-form" autoComplete="off" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'transparent', padding: 0 }}>
        <div className="input-group" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span className="input-icon" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" fill="none" stroke="#a2a2a2" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <polyline points="3 7 12 13 21 7" />
            </svg>
          </span>
          <input
            type="text"
            required
            placeholder="E-mail"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', padding: '12px 12px 12px 44px', background: '#fff', border: '1.5px solid #d8d8d8', borderRadius: '7px', fontSize: '16px', color: '#333', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' }}
            className="login-input"
          />
        </div>
        <div className="input-group" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span className="input-icon" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" fill="none" stroke="#a2a2a2" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="5" y="11" width="14" height="8" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px 12px 12px 44px', background: '#fff', border: '1.5px solid #d8d8d8', borderRadius: '7px', fontSize: '16px', color: '#333', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' }}
            className="login-input"
          />
        </div>
        <button type="submit" className="login-btn" style={{ width: '100%', padding: '12px 0', background: 'transparent', border: '2px solid #ffcf44', borderRadius: '7px', color: '#fff', fontSize: '16px', fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s, color 0.2s', letterSpacing: '0.5px' }}>Sing In</button>
        {error && <div id="loginError" style={{ marginTop: '10px', color: '#ff4d4f', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
      </form>
    </main>
  );
}
