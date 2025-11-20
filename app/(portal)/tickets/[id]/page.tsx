// Detalle de ticket, comentarios y archivos
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TicketDetail } from '../../../../lib/types';

export default function TicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch(`/api/tickets/${id}`)
      .then(res => res.json())
      .then(data => {
        setTicket(data.ticket);
        setLoading(false);
      });
  }, [id]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId: id, text: comment })
    });
    setComment('');
    // Refrescar comentarios
    fetch(`/api/tickets/${id}`)
      .then(res => res.json())
      .then(data => setTicket(data.ticket));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {loading ? <p>Cargando...</p> : ticket && (
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">{ticket.name}</h1>
          <div className="mb-4">
            <div className="font-semibold">ID: {ticket.id}</div>
            {ticket.column_values.map(col => (
              <div key={col.id} className="text-sm text-gray-600">{col.id}: {col.text}</div>
            ))}
          </div>
          <h2 className="text-lg font-semibold mt-6 mb-2">Comentarios</h2>
          <ul className="mb-4">
            {ticket.updates.map(upd => (
              <li key={upd.id} className="border-b py-2 text-sm">{upd.body} <span className="text-gray-400">({upd.created_at})</span></li>
            ))}
          </ul>
          <form onSubmit={handleComment} className="mb-4">
            <input
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Agregar comentario"
              className="border p-2 rounded w-full mb-2"
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
          </form>
          <h2 className="text-lg font-semibold mt-6 mb-2">Archivos</h2>
          <ul>
            {ticket.assets.map(file => (
              <li key={file.id} className="py-1">
                <a href={file.public_url} target="_blank" rel="noopener" className="text-blue-600 underline">{file.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
