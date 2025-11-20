// Listado de tickets del usuario
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Ticket } from '../../../lib/types';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tickets')
      .then(res => res.json())
      .then(data => {
        setTickets(data.tickets || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Tus Tickets</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map(ticket => (
            <li key={ticket.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{ticket.name}</div>
                <div className="text-sm text-gray-500">ID: {ticket.id}</div>
              </div>
              <Link href={`/tickets/${ticket.id}`} className="text-blue-600 underline">Ver detalle</Link>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8">
        <Link href="/tickets/new" className="bg-blue-600 text-white px-4 py-2 rounded">Crear nuevo ticket</Link>
      </div>
    </div>
  );
}
