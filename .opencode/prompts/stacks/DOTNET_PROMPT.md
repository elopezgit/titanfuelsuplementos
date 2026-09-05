# Prompt .NET

## Stack
- ASP.NET Core 8+ (Minimal APIs)
- Entity Framework Core + SQL Server/PostgreSQL
- Auth: JWT + Identity + Refresh Token
- Testing: xUnit + Moq + Testcontainers
- Documentación: Swagger/OpenAPI

## Prioridades
1. Estructura Clean Architecture (Presentation / Application / Domain / Infrastructure)
2. CQRS con MediatR para casos de uso
3. FluentValidation para validación de entrada
4. EF Core migrations versionadas
5. Logging estructurado con Serilog
6. Health checks para monitoreo

## Anti-patrones
- Lógica de negocio en controllers
- DbContext con múltiples responsibility
- Queries N+1 sin Include o ProjectTo
- Excepciones sin manejo global (Exception Filter / Middleware)
- Secrets en appsettings.json comiteados
