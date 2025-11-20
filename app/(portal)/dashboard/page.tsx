// Dashboard principal del portal
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Client Portal</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Tus tickets</h2>
        <Link href="/tickets" className="text-blue-600 underline">Ver listado de tickets</Link>
        <div className="mt-6">
          <Link href="/tickets/new" className="bg-blue-600 text-white px-4 py-2 rounded">Crear nuevo ticket</Link>
        </div>
      </div>
    </div>
  );
}
