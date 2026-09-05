# Playbook Java + Angular

## Stack
- **Frontend**: Angular 17+ + TypeScript + Angular Material + Tailwind
- **Backend**: Spring Boot 3+ + JPA/Hibernate + Maven/Gradle
- **Base de Datos**: PostgreSQL
- **Auth**: Spring Security + JWT + OAuth2
- **Testing**: JUnit + Mockito (unit) + Cypress (E2E)
- **Infra**: Docker Compose + GitHub Actions

## Estructura recomendada
```
/webapp
├── frontend/          # Angular
│   ├── src/app/
│   │   ├── modules/   # Módulos funcionales
│   │   ├── core/      # Services, guards, interceptors
│   │   └── shared/    # Componentes reutilizables
├── backend/           # Spring Boot
│   ├── src/main/java/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── service/
│   │   └── repository/
│   └── src/main/resources/
├── docker-compose.yml
└── .github/workflows/
```

## Checklist de inicialización
- [ ] Spring Boot Initializr con Web, JPA, Security, PostgreSQL
- [ ] Angular CLI con routing + módulos
- [ ] Spring Security + JWT configurado
- [ ] Entidades JPA + migraciones (Flyway)
- [ ] Docker Compose (PostgreSQL + backend + frontend)
- [ ] GitHub Actions (mvn test + build + docker)
- [ ] Variables de entorno documentadas
