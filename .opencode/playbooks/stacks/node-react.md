# Playbook Node + React

## Stack
- **Frontend**: Next.js 14+ (App Router) + TypeScript + Tailwind CSS
- **Backend**: NestJS o Express + TypeScript + Prisma ORM
- **Base de Datos**: PostgreSQL
- **Auth**: JWT + Refresh Token (o NextAuth.js)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Infra**: Docker Compose + GitHub Actions

## Estructura recomendada
```
/webapp
├── frontend/          # Next.js App Router
│   ├── app/           # Rutas y layouts
│   ├── components/    # Componentes reutilizables
│   ├── lib/           # Utils, hooks, services
│   └── types/         # TypeScript types
├── backend/           # NestJS o Express
│   ├── src/
│   │   ├── modules/   # Módulos por dominio
│   │   ├── common/    # Guards, interceptors, filters
│   │   └── config/    # Configuración
│   └── prisma/        # Schema + migrations
├── docker-compose.yml
└── .github/workflows/
```

## Checklist de inicialización
- [ ] `create-next-app` con App Router + TypeScript + Tailwind
- [ ] Configurar ESLint + Prettier
- [ ] Configurar NestJS o Express con estructura modular
- [ ] Configurar Prisma + PostgreSQL
- [ ] Implementar auth (JWT o NextAuth.js)
- [ ] Agregar Docker Compose (app + BD)
- [ ] Configurar GitHub Actions (lint + test + build)
- [ ] Agregar Playwright para E2E
- [ ] Variables de entorno documentadas (.env.example)
