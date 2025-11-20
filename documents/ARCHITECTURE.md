# Arquitectura Implementada: Client Portal

## Stack
- Next.js 14+ (App Router, TypeScript)
- API routes para backend
- Tailwind CSS para UI
- Integración con monday.com vía GraphQL API
- Autenticación por magic link y JWT

## Estructura
- `app/(public)/login`: login por magic link
- `app/(portal)/dashboard`: dashboard principal
- `app/(portal)/tickets`: listado, detalle y creación de tickets
- `app/api/`: endpoints para auth, tickets, comentarios, archivos
- `lib/`: integración con monday.com, auth y sesión
- `config/`: constantes globales
- `documents/`: documentación técnica

## Seguridad
- Tokens y secretos solo en backend
- Cookies httpOnly y seguras
- Validación de acceso por email y ticket

## Flujos principales
- **Login:** Solicitud de magic link, verificación y sesión JWT
- **Tickets:** Listado, detalle, comentarios, archivos, creación
- **Integración:** mondayClient centraliza todas las operaciones

## Pruebas
- Tests unitarios para integración y auth
- Mock de envío de correo en desarrollo

## Despliegue
- Listo para Vercel o similar
- Variables de entorno seguras

---
Para detalles funcionales, ver `documents/arquitectura.md`.
