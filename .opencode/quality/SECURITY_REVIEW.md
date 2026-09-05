# Plantilla de Revisión de Seguridad

## Objetivo
Identificar vulnerabilidades y asegurar que el código cumple con los estándares de seguridad.

## Checklist de revisión

### Autenticación y Autorización
- [ ] Autenticación implementada de forma segura (sin credenciales hardcodeadas)
- [ ] Autorización validada en cada endpoint/recurso
- [ ] Tokens JWT con expiración y validación de firma
- [ ] Principio de mínimo privilegio aplicado
- [ ] MFA disponible para acciones sensibles

### Validación de Inputs
- [ ] Todos los inputs validados (tipo, longitud, formato)
- [ ] SQL parameterized queries (sin concatenación)
- [ ] Sanitización de inputs para prevenir XSS
- [ ] Protección contra CSRF en formularios
- [ ] Rate limiting en endpoints sensibles

### Manejo de Datos
- [ ] Datos sensibles encriptados en reposo
- [ ] HTTPS obligatorio en producción
- [ ] Secrets almacenados en vault/Key Vault (no en código)
- [ ] Headers de seguridad configurados (CSP, HSTS, X-Frame-Options)
- [ ] Logging sin datos sensibles

### Dependencias
- [ ] Sin dependencias con vulnerabilidades conocidas
- [ ] Versiones actualizadas de paquetes
- [ ] Dependencias mínimas necesarias
- [ ] Licencias de terceros revisadas

## OWASP Top 10 checklist
- [ ] A01: Broken Access Control
- [ ] A02: Cryptographic Failures
- [ ] A03: Injection
- [ ] A04: Insecure Design
- [ ] A05: Security Misconfiguration
- [ ] A06: Vulnerable Components
- [ ] A07: Auth Failures
- [ ] A08: Data Integrity Failures
- [ ] A09: Logging Failures
- [ ] A10: SSRF

## Reporte
- **Componente evaluado**:
- **Hallazgos críticos**:
- **Hallazgos medios**:
- **Hallazgos bajos**:
- **Recomendaciones priorizadas**:
