# Playbook .NET + React

## Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS (o Next.js)
- **Backend**: ASP.NET Core 8+ Minimal APIs + Entity Framework Core
- **Base de Datos**: SQL Server (o PostgreSQL)
- **Auth**: JWT + Identity + Refresh Token
- **Testing**: xUnit + Moq (unit) + Playwright (E2E)
- **Infra**: Docker Compose + GitHub Actions

## Estructura recomendada
```
/webapp
├── frontend/          # React + Vite o Next.js
│   ├── src/
│   │   ├── components/
│   │   ├── pages/     # o app/ (Next.js)
│   │   └── hooks/
│   └── public/
├── backend/
│   ├── WebApi/        # Proyecto API
│   ├── Application/   # Casos de uso (CQRS / MediatR)
│   ├── Domain/        # Entidades de dominio
│   └── Infrastructure/ # Persistencia (EF Core)
├── tests/
│   ├── UnitTests/
│   └── IntegrationTests/
├── docker-compose.yml
└── .github/workflows/
```

## Checklist de inicialización
- [ ] `dotnet new webapi` con estructura Clean Architecture
- [ ] Configurar EF Core + migraciones iniciales
- [ ] Swagger/OpenAPI configurado
- [ ] JWT + Identity configurado
- [ ] React + Vite o Next.js con Tailwind
- [ ] Docker Compose (app SQL + backend + frontend)
- [ ] GitHub Actions (dotnet test + build + docker)
- [ ] Playwright para E2E
- [ ] Variables de entorno documentadas
