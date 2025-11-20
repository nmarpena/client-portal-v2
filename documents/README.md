# Client Portal para monday.com

Portal privado y auto-hospedado para clientes externos, integrado con monday.com.

## Requisitos previos
- Node.js 18+
- Variables de entorno configuradas (`.env` basado en `.env.example`)

## Instalación y desarrollo
```bash
npm install
npm run dev
```

## Variables de entorno
Ver `.env.example` para todos los valores necesarios:
- MONDAY_API_TOKEN
- MONDAY_CLIENT_ID
- MONDAY_CLIENT_SECRET
- JWT_SECRET
- EMAIL_FROM, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
- NEXTAUTH_URL

## Comandos principales
- `npm run dev`: desarrollo
- `npm run build`: build de producción
- `npm run start`: iniciar en producción
- `npm test`: ejecutar tests

## Estructura principal
- `app/`: rutas Next.js (App Router)
- `app/api/`: endpoints backend
- `lib/`: integración y lógica
- `documents/`: documentación
- `styles/`: estilos globales

## Seguridad
- Ningún secreto ni token se expone al cliente.
- Cookies de sesión httpOnly y seguras.

## Tests
- Pruebas unitarias para integración con monday.com y autenticación.

## Despliegue
- Recomendado: Vercel
- Configurar variables de entorno en el dashboard de Vercel.

---
Para detalles funcionales y técnicos, ver `documents/arquitectura.md` y `documents/ARCHITECTURE.md`.
