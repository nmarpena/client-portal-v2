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
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(120deg, #eaf0f7 60%, #FFD400 100%)',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-[#d8d8d8] w-full max-w-md flex flex-col items-center"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,.075)' }}
      >
        <img
          src="/logo1.png"
          alt="Logo Redsis"
          className="mb-2 w-14 h-14 object-contain drop-shadow-sm mx-auto"
        />
        <h1 className="text-xl sm:text-2xl font-bold mb-2 text-[#FFD400] text-center">Acceso al Portal Redsis</h1>
        <p className="text-gray-500 mb-6 text-center text-sm">Bienvenido, ingresa tus credenciales para continuar</p>
        <div className="w-full flex flex-col items-center">
          <input
            type="text"
            required
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border-2 border-[#FFD400] p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD400] bg-white text-gray-800 placeholder-gray-400 transition text-center"
          />
          <input
            type="password"
            required
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border-2 border-[#FFD400] p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD400] bg-white text-gray-800 placeholder-gray-400 transition text-center"
          />
          <button
            type="submit"
            className="bg-[#FFD400] hover:bg-[#ffbc0f] text-gray-900 font-semibold px-4 py-2 rounded-md w-full border-2 border-[#FFD400] transition-colors duration-200 shadow-sm mt-2"
          >
            Ingresar
          </button>
          {error && <p className="text-red-600 mt-3 text-center text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
}
