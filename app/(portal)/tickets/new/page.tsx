// Formulario para crear nuevo ticket
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTicketPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    setLoading(false);
    if (res.ok) {
      router.push('/tickets');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Crear nuevo ticket</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-lg">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
          {loading ? 'Creando...' : 'Crear ticket'}
        </button>
      </form>
    </div>
  );
}
