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
    <div className="min-h-screen flex items-center justify-center bg-[#eaf0f7]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg border border-[#d8d8d8] w-full max-w-md flex flex-col items-center"
        style={{ boxShadow: '0 2px 5px rgba(0,0,0,.075)' }}
      >
        <img
          src="/logo1.png"
          alt="Logo Redsis"
          className="mb-6 w-32 h-32 object-contain"
        />
        <h1 className="text-2xl font-bold mb-4 text-[#FFD400]">Acceso al Portal</h1>
        <input
          type="text"
          required
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border-2 border-[#FFD400] p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#FFD400] bg-white text-gray-800"
        />
        <input
          type="password"
          required
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border-2 border-[#FFD400] p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#FFD400] bg-white text-gray-800"
        />
        <button
          type="submit"
          className="bg-[#FFD400] hover:bg-[#ffbc0f] text-gray-900 font-semibold px-4 py-2 rounded w-full border-2 border-[#FFD400] transition-colors duration-200 shadow"
        >
          Ingresar
        </button>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </form>
    </div>
  );
}
