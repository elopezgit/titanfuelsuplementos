@echo off
title AIBF Central - Generador Inteligente de Proyectos v1.0
setlocal enabledelayedexpansion

:: ==============================================================================
::  AIBF CENTRAL - GENERADOR INTERACTIVO DE PROYECTOS
::  Basado en AI Bootstrap Framework v1.0 Enterprise
::  Creado a partir del analisis completo de aibf-central
:: ==============================================================================

chcp 65001 >nul 2>&1
set "AIBF_VERSION=1.0 Enterprise"
set "AIBF_DATE=2026-07-08"

:WELCOME
cls
echo ===============================================================================
echo                     AI BOOTSTRAP FRAMEWORK - GENERADOR v%AIBF_VERSION%
echo                         GENERADOR INTELIGENTE DE PROYECTOS
echo ===============================================================================
echo.
echo  Este asistente te guiara en la creacion de un proyecto basado en
echo  el AI Bootstrap Framework Central (aibf-central).
echo.
echo  Al finalizar, se generara automaticamente:
echo    - Estructura completa .opencode/ con toda la inteligencia IA
echo    - 22 agentes especializados (o subconjunto segun tu stack)
echo    - 110+ skills expertas (solo las relevantes)
echo    - Workflow de 12 fases, orquestador, planificacion
echo    - Memoria persistente, conocimiento, templates
echo    - Guias tecnologicas, especialistas, playbooks
echo    - Motores de tokens, contexto y calidad
echo    - Sistema de auditoria y gobierno enterprise
echo.
echo  Framework: %AIBF_VERSION% - Fecha: %AIBF_DATE%
echo.
echo  PRESIONA ENTER PARA COMENZAR...
pause >nul 2>&1

goto :ASK_PROJECT_NAME

:: ==============================================================================
:: SECCION 1: INFORMACION BASICA DEL PROYECTO
:: ==============================================================================

:ASK_PROJECT_NAME
cls
echo ===============================================================================
echo  PASO 1/10 - NOMBRE DEL PROYECTO
echo ===============================================================================
echo.
set "PROJECT_NAME="
set /p "PROJECT_NAME=  Escribe el nombre de tu proyecto (ej: MiSaaSFacturacion): "
if "%PROJECT_NAME%"=="" (
    echo   [!] Debes escribir un nombre para continuar.
    timeout /t 2 >nul 2>&1
    goto ASK_PROJECT_NAME
)
echo.  [OK] Nombre: %PROJECT_NAME%

:ASK_PROJECT_DESC
cls
echo ===============================================================================
echo  PASO 2/10 - DESCRIPCION DEL PROYECTO
echo ===============================================================================
echo.
echo  Describe brevemente el proposito del proyecto.
echo  (Pulsa ENTER si no sabes aun, se usara un placeholder)
echo.
set "PROJECT_DESC="
set /p "PROJECT_DESC=  Descripcion: "
if "%PROJECT_DESC%"=="" set "PROJECT_DESC=Sistema desarrollado con AI Bootstrap Framework"
echo.  [OK] Descripcion: %PROJECT_DESC%

:ASK_PROJECT_TYPE
cls
echo ===============================================================================
echo  PASO 3/10 - TIPO DE PROYECTO
echo ===============================================================================
echo.
echo  Selecciona el tipo de proyecto:
echo.
echo    [1] Proyecto NUEVO desde cero (genera estructura completa)
echo    [2] Proyecto EXISTENTE (agrega solo .opencode/ al proyecto actual)
echo    [3] MIGRACION tecnologica (ej: .NET Framework a .NET 8)
echo    [4] REFACTORIZACION / pago de deuda tecnica
echo.
set "PROJECT_TYPE="
set /p "PROJECT_TYPE=  Opcion [1-4] (default 1): "
if "%PROJECT_TYPE%"=="" set "PROJECT_TYPE=1"
echo.  [OK] Tipo seleccionado: %PROJECT_TYPE%

:ASK_DOMAIN
cls
echo ===============================================================================
echo  PASO 4/10 - DOMINIO DE NEGOCIO
echo ===============================================================================
echo.
echo  Selecciona el dominio principal de tu proyecto:
echo.
echo    [1] eCommerce        (carrito, catalogo, pagos, envios)
echo    [2] Fintech          (transacciones, compliance, fraude)
echo    [3] SaaS             (multi-tenant, suscripciones, facturacion)
echo    [4] Travel           (reservas, hoteles, vuelos, itinerarios)
echo    [5] Collections      (cobranzas, scoring, reportes)
echo    [6] Healthcare       (pacientes, citas, historial clinico)
echo    [7] Education        (cursos, estudiantes, evaluaciones)
echo    [8] Logistics        (envios, rutas, inventario, proveedores)
echo    [9] Real Estate      (propiedades, inquilinos, contratos)
echo   [10] Otro (especificar)
echo.
set "DOMAIN_OPT="
set /p "DOMAIN_OPT=  Opcion [1-10] (default 1): "
if "%DOMAIN_OPT%"=="" set "DOMAIN_OPT=1"

if "%DOMAIN_OPT%"=="1" set "DOMAIN_NAME=eCommerce"
if "%DOMAIN_OPT%"=="2" set "DOMAIN_NAME=Fintech"
if "%DOMAIN_OPT%"=="3" set "DOMAIN_NAME=SaaS"
if "%DOMAIN_OPT%"=="4" set "DOMAIN_NAME=Travel"
if "%DOMAIN_OPT%"=="5" set "DOMAIN_NAME=Collections"
if "%DOMAIN_OPT%"=="6" set "DOMAIN_NAME=Healthcare"
if "%DOMAIN_OPT%"=="7" set "DOMAIN_NAME=Education"
if "%DOMAIN_OPT%"=="8" set "DOMAIN_NAME=Logistics"
if "%DOMAIN_OPT%"=="9" set "DOMAIN_NAME=RealEstate"
if "%DOMAIN_OPT%"=="10" (
    set /p "DOMAIN_NAME=  Especifica el dominio: "
    if "!DOMAIN_NAME!"=="" set "DOMAIN_NAME=Custom"
)
echo.  [OK] Dominio: %DOMAIN_NAME%

:: ==============================================================================
:: SECCION 2: STACK TECNOLOGICO
:: ==============================================================================

:ASK_BACKEND
cls
echo ===============================================================================
echo  PASO 5/10 - STACK TECNOLOGICO: BACKEND
echo ===============================================================================
echo.
echo  Selecciona el backend principal:
echo.
echo    [1] .NET / C#        (ASP.NET Core, EF Core, Minimal APIs)
echo    [2] Node.js / TS     (Express, NestJS, Next.js)
echo    [3] Java / Spring    (Spring Boot, JPA, Quarkus)
echo    [4] Python           (FastAPI, Django)
echo    [5] Go               (Gin, Echo, standard library)
echo    [6] Rust             (Actix, Axum, Rocket)
echo    [0] Ninguno / Solo Frontend
echo.
set "BACKEND_OPT="
set /p "BACKEND_OPT=  Opcion [0-6] (default 2): "
if "%BACKEND_OPT%"=="" set "BACKEND_OPT=2"

if "%BACKEND_OPT%"=="1" set "BACKEND_NAME=dotnet"
if "%BACKEND_OPT%"=="2" set "BACKEND_NAME=node"
if "%BACKEND_OPT%"=="3" set "BACKEND_NAME=java"
if "%BACKEND_OPT%"=="4" set "BACKEND_NAME=python"
if "%BACKEND_OPT%"=="5" set "BACKEND_NAME=go"
if "%BACKEND_OPT%"=="6" set "BACKEND_NAME=rust"
if "%BACKEND_OPT%"=="0" set "BACKEND_NAME=none"
echo.  [OK] Backend: %BACKEND_NAME%

:ASK_FRONTEND
cls
echo ===============================================================================
echo  PASO 6/10 - STACK TECNOLOGICO: FRONTEND
echo ===============================================================================
echo.
echo  Selecciona el frontend:
echo.
echo    [1] React / Next.js   (SPA, SSR, SSG)
echo    [2] Angular           (Standalone, Signals, NgRx)
echo    [3] Vue / Nuxt        (Composition API, Pinia)
echo    [4] Blazor            (.NET WebAssembly / Server)
echo    [5] Svelte / SvelteKit
echo    [0] Ninguno / Solo API
echo.
set "FRONTEND_OPT="
set /p "FRONTEND_OPT=  Opcion [0-5] (default 1): "
if "%FRONTEND_OPT%"=="" set "FRONTEND_OPT=1"

if "%FRONTEND_OPT%"=="1" set "FRONTEND_NAME=react"
if "%FRONTEND_OPT%"=="2" set "FRONTEND_NAME=angular"
if "%FRONTEND_OPT%"=="3" set "FRONTEND_NAME=vue"
if "%FRONTEND_OPT%"=="4" set "FRONTEND_NAME=blazor"
if "%FRONTEND_OPT%"=="5" set "FRONTEND_NAME=svelte"
if "%FRONTEND_OPT%"=="0" set "FRONTEND_NAME=none"
echo.  [OK] Frontend: %FRONTEND_NAME%

:ASK_DATABASE
cls
echo ===============================================================================
echo  PASO 7/10 - STACK TECNOLOGICO: BASE DE DATOS
echo ===============================================================================
echo.
echo  Selecciona la base de datos principal:
echo.
echo    [1] PostgreSQL    (relacional, robusto, open-source)
echo    [2] SQL Server    (enterprise, .NET ecosystem)
echo    [3] MySQL         (popular, web applications)
echo    [4] MongoDB       (NoSQL documental)
echo    [5] SQLite        (embebido, lightweight)
echo    [6] MariaDB       (fork MySQL, open-source)
echo    [0] Ninguna / A decidir
echo.
set "DB_OPT="
set /p "DB_OPT=  Opcion [0-6] (default 1): "
if "%DB_OPT%"=="" set "DB_OPT=1"

if "%DB_OPT%"=="1" set "DB_NAME=postgresql"
if "%DB_OPT%"=="2" set "DB_NAME=sqlserver"
if "%DB_OPT%"=="3" set "DB_NAME=mysql"
if "%DB_OPT%"=="4" set "DB_NAME=mongodb"
if "%DB_OPT%"=="5" set "DB_NAME=sqlite"
if "%DB_OPT%"=="6" set "DB_NAME=mariadb"
if "%DB_OPT%"=="0" set "DB_NAME=none"
echo.  [OK] Base de datos: %DB_NAME%

:ASK_ARCHITECTURE
cls
echo ===============================================================================
echo  PASO 8/10 - ARQUITECTURA Y DESPLIEGUE
echo ===============================================================================
echo.
echo  a) ESTILO ARQUITECTONICO:
echo.
echo    [1] Monolito Modular      (simple, rapido, para equipos pequenos)
echo    [2] Clean Architecture     (hexagonal, DDD, para proyectos mantenibles)
echo    [3] Microservicios         (escalable, independiente, equipos grandes)
echo    [4] CQRS / Event Sourcing  (alta escalabilidad en lecturas/escrituras)
echo    [5] Vertical Slices        (organizado por funcionalidad, pragmatico)
echo    [6] Serverless             (AWS Lambda, Azure Functions, GCP Cloud Functions)
echo.
set "ARCH_OPT="
set /p "ARCH_OPT=  Opcion [1-6] (default 2): "
if "%ARCH_OPT%"=="" set "ARCH_OPT=2"

if "%ARCH_OPT%"=="1" set "ARCH_STYLE=Monolito Modular"
if "%ARCH_OPT%"=="2" set "ARCH_STYLE=Clean Architecture"
if "%ARCH_OPT%"=="3" set "ARCH_STYLE=Microservicios"
if "%ARCH_OPT%"=="4" set "ARCH_STYLE=CQRS+EventSourcing"
if "%ARCH_OPT%"=="5" set "ARCH_STYLE=Vertical Slices"
if "%ARCH_OPT%"=="6" set "ARCH_STYLE=Serverless"
echo.
echo  b) PROVEEDOR CLOUD:
echo.
echo    [1] Azure         (.NET, enterprise, hybrid)
echo    [2] AWS           (Node, Python, startups)
echo    [3] GCP           (data, ML, Kubernetes)
echo    [4] On-premise    (control total, legacy)
echo    [0] No definido
echo.
set "CLOUD_OPT="
set /p "CLOUD_OPT=  Opcion [0-4] (default 1): "
if "%CLOUD_OPT%"=="" set "CLOUD_OPT=1"

if "%CLOUD_OPT%"=="1" set "CLOUD_NAME=Azure"
if "%CLOUD_OPT%"=="2" set "CLOUD_NAME=AWS"
if "%CLOUD_OPT%"=="3" set "CLOUD_NAME=GCP"
if "%CLOUD_OPT%"=="4" set "CLOUD_NAME=On-premise"
if "%CLOUD_OPT%"=="0" set "CLOUD_NAME=No definido"
echo.
echo  c) CI/CD:
echo.
echo    [1] GitHub Actions    (recomendado, integracion nativa)
echo    [2] Azure DevOps      (enterprise, .NET)
echo    [3] GitLab CI/CD      (self-hosted, integrado)
echo    [4] Jenkins           (legacy, altamente configurable)
echo    [0] No definido
echo.
set "CICD_OPT="
set /p "CICD_OPT=  Opcion [0-4] (default 1): "
if "%CICD_OPT%"=="" set "CICD_OPT=1"

if "%CICD_OPT%"=="1" set "CICD_NAME=GitHub Actions"
if "%CICD_OPT%"=="2" set "CICD_NAME=Azure DevOps"
if "%CICD_OPT%"=="3" set "CICD_NAME=GitLab CI/CD"
if "%CICD_OPT%"=="4" set "CICD_NAME=Jenkins"
if "%CICD_OPT%"=="0" set "CICD_NAME=No definido"
echo.
echo  d) CONTENEDORES:
echo.
echo    [1] Docker       (contenedores basicos, desarrollo local)
echo    [2] Kubernetes   (orquestacion, produccion, escalado)
echo    [3] Docker + K8s (ambos, desarrollo + produccion)
echo    [0] No usaremos contenedores
echo.
set "CONTAINER_OPT="
set /p "CONTAINER_OPT=  Opcion [0-3] (default 3): "
if "%CONTAINER_OPT%"=="" set "CONTAINER_OPT=3"

if "%CONTAINER_OPT%"=="1" set "CONTAINER_NAME=Docker"
if "%CONTAINER_OPT%"=="2" set "CONTAINER_NAME=Kubernetes"
if "%CONTAINER_OPT%"=="3" set "CONTAINER_NAME=Docker+K8s"
if "%CONTAINER_OPT%"=="0" set "CONTAINER_NAME=No definido"
echo.  [OK] Arq: %ARCH_STYLE% / Cloud: %CLOUD_NAME% / CI/CD: %CICD_NAME% / Container: %CONTAINER_NAME%

:ASK_QUALITY
cls
echo ===============================================================================
echo  PASO 9/10 - CALIDAD Y TESTING
echo ===============================================================================
echo.
echo  a) COBERTURA DE PRUEBAS OBJETIVO:
echo.
echo    [1] Minima (40% - solo misiones criticas)
echo    [2] Media  (60% - balance calidad/velocidad)
echo    [3] Alta   (80% - recomendado enterprise)
echo    [4] Maxima (90%+ - mision critica, regulado)
echo.
set "COVERAGE_OPT="
set /p "COVERAGE_OPT=  Opcion [1-4] (default 3): "
if "%COVERAGE_OPT%"=="" set "COVERAGE_OPT=3"

if "%COVERAGE_OPT%"=="1" set "COVERAGE_TARGET=40"
if "%COVERAGE_OPT%"=="2" set "COVERAGE_TARGET=60"
if "%COVERAGE_OPT%"=="3" set "COVERAGE_TARGET=80"
if "%COVERAGE_OPT%"=="4" set "COVERAGE_TARGET=90"
echo.
echo  b) FRAMEWORK DE TESTING (si conoces):
echo.
echo    [1] xUnit / NUnit        (.NET)
echo    [2] Jest / Vitest        (React, Node, Vue, Angular)
echo    [3] Pytest               (Python)
echo    [4] JUnit / Mockito      (Java)
echo    [5] A decidir (recomendado segun stack)
echo.
set "TEST_OPT="
set /p "TEST_OPT=  Opcion [1-5] (default 5): "
if "%TEST_OPT%"=="" set "TEST_OPT=5"

if "%TEST_OPT%"=="1" set "TEST_FRAMEWORK=xUnit"
if "%TEST_OPT%"=="2" set "TEST_FRAMEWORK=Jest/Vitest"
if "%TEST_OPT%"=="3" set "TEST_FRAMEWORK=Pytest"
if "%TEST_OPT%"=="4" set "TEST_FRAMEWORK=JUnit"
if "%TEST_OPT%"=="5" set "TEST_FRAMEWORK=A decidir"
echo.  [OK] Cobertura: %COVERAGE_TARGET%%% / Testing: %TEST_FRAMEWORK%

:ASK_AGENTS
cls
echo ===============================================================================
echo  PASO 10/10 - SELECCION DE AGENTES Y EXTRAS
echo ===============================================================================
echo.
echo  Selecciona los modulos adicionales que necesitas:
echo  (puedes marcar varios separados por espacios, ej: 1 3 5)
echo.
echo    [1] App Movil            (React Native, Flutter, nativa)
echo    [2] Analitica / ML       (Data Science, pipelines, modelos)
echo    [3] Compliance Legal     (GDPR, CCPA, HIPAA, SOC2)
echo    [4] UX Diseno            (Design System, prototipado, accesibilidad)
echo    [5] Seguridad Avanzada   (pentesting, threat modeling, SAST/DAST)
echo    [6] Performance          (Core Web Vitals, caching, load testing)
echo    [7] Multi-IA             (multi-modelo: GPT + Claude + Gemini)
echo    [8] Documentacion Auto   (ADRs, diagramas, API docs)
echo    [0] Solo lo basico (mas rapido)
echo.
set "EXTRA_OPTS="
set /p "EXTRA_OPTS=  Opciones (ej: 1 3 5): "
if "%EXTRA_OPTS%"=="" set "EXTRA_OPTS=0"

set "INCLUDE_MOBILE=false"
set "INCLUDE_DATA=false"
set "INCLUDE_COMPLIANCE=false"
set "INCLUDE_UX=false"
set "INCLUDE_SECURITY=false"
set "INCLUDE_PERFORMANCE=false"
set "INCLUDE_MULTIAI=false"
set "INCLUDE_DOCS=false"

for %%x in (%EXTRA_OPTS%) do (
    if "%%x"=="1" set "INCLUDE_MOBILE=true"
    if "%%x"=="2" set "INCLUDE_DATA=true"
    if "%%x"=="3" set "INCLUDE_COMPLIANCE=true"
    if "%%x"=="4" set "INCLUDE_UX=true"
    if "%%x"=="5" set "INCLUDE_SECURITY=true"
    if "%%x"=="6" set "INCLUDE_PERFORMANCE=true"
    if "%%x"=="7" set "INCLUDE_MULTIAI=true"
    if "%%x"=="8" set "INCLUDE_DOCS=true"
)
echo.  [OK] Extras configurados

:: ==============================================================================
:: RESUMEN Y CONFIRMACION
:: ==============================================================================

:SUMMARY
cls
echo ===============================================================================
echo                           RESUMEN DE CONFIGURACION
echo ===============================================================================
echo.
echo  PROYECTO:         %PROJECT_NAME%
echo  DESCRIPCION:      %PROJECT_DESC%
echo  TIPO:             %PROJECT_TYPE%
echo  DOMINIO:          %DOMAIN_NAME%
echo.
echo  BACKEND:          %BACKEND_NAME%
echo  FRONTEND:         %FRONTEND_NAME%
echo  BASE DE DATOS:    %DB_NAME%
echo.
echo  ARQUITECTURA:     %ARCH_STYLE%
echo  CLOUD:            %CLOUD_NAME%
echo  CI/CD:            %CICD_NAME%
echo  CONTENEDORES:     %CONTAINER_NAME%
echo.
echo  COBERTURA TEST:   %COVERAGE_TARGET%%%
echo  TEST FRAMEWORK:   %TEST_FRAMEWORK%
echo.
echo  MODULOS EXTRA:
echo    - Movil:         %INCLUDE_MOBILE%
echo    - Data/ML:       %INCLUDE_DATA%
echo    - Compliance:    %INCLUDE_COMPLIANCE%
echo    - UX Diseno:     %INCLUDE_UX%
echo    - Seguridad:     %INCLUDE_SECURITY%
echo    - Performance:   %INCLUDE_PERFORMANCE%
echo    - Multi-IA:      %INCLUDE_MULTIAI%
echo    - Documentacion: %INCLUDE_DOCS%
echo.
echo ===============================================================================
echo.
set /p "CONFIRM=  [ENTER] para generar el proyecto  |  [X] para cancelar: "
if /i "!CONFIRM!"=="X" (
    echo.
    echo  Generacion cancelada por el usuario.
    timeout /t 3 >nul 2>&1
    exit /b 0
)

goto :GENERATE

:: ==============================================================================
:: GENERACION DEL PROYECTO
:: ==============================================================================

:GENERATE
cls
echo ===============================================================================
echo                     GENERANDO PROYECTO: %PROJECT_NAME%
echo ===============================================================================
echo.

:: Crear directorio del proyecto
if not exist "%PROJECT_NAME%" (
    mkdir "%PROJECT_NAME%" >nul 2>&1
    echo  [OK] Directorio raiz: %PROJECT_NAME%/
)

:: Cambiar al directorio del proyecto
pushd "%PROJECT_NAME%"

:: ==============================================================================
:: 1. GENERAR ESTRUCTURA .opencode/
:: ==============================================================================
echo.
echo  [1/9] Generando estructura .opencode/...

mkdir ".opencode\agents"         2>nul
mkdir ".opencode\core"           2>nul
mkdir ".opencode\workflow"       2>nul
mkdir ".opencode\memory"         2>nul
mkdir ".opencode\memory\history" 2>nul
mkdir ".opencode\knowledge"      2>nul
mkdir ".opencode\knowledge\domains" 2>nul
mkdir ".opencode\templates"      2>nul
mkdir ".opencode\templates\enterprise" 2>nul
mkdir ".opencode\templates\final" 2>nul
mkdir ".opencode\prompts"        2>nul
mkdir ".opencode\prompts\core"   2>nul
mkdir ".opencode\prompts\agents" 2>nul
mkdir ".opencode\prompts\stacks" 2>nul
mkdir ".opencode\prompts\domains" 2>nul
mkdir ".opencode\technology"     2>nul
mkdir ".opencode\specialists"    2>nul
mkdir ".opencode\specialists\backend" 2>nul
mkdir ".opencode\specialists\frontend" 2>nul
mkdir ".opencode\specialists\database" 2>nul
mkdir ".opencode\specialists\domains"  2>nul
mkdir ".opencode\skills"         2>nul
mkdir ".opencode\skills\expert"  2>nul
mkdir ".opencode\skills\expert\architecture" 2>nul
mkdir ".opencode\skills\expert\backend"      2>nul
mkdir ".opencode\skills\expert\frontend"     2>nul
mkdir ".opencode\skills\expert\database"     2>nul
mkdir ".opencode\skills\expert\devops"       2>nul
mkdir ".opencode\skills\expert\testing"      2>nul
mkdir ".opencode\skills\expert\security"     2>nul
mkdir ".opencode\skills\expert\performance"  2>nul
mkdir ".opencode\skills\expert\business"     2>nul
if "%INCLUDE_MOBILE%"=="true" mkdir ".opencode\skills\expert\mobile" 2>nul
if "%INCLUDE_DATA%"=="true"   mkdir ".opencode\skills\expert\data" 2>nul
if "%INCLUDE_DOCS%"=="true"   mkdir ".opencode\skills\expert\documentation" 2>nul
mkdir ".opencode\engineering"    2>nul
mkdir ".opencode\governance"     2>nul
mkdir ".opencode\quality"        2>nul
mkdir ".opencode\engine"         2>nul
mkdir ".opencode\playbooks"      2>nul
mkdir ".opencode\playbooks\stacks" 2>nul
mkdir ".opencode\playbooks\domains" 2>nul
mkdir ".opencode\rules"          2>nul
mkdir "docs"                     2>nul
echo  [OK] Directorios creados

:: ==============================================================================
:: 2. GENERAR AGENTS.md y AIBF-COMPLETE.md
:: ==============================================================================
echo.
echo  [2/9] Generando archivos de configuracion raiz...

:: AGENTS.md
(
echo # AI Bootstrap Framework - Configuracion para el Asistente IA
echo.
echo Este proyecto usa el **AI Bootstrap Framework** version 1.0 Enterprise.
echo.
echo ## Instrucciones para el asistente
echo.
echo 1. Lee `AIBF-COMPLETE.md` como contexto inicial del framework
echo 2. Comportamiento: Actua como el Coordinator del framework
echo 3. Workflow obligatorio: Bootstrap ^> Discovery ^> Deep Analysis ^> Business ^> Questions ^> Summary ^> Approval ^> Planning ^> Execution ^> Validation ^> Documentation ^> Memory Update
echo 4. Memoria: Usa `.opencode/memory/` para PROJECT_PROFILE y PROJECT_MEMORY
echo 5. Agentes: Invoca solo los agentes necesarios definidos en `.opencode/agents/`
echo 6. Skills: Usa skills de `.opencode/skills/` segun la tarea
echo 7. Aprobacion: Siempre pide aprobacion antes de cambios relevantes
echo 8. Auditoria: Cada ciclo termina con revision de calidad
) > AGENTS.md

:: AIBF-COMPLETE.md (placeholder con referencia al generador)
(
echo # AI Bootstrap Framework - Contexto Inicial
echo.
echo Proyecto: %PROJECT_NAME%
echo Descripcion: %PROJECT_DESC%
echo Dominio: %DOMAIN_NAME%
echo Stack Backend: %BACKEND_NAME%
echo Stack Frontend: %FRONTEND_NAME%
echo Base de Datos: %DB_NAME%
echo Arquitectura: %ARCH_STYLE%
echo Cloud: %CLOUD_NAME%
echo CI/CD: %CICD_NAME%
echo.
echo Generado por AIBF-GENERATOR.bat v%AIBF_VERSION%
echo Framework: AI Bootstrap Framework Central v1.0 Enterprise
echo.
echo ## Workflow obligatorio (12 fases)
echo.
echo 1. Bootstrap ^- Preparar estructura base del proyecto
echo 2. Discovery ^- Explorar codigo, stack, dominio y contexto
echo 3. Deep Analysis ^- Analizar requisitos, restricciones y riesgos
echo 4. Business ^- Comprender valor de negocio y objetivos
echo 5. Questions ^- Hacer preguntas de clarificacion
echo 6. Summary ^- Resumir plan de accion
echo 7. Approval ^- Obtener aprobacion del usuario
echo 8. Planning ^- Seleccionar agentes, skills y descomponer tareas
echo 9. Execution ^- Implementar cambios
echo 10. Validation ^- Verificar calidad y tests
echo 11. Documentation ^- Documentar cambios y ADRs
echo 12. Memory Update ^- Actualizar memoria del proyecto
echo.
echo ## Reglas cardinales
echo - Nunca implementar sin entender el proyecto primero
echo - Siempre preguntar si hay incertidumbre
echo - Minimo contexto posible, maxima eficiencia de tokens
echo - Los agentes especializados nunca hablan directamente con el usuario
echo - Toda decision importante genera un ADR
) > AIBF-COMPLETE.md

:: .gitignore
(
echo node_modules/
echo package-lock.json
echo .opencode/node_modules/
echo .opencode/package-lock.json
echo dist/
echo build/
echo .env
echo .env.local
echo *.log
) > .gitignore

echo  [OK] Archivos raiz creados

:: ==============================================================================
:: 3. GENERAR AGENTES
:: ==============================================================================
echo.
echo  [3/9] Generando agentes especializados...

:: Coordinator (siempre presente)
(
echo # AI Project Coordinator
echo.
echo ## Mision
echo Orquestar todos los agentes de IA para entregar software de alta calidad.
echo El Coordinator es el unico punto de entrada para todas las solicitudes
echo del usuario y nunca implementa directamente.
echo.
echo ## Reglas
echo - Nunca implementar codigo directamente, delegar a agentes expertos
echo - Analizar cada solicitud antes de actuar
echo - Seleccionar solo los agentes necesarios para cada tarea
echo - Minimizar consumo de tokens cargando solo contexto relevante
echo - Consolidar resultados de multiples agentes en salida coherente
echo - Actualizar PROJECT_MEMORY despues de cada tarea significativa
echo - Solicitar aprobacion del usuario antes de implementar cambios
echo - Generar ADRs para decisiones arquitectonicas importantes
echo.
echo ## Flujo de trabajo
echo Solicitud del usuario
echo   ^> Analizar solicitud
echo     ^> Leer PROJECT_PROFILE + PROJECT_MEMORY
echo       ^> Clasificar tipo de solicitud
echo         ^> Seleccionar agentes necesarios
echo           ^> Seleccionar skills necesarias
echo             ^> Generar plan
echo               ^> Mostrar resumen al usuario
echo                 ^> Esperar aprobacion
echo                   ^> Ejecutar plan (coordinar agentes)
echo                     ^> Validar resultados
echo                       ^> Actualizar PROJECT_MEMORY
echo                         ^> Ejecutar Auditoria de Calidad
echo                           ^> Reportar al usuario
) > ".opencode\agents\coordinator.md"

:: Product Owner
(
echo # Product Owner
echo.
echo ## Mision
echo Definir la vision del producto, priorizar el backlog y asegurar
echo que el equipo entrega valor de negocio en cada iteracion.
echo.
echo ## Responsabilidades
echo - Definir y comunicar la vision del producto
echo - Gestionar y priorizar el backlog
echo - Validar que las historias de usuario cumplen la definicion de listo
echo - Tomar decisiones de alcance y trade-offs
echo - Alinear al equipo con los objetivos de negocio
echo.
echo ## Cuando invocarlo
echo - Al inicio del proyecto para definir vision
echo - Cuando hay decisiones de priorizacion
echo - Para validar que una funcionalidad cumple el objetivo de negocio
echo - En revisiones de sprint
echo.
echo ## Artefactos
echo - Product vision / Project charter
echo - Backlog priorizado
echo - User stories validadas
echo - Roadmap de producto
) > ".opencode\agents\product-owner.md"

:: Business Analyst
(
echo # Business Analyst
echo.
echo ## Mision
echo Analizar los requisitos de negocio, traducirlos a especificaciones
echo tecnicas comprensibles y asegurar que la solucion satisface las
echo necesidades del negocio.
echo.
echo ## Responsabilidades
echo - Descubrir y documentar reglas de negocio
echo - Identificar actores, entidades y procesos
echo - Crear glosario del dominio
echo - Detallar historias de usuario con criterios de aceptacion
echo - Mapear integraciones externas y dependencias
echo.
echo ## Cuando invocarlo
echo - En fase Discovery para entender el dominio
echo - Cuando hay nueva funcionalidad con logica de negocio compleja
echo - Para documentar procesos y reglas de negocio
echo - Antes de comenzar un nuevo epic o feature
) > ".opencode\agents\business-analyst.md"

:: Software Architect
(
echo # Software Architect
echo.
echo ## Mision
echo Disenar la arquitectura del sistema asegurando que cumple los
echo atributos de calidad requeridos: escalabilidad, mantenibilidad,
echo rendimiento y seguridad.
echo.
echo ## Responsabilidades
echo - Definir el estilo arquitectonico
echo - Documentar decisiones en ADRs
echo - Disenar diagramas C4 (Contexto, Contenedores, Componentes)
echo - Evaluar riesgos arquitectonicos
echo - Revisar que la implementacion respeta la arquitectura
echo.
echo ## Cuando invocarlo
echo - Al inicio de un nuevo proyecto o modulo
echo - Cuando hay decisiones arquitectonicas importantes
echo - Para revision de arquitectura existente
echo - Cuando se necesita evaluar impacto de cambios
echo.
echo ## Stack definido
echo - Arquitectura: %ARCH_STYLE%
echo - Cloud: %CLOUD_NAME%
echo - Patrones recomendados segun dominio %DOMAIN_NAME%
) > ".opencode\agents\software-architect.md"

:: Tech Lead
(
echo # Tech Lead
echo.
echo ## Mision
echo Liderar la excelencia tecnica del equipo, gestionar la deuda tecnica
echo y asegurar que las practicas de ingenieria se mantienen en alto nivel.
echo.
echo ## Responsabilidades
echo - Establecer estandares de codigo y revision
echo - Identificar y priorizar pago de deuda tecnica
echo - Mentorear al equipo en buenas practicas
echo - Revisar la calidad del codigo y la arquitectura
echo - Gestionar riesgos tecnicos del proyecto
echo.
echo ## Cuando invocarlo
echo - Para revision de codigo y calidad
echo - Cuando hay acumulacion de deuda tecnica
echo - En decisiones de tecnologia y framework
echo - Para refactorizaciones importantes
) > ".opencode\agents\tech-lead.md"

:: Backend Expert
(
echo # Backend Expert
echo.
echo ## Mision
echo Implementar la logica de negocio, APIs, persistencia y servicios
echo backend siguiendo las mejores practicas del stack seleccionado.
echo.
echo ## Stack: %BACKEND_NAME%
echo ## Dominio: %DOMAIN_NAME%
echo.
echo ## Responsabilidades
echo - Disenar e implementar APIs REST/GraphQL
echo - Implementar logica de negocio y reglas de dominio
echo - Configurar ORM y acceso a datos
echo - Implementar autenticacion y autorizacion
echo - Optimizar rendimiento de endpoints
echo.
echo ## Cuando invocarlo
echo - Para implementar nuevas APIs o endpoints
echo - Cuando se necesita logica de negocio
echo - Para optimizar consultas y rendimiento
echo - En revisiones de seguridad backend
) > ".opencode\agents\backend-expert.md"

:: Frontend Expert
(
echo # Frontend Expert
echo.
echo ## Mision
echo Construir interfaces de usuario modernas, accesibles y de alto
echo rendimiento utilizando el framework frontend seleccionado.
echo.
echo ## Stack: %FRONTEND_NAME%
echo.
echo ## Responsabilidades
echo - Disenar e implementar componentes reutilizables
echo - Gestionar estado de la aplicacion
echo - Implementar enrutamiento y navegacion
echo - Optimizar Core Web Vitals y bundle size
echo - Asegurar accesibilidad (WCAG 2.1 AA)
echo.
echo ## Cuando invocarlo
echo - Para implementar nuevas vistas o componentes
echo - Cuando se necesita optimizar rendimiento frontend
echo - Para revision de accesibilidad
echo - En diseno de sistemas de componentes
) > ".opencode\agents\frontend-expert.md"

:: Database Expert
(
echo # Database Expert
echo.
echo ## Mision
echo Disenar, optimizar y mantener la base de datos del proyecto
echo asegurando integridad, rendimiento y escalabilidad.
echo.
echo ## Base de datos: %DB_NAME%
echo.
echo ## Responsabilidades
echo - Disenar esquemas y modelos de datos
echo - Optimizar consultas y planes de ejecucion
echo - Gestionar migraciones y versionado
echo - Configurar indices y particionamiento
echo - Implementar backup y recovery
echo.
echo ## Cuando invocarlo
echo - Para diseno inicial de base de datos
echo - Cuando hay problemas de rendimiento en consultas
echo - Para revision de esquemas existentes
echo - En migraciones entre motores de base de datos
) > ".opencode\agents\database-expert.md"

:: DevOps Expert
(
echo # DevOps Expert
echo.
echo ## Mision
echo Automatizar la infraestructura, construir pipelines CI/CD y asegurar
echo despliegues confiables y repetibles.
echo.
echo ## Stack: %BACKEND_NAME% / %FRONTEND_NAME%
echo ## CI/CD: %CICD_NAME%
echo ## Cloud: %CLOUD_NAME%
echo ## Contenedores: %CONTAINER_NAME%
echo.
echo ## Responsabilidades
echo - Configurar pipelines CI/CD
echo - Crear y mantener Dockerfiles y docker-compose
echo - Configurar infraestructura como codigo (IaC)
echo - Gestionar despliegues (blue-green, canary)
echo - Configurar monitoreo y alertas
echo.
echo ## Cuando invocarlo
echo - Al inicio del proyecto para configurar CI/CD
echo - Para crear o modificar pipelines
echo - En configuracion de infraestructura
echo - Para despliegues a produccion
) > ".opencode\agents\devops-expert.md"

:: QA Expert
(
echo # QA Expert
echo.
echo ## Mision
echo Asegurar la calidad del producto mediante estrategias de prueba
echo automatizadas y manuales, estableciendo puertas de calidad.
echo.
echo ## Cobertura objetivo: %COVERAGE_TARGET%%%
echo ## Framework testing: %TEST_FRAMEWORK%
echo.
echo ## Responsabilidades
echo - Definir estrategia de pruebas (piramide de testing)
echo - Implementar pruebas unitarias, integracion y E2E
echo - Establecer calidad de codigo y gates
echo - Automatizar pruebas en CI/CD
echo - Reportar metricas de calidad y cobertura
echo.
echo ## Cuando invocarlo
echo - En cada implementacion de nueva funcionalidad
echo - Para correccion de bugs
echo - En revision de calidad pre-release
echo - Para establecer metricas de calidad
) > ".opencode\agents\qa-expert.md"

:: Scrum Master
(
echo # Scrum Master
echo.
echo ## Mision
echo Facilitar los procesos agiles, eliminar impedimentos y ayudar al
echo equipo a mejorar continuamente su productividad.
echo.
echo ## Responsabilidades
echo - Facilitar ceremonias Scrum (daily, planning, review, retro)
echo - Eliminar impedimentos del equipo
echo - Proteger al equipo de interrupciones externas
echo - Promover la mejora continua
echo - Medir y reportar metricas del equipo
echo.
echo ## Cuando invocarlo
echo - Para planificar sprints
echo - Cuando hay impedimentos que resolver
echo - En retrospectivas para mejora continua
echo - Para revisar metricas de productividad
) > ".opencode\agents\scrum-master.md"

:: Documentation Expert
(
echo # Documentation Expert
echo.
echo ## Mision
echo Crear y mantener documentacion clara, completa y actualizada
echo del proyecto, incluyendo documentacion tecnica y funcional.
echo.
echo ## Responsabilidades
echo - Crear y mantener README.md
echo - Documentar APIs y contratos
echo - Generar ADRs para decisiones importantes
echo - Crear guias de onboarding para nuevos miembros
echo - Mantener changelog y release notes
echo.
echo ## Cuando invocarlo
echo - Al inicio del proyecto para estructura documentacion
echo - Cuando se implementan nuevas APIs o modulos
echo - Para documentar decisiones arquitectonicas
echo - Para crear guias de onboarding
) > ".opencode\agents\documentation-expert.md"

:: Security Expert
if "%INCLUDE_SECURITY%"=="true" (
(
echo # Security Expert
echo.
echo ## Mision
echo Proteger el sistema contra amenazas de seguridad, asegurando
echo confidencialidad, integridad y disponibilidad de los datos.
echo.
echo ## Responsabilidades
echo - Identificar y mitigar vulnerabilidades (OWASP Top 10)
echo - Revisar autenticacion y autorizacion
echo - Implementar cifrado de datos en reposo y transito
echo - Realizar threat modeling
echo - Configurar SAST/DAST en pipeline CI/CD
echo.
echo ## Cuando invocarlo
echo - Para revision de seguridad en nuevas funcionalidades
echo - Cuando se manejan datos sensibles
echo - En auditorias de seguridad
echo - Para configurar autenticacion y autorizacion
) > ".opencode\agents\security-expert.md"
)

:: Performance Expert
if "%INCLUDE_PERFORMANCE%"=="true" (
(
echo # Performance Expert
echo.
echo ## Mision
echo Optimizar el rendimiento del sistema en todas las capas,
echo desde el frontend hasta la base de datos.
echo.
echo ## Responsabilidades
echo - Optimizar Core Web Vitals y bundle size
echo - Implementar estrategias de caching
echo - Realizar load testing y profiling
echo - Optimizar consultas de base de datos
echo - Identificar y resolver cuellos de botella
echo.
echo ## Cuando invocarlo
echo - Cuando hay problemas de rendimiento
echo - Para optimizar paginas o componentes lentos
echo - Antes de lanzamientos a produccion
echo - Para establecer metricas de rendimiento
) > ".opencode\agents\performance-expert.md"
)

:: UX Designer
if "%INCLUDE_UX%"=="true" (
(
echo # UX Designer
echo.
echo ## Mision
echo Disenar experiencias de usuario intuitivas, accesibles y
echo atractivas que satisfagan las necesidades del usuario final.
echo.
echo ## Responsabilidades
echo - Disenar flujos de usuario y wireframes
echo - Crear prototipos interactivos
echo - Asegurar accesibilidad (WCAG 2.1 AA)
echo - Definir design system y guias de estilo
echo - Realizar pruebas de usabilidad
echo.
echo ## Cuando invocarlo
echo - Al inicio de nuevas funcionalidades
echo - Para revision de experiencia de usuario
echo - Para crear o actualizar design system
echo - Cuando se necesita validar prototipos
) > ".opencode\agents\ux-designer.md"
)

:: Mobile Expert
if "%INCLUDE_MOBILE%"=="true" (
(
echo # Mobile Expert
echo.
echo ## Mision
echo Desarrollar aplicaciones moviles nativas o multiplataforma
echo con alto rendimiento y excelente experiencia de usuario.
echo.
echo ## Responsabilidades
echo - Implementar UI/UX movil nativa
echo - Manejar estado offline y sincronizacion
echo - Implementar notificaciones push
echo - Optimizar rendimiento y consumo de bateria
echo - Gestionar publicacion en App Store y Play Store
echo.
echo ## Cuando invocarlo
echo - Para desarrollo de app movil
echo - Cuando se necesita funcionalidad offline
echo - Para optimizar rendimiento movil
echo - En preparacion de publicacion en tiendas
) > ".opencode\agents\mobile-expert.md"
)

:: Data Scientist
if "%INCLUDE_DATA%"=="true" (
(
echo # Data Scientist
echo.
echo ## Mision
echo Extraer insights de los datos, construir modelos predictivos
echo y habilitar toma de decisiones basada en datos.
echo.
echo ## Responsabilidades
echo - Disenar y entrenar modelos de ML
echo - Implementar pipelines de datos
echo - Crear dashboards y reportes analiticos
echo - Realizar A/B testing y experimentos
echo - Monitorear deriva de modelos en produccion
echo.
echo ## Cuando invocarlo
echo - Cuando se necesitan modelos predictivos
echo - Para analisis exploratorio de datos
echo - Para implementar recomendaciones personalizadas
echo - En configuracion de MLOps
) > ".opencode\agents\data-scientist.md"

:: Data Engineer
(
echo # Data Engineer
echo.
echo ## Mision
echo Disenar y mantener la infraestructura de datos que permite
echo el procesamiento, almacenamiento y analisis eficiente de datos.
echo.
echo ## Responsabilidades
echo - Disenar pipelines ETL/ELT
echo - Implementar data warehouses y data lakes
echo - Gestionar calidad de datos y gobernanza
echo - Optimizar procesos de integracion de datos
echo - Mantener catalogos de datos
echo.
echo ## Cuando invocarlo
echo - Para disenar pipelines de datos
echo - Cuando se integran multiples fuentes de datos
echo - Para optimizar procesamiento de grandes volumenes
echo - En configuracion de data governance
) > ".opencode\agents\data-engineer.md"
)

:: SRE Expert (siempre incluido por confiabilidad)
(
echo # SRE Expert
echo.
echo ## Mision
echo Asegurar la confiabilidad, disponibilidad y rendimiento de los
echo sistemas en produccion mediante practicas de Site Reliability Engineering.
echo.
echo ## Responsabilidades
echo - Definir y monitorear SLOs/SLIs/SLAs
echo - Implementar observabilidad (logs, metrics, traces)
echo - Gestionar respuesta a incidentes
echo - Realizar capacity planning
echo - Implementar chaos engineering
echo.
echo ## Cuando invocarlo
echo - Para definir SLOs de nuevos servicios
echo - Cuando hay incidentes de disponibilidad
echo - Para optimizar observabilidad
echo - En planificacion de capacidad
) > ".opencode\agents\sre-expert.md"

:: Cloud Architect
(
echo # Cloud Architect
echo.
echo ## Mision
echo Disenar y optimizar la arquitectura cloud del proyecto siguiendo
echo las mejores practicas del proveedor seleccionado.
echo.
echo ## Cloud: %CLOUD_NAME%
echo.
echo ## Responsabilidades
echo - Disenar arquitectura cloud (Well-Architected Framework)
echo - Optimizar costos de infraestructura
echo - Implementar alta disponibilidad y disaster recovery
echo - Gestionar migraciones a cloud (7 Rs)
echo - Configurar networking y seguridad en cloud
echo.
echo ## Cuando invocarlo
echo - Al disenar la arquitectura cloud inicial
echo - Para optimizar costos de infraestructura
echo - En migraciones on-premise a cloud
echo - Para revision de seguridad cloud
) > ".opencode\agents\cloud-architect.md"

:: Compliance Officer
if "%INCLUDE_COMPLIANCE%"=="true" (
(
echo # Compliance Officer
echo.
echo ## Mision
echo Asegurar que el proyecto cumple con las regulaciones aplicables
echo (GDPR, CCPA, HIPAA, SOC2, ISO27001) y gestionar riesgos legales.
echo.
echo ## Responsabilidades
echo - Identificar regulaciones aplicables al proyecto
echo - Realizar DPIA (Data Protection Impact Assessment)
echo - Gestionar ROPA (Record of Processing Activities)
echo - Implementar politicas de retencion de datos
echo - Auditar compliance del sistema
echo.
echo ## Cuando invocarlo
echo - Al inicio del proyecto para identificar regulaciones
echo - Cuando se manejan datos personales o sensibles
echo - Para auditorias de compliance
echo - En configuracion de consentimiento y privacidad
) > ".opencode\agents\compliance-officer.md"
)

:: AI Token Optimizer
(
echo # AI Token Optimizer
echo.
echo ## Mision
echo Optimizar el uso de tokens del modelo de lenguaje en cada ciclo
echo del workflow para maximizar eficiencia y reducir costos.
echo.
echo ## Responsabilidades
echo - Dividir trabajo en modulos pequenos
echo - Priorizar skills especificas sobre conocimiento general
echo - Usar resumenes en lugar de codigo completo
echo - Cachear contexto dentro del mismo ciclo
echo - Monitorear tokens usados vs disponibles
echo.
echo ## Cuando invocarlo
echo - Cuando el contexto es muy grande
echo - Para optimizar sesiones largas
echo - Cuando se acerca al limite de tokens
echo - Para revision de eficiencia del framework
) > ".opencode\agents\ai-token-optimizer.md"

echo  [OK] Agentes generados

:: ==============================================================================
:: 4. GENERAR WORKFLOW
:: ==============================================================================
echo.
echo  [4/9] Generando workflow y orquestacion...

:: WORKFLOW.md
(
echo # Workflow Obligatorio del Framework
echo.
echo Proyecto: %PROJECT_NAME%
echo.
echo ## Ciclo completo (12 fases)
echo.
echo Cada solicitud debe pasar por todas las fases en orden:
echo.
echo 1. Bootstrap       ^- Preparar estructura base del proyecto
echo 2. Discovery       ^- Explorar codigo, stack, dominio y contexto
echo 3. Deep Analysis   ^- Analizar requisitos, restricciones y riesgos
echo 4. Business        ^- Comprender valor de negocio y objetivos
echo 5. Questions       ^- Hacer preguntas de clarificacion
echo 6. Summary         ^- Resumir plan de accion para el usuario
echo 7. Approval        ^- Obtener aprobacion del usuario antes de ejecutar
echo 8. Planning        ^- Seleccionar agentes, skills y descomponer tareas
echo 9. Execution       ^- Implementar cambios (puede iterar)
echo 10. Validation     ^- Verificar calidad, tests y criterios de aceptacion
echo 11. Documentation  ^- Documentar cambios, ADRs y lecciones aprendidas
echo 12. Memory Update  ^- Actualizar PROJECT_MEMORY con nuevo contexto
echo.
echo ## Reglas del workflow
echo - Saltos prohibidos: No se puede omitir ninguna fase
echo - Aprobacion obligatoria: Fase 7 (Approval) es requisito antes de ejecutar
echo - Validacion por agente: Cada agente valida su propio output
echo - Actualizacion de memoria: La ultima fase siempre es Memory Update
echo - Contexto minimo: Compartir solo la informacion necesaria
) > ".opencode\workflow\WORKFLOW.md"

:: ORCHESTRATOR.md
(
echo # AI Project Orchestrator
echo.
echo ## Objetivo
echo Coordinar todo el ciclo de vida de una solicitud, seleccionando
echo inteligentemente los agentes y recursos necesarios.
echo.
echo ## Flujo de orquestacion
echo.
echo 1. Leer PROJECT_PROFILE (si existe)
echo 2. Leer PROJECT_MEMORY (historial de la sesion)
echo 3. Clasificar la solicitud
echo 4. Seleccionar agente principal segun clasificacion
echo 5. Seleccionar agentes de soporte necesarios
echo 6. Seleccionar skills relevantes de la biblioteca
echo 7. Definir contexto minimo
echo 8. Generar plan de accion detallado
echo 9. Mostrar resumen al usuario
echo 10. Esperar aprobacion explicita
echo 11. Ejecutar el plan (invocando agentes en orden)
echo 12. Validar resultados contra criterios de aceptacion
echo 13. Actualizar memoria del proyecto
echo 14. Reportar resumen final
echo.
echo ## Reglas de orquestacion
echo - Nunca invocar todos los agentes - solo los necesarios
echo - Compartir solo el contexto necesario - no saturar tokens
echo - Evitar duplicacion - si un agente ya proceso algo, no repetir
echo - Priorizar memoria - leer PROJECT_MEMORY antes de releer codigo
echo - Singleton de skills - cada skill se carga una sola vez por ciclo
echo - Audit trail - cada decision importante genera un registro
echo - Carga perezosa - no cargar skills ni agentes que no se usaran
echo.
echo ## Criterios de seleccion de agentes
echo.
echo ^| Tipo de solicitud ^| Agente principal ^| Criterio ^|
echo ^|---^|---^|---^|
echo ^| Funcionalidad nueva ^| Software Architect ^| Si requiere diseno arquitectonico ^|
echo ^| Funcionalidad UI ^| Frontend Expert ^| Si toca la capa de presentacion ^|
echo ^| Funcionalidad API ^| Backend Expert ^| Si toca logica de negocio o API ^|
echo ^| Bug ^| QA Expert ^| Si requiere testing y validacion ^|
echo ^| Rendimiento ^| Performance Expert ^| Si hay metricas afectadas ^|
echo ^| Seguridad ^| Security Expert ^| Si hay implicaciones de seguridad ^|
echo ^| Infraestructura ^| DevOps/SRE ^| Si toca despliegue o infraestructura ^|
echo ^| Datos ^| Data Engineer ^| Si toca pipelines o modelos ^|
echo ^| UX ^| UX Designer ^| Si requiere diseno de experiencia ^|
echo ^| Proceso ^| Scrum Master ^| Si es mejora de proceso ^|
echo ^| Legal ^| Compliance Officer ^| Si hay implicaciones regulatorias ^|
echo ^| Movil ^| Mobile Expert ^| Si es funcionalidad mobile ^|
echo ^| Nube ^| Cloud Architect ^| Si afecta arquitectura cloud ^|
echo ^| Deuda tecnica ^| Tech Lead ^| Si es refactorizacion grande ^|
echo ^| Producto ^| Product Owner ^| Si requiere decision de producto ^|
echo ^| Documentacion ^| Documentation Expert ^| Si requiere documentacion extensa ^|
) > ".opencode\workflow\ORCHESTRATOR.md"

:: PLANNING_ENGINE.md
(
echo # Planning Engine
echo.
echo ## Proposito
echo Transformar una solicitud aprobada en un plan de ejecucion concreto.
echo.
echo ## Flujo
echo 1. Analizar la solicitud aprobada
echo 2. Revisar PROJECT_MEMORY para contexto historico
echo 3. Detectar archivos y modulos afectados
echo 4. Seleccionar agentes necesarios para la tarea
echo 5. Seleccionar skills relevantes
echo 6. Dividir en fases con dependencias
echo 7. Estimar complejidad de cada fase
echo 8. Esperar aprobacion del plan
) > ".opencode\workflow\PLANNING_ENGINE.md"

:: EXECUTION_PLAN.md
(
echo # Execution Plan Template
echo.
echo ## Plan de ejecucion
echo - Objetivo:
echo - Alcance:
echo - Exclusiones:
echo - Modulos afectados:
echo - Riesgos:
echo - Agentes requeridos:
echo - Skills requeridas:
echo - Orden de implementacion:
echo - Validaciones necesarias:
echo - Criterios de aceptacion:
) > ".opencode\workflow\EXECUTION_PLAN.md"

:: TASK_DECOMPOSITION.md
(
echo # Task Decomposition
echo.
echo Dividir cada solicitud en tareas pequenas e independientes.
echo.
echo Criterios:
echo - Cada tarea debe ser completable en ^<4 horas
echo - Dependencias explicitas entre tareas
echo - Prioridad (Alta / Media / Baja)
echo - Complejidad (S / M / L / XL)
echo - Resultado esperado medible
) > ".opencode\workflow\TASK_DECOMPOSITION.md"

:: CHANGE_POLICY.md
(
echo # Change Policy
echo.
echo - No hacer cambios masivos
echo - Preferir cambios pequenos, revisables y reversibles
echo - Implementar por iteraciones
echo - Cada iteracion debe pasar validacion
echo - Actualizar memoria despues de cada cambio
echo - Mantener trazabilidad entre cambios y requisitos
) > ".opencode\workflow\CHANGE_POLICY.md"

:: TOKEN_STRATEGY.md
(
echo # Token Strategy
echo.
echo Proyecto: %PROJECT_NAME%
echo.
echo ## Estrategia de optimizacion de tokens
echo - Lazy loading: cargar solo archivos necesarios
echo - Referencias en lugar de contenido completo
echo - Compresion de contexto entre ciclos
echo - Memoria selectiva: solo informacion relevante
echo.
echo ## Limites por fase
echo - Discovery: 8K tokens
echo - Planning: 4K tokens
echo - Execution: 16K tokens
echo - Validation: 4K tokens
echo - Memory Update: 2K tokens
) > ".opencode\workflow\TOKEN_STRATEGY.md"

:: VALIDATION_CHECKLIST.md
(
echo # Validation Checklist
echo.
echo - [ ] El codigo compila sin errores
echo - [ ] Pasa todas las pruebas unitarias
echo - [ ] Pasa las pruebas de integracion
echo - [ ] La cobertura cumple el objetivo (%COVERAGE_TARGET%%%)
echo - [ ] Mantiene la arquitectura definida
echo - [ ] No rompe contratos de API publica
echo - [ ] Actualiza la documentacion relevante
echo - [ ] Actualiza PROJECT_MEMORY
echo - [ ] Actualiza el roadmap si es necesario
) > ".opencode\workflow\VALIDATION_CHECKLIST.md"

:: QUALITY_POLICY.md
(
echo # Quality Policy
echo.
echo Proyecto: %PROJECT_NAME%
echo Cobertura objetivo: %COVERAGE_TARGET%%%
echo.
echo ## Estandares de calidad
echo - Pasa linter y formateo de codigo
echo - Sigue convenciones del stack (%BACKEND_NAME% / %FRONTEND_NAME%)
echo - Cobertura minima: %COVERAGE_TARGET%%%
echo - Sin secretos hardcodeados
echo - Sin vulnerabilidades criticas
echo - SQL parametrizado (sin inyeccion)
echo - APIs documentadas
echo.
echo ## Metricas
echo - Cobertura de pruebas: ^>%COVERAGE_TARGET%%%
echo - Deuda tecnica: ^<5%% del codigo
echo - Vulnerabilidades criticas: 0
echo - Tiempo de respuesta API: ^<200ms
echo - Core Web Vitals: cumplir estandar
) > ".opencode\workflow\QUALITY_POLICY.md"

echo  [OK] Workflow generado

:: ==============================================================================
:: 5. GENERAR CORE
:: ==============================================================================
echo.
echo  [5/9] Generando core del framework...

:: BOOTSTRAP.md
(
echo # Bootstrap
echo.
echo Proyecto: %PROJECT_NAME%
echo.
echo ## Proceso de bootstrap
echo 1. Verificar estructura .opencode/
echo 2. Leer PROJECT_PROFILE si existe
echo 3. Ejecutar Discovery del proyecto
echo 4. Generar memoria inicial
echo 5. Configurar agentes segun stack
echo 6. Configurar skills segun stack
echo 7. Generar plan de accion inicial
echo 8. Esperar aprobacion
echo 9. Iniciar desarrollo
) > ".opencode\core\BOOTSTRAP.md"

:: DISCOVERY.md
(
echo # DISCOVERY
echo.
echo Analizar:
echo - Tipo de proyecto
echo - Dominio del negocio (%DOMAIN_NAME%)
echo - Stack (%BACKEND_NAME% / %FRONTEND_NAME%)
echo - Frameworks y librerias
echo - Arquitectura (%ARCH_STYLE%)
echo - Dependencias
echo - Base de datos (%DB_NAME%)
echo - APIs y endpoints
echo - Testing y cobertura
echo - CI/CD
echo - Docker y contenedores
echo - Calidad del codigo
echo - Deuda tecnica
echo.
echo Importante: No modificar archivos durante esta etapa.
) > ".opencode\core\DISCOVERY.md"

:: AUTO_BOOTSTRAP.md
(
echo # Auto Bootstrap
echo.
echo Objetivo: inicializar automaticamente el proyecto %PROJECT_NAME%.
echo.
echo ## Flujo
echo 1. Detectar si el proyecto es nuevo o existente
echo 2. Ejecutar Discovery
echo 3. Generar PROJECT_PROFILE
echo 4. Generar PROJECT_MEMORY
echo 5. Detectar stack (%BACKEND_NAME% / %FRONTEND_NAME%)
echo 6. Detectar dominio (%DOMAIN_NAME%)
echo 7. Detectar arquitectura (%ARCH_STYLE%)
echo 8. Crear agentes dinamicos segun stack
echo 9. Crear skills dinamicas segun tecnologia
echo 10. Generar plan inicial
echo 11. Esperar aprobacion
echo 12. Comenzar implementacion
) > ".opencode\core\AUTO_BOOTSTRAP.md"

:: PROJECT_GENERATOR.md
(
echo # Dynamic Project Generator
echo.
echo Proyecto: %PROJECT_NAME%
echo.
echo ## Flujo de generacion
echo 1. Detectar proyecto nuevo o existente
echo 2. Ejecutar Discovery
echo 3. Clasificar dominio (%DOMAIN_NAME%) y stack (%BACKEND_NAME%/%FRONTEND_NAME%)
echo 4. Generar memoria inicial del proyecto
echo 5. Generar agentes necesarios segun stack
echo 6. Generar skills necesarias
echo 7. Generar documentacion inicial
echo 8. Generar roadmap inicial
echo 9. Esperar aprobacion
echo 10. Iniciar desarrollo
) > ".opencode\core\PROJECT_GENERATOR.md"

:: BUSINESS_ANALYSIS.md
(
echo # Business Analysis
echo.
echo Dominio: %DOMAIN_NAME%
echo.
echo Generar:
echo - Glosario de terminos del negocio
echo - Entidades principales del dominio
echo - Procesos de negocio y flujos
echo - Reglas de negocio
echo - Actores y roles
echo - Integraciones externas
echo - Riesgos funcionales
) > ".opencode\core\BUSINESS_ANALYSIS.md"

:: QUESTIONS.md
(
echo # Questions
echo.
echo Siempre preguntar cuando:
echo - Hay informacion faltante o ambigua
echo - Se necesita decision del usuario
echo - Hay multiples opciones tecnicas
echo - El impacto del cambio no esta claro
echo.
echo Priorizar preguntas por:
echo 1. Criticas para continuar (bloqueantes)
echo 2. Importantes para la calidad
echo 3. Deseables para mejor comprension
) > ".opencode\core\QUESTIONS.md"

:: SUMMARY.md
(
echo # Summary
echo.
echo Antes de implementar, presentar al usuario:
echo.
echo 1. LO QUE SE ENTENDIO
echo    - Resumen de la solicitud
echo    - Contexto del proyecto
echo    - Dominio y stack afectados
echo.
echo 2. LO QUE SE DETECTO
echo    - Tecnologias y frameworks
echo    - Arquitectura y patrones
echo    - Riesgos potenciales
echo.
echo 3. LO QUE SE PROPONE
echo    - Agentes que participaran
echo    - Skills que se usaran
echo    - Plan de trabajo con fases
echo    - Esfuerzo estimado
echo.
echo 4. APROBACION
echo    - Esperar respuesta antes de ejecutar
) > ".opencode\core\SUMMARY.md"

:: REPORT_TEMPLATE.md
(
echo # Discovery Report Template
echo.
echo Proyecto: %PROJECT_NAME%
echo Fecha: %DATE%
echo.
echo ## Resumen ejecutivo
echo.
echo ## Stack detectado
echo - Backend: %BACKEND_NAME%
echo - Frontend: %FRONTEND_NAME%
echo - Base de datos: %DB_NAME%
echo.
echo ## Dominio
echo - %DOMAIN_NAME%
echo.
echo ## Arquitectura
echo - %ARCH_STYLE%
echo.
echo ## Riesgos detectados
echo.
echo ## Agentes recomendados
echo.
echo ## Skills recomendadas
echo.
echo ## Proximos pasos
) > ".opencode\core\REPORT_TEMPLATE.md"

:: AGENT_FACTORY.md
(
echo # Agent Factory
echo.
echo Crear agentes solo cuando:
echo - El stack/dominio lo requiere
echo - La tarea necesita expertise especifica
echo - No existe un agente adecuado en la biblioteca
echo.
echo Reglas:
echo - Cada agente debe tener responsabilidad clara
echo - No duplicar responsabilidades entre agentes
echo - Eliminar agentes que ya no se usan
echo - Documentar cuando y como invocar cada agente
) > ".opencode\core\AGENT_FACTORY.md"

:: SKILL_FACTORY.md
(
echo # Skill Factory
echo.
echo Crear skills cuando:
echo - La tarea es repetitiva y tiene patrones claros
echo - El patron de conocimiento es reutilizable
echo - La tecnologia necesita instrucciones especificas
echo - Se necesita estandarizar un proceso
echo.
echo Cada skill debe tener:
echo - Objetivo claro
echo - Checklist de pasos
echo - Criterios de validacion
echo - Cuando aplicarla
) > ".opencode\core\SKILL_FACTORY.md"

:: ARCHITECTURE_DISCOVERY.md
(
echo # Architecture Discovery
echo.
echo Identificar en el proyecto:
echo - Patrones arquitectonicos (MVC, Clean, Hexagonal, CQRS)
echo - Estilo de arquitectura (%ARCH_STYLE%)
echo - Mapeo de dependencias entre modulos
echo - Diagramas C4 (Contexto, Contenedores, Componentes)
echo - Puntos de extension y acoplamiento
echo - Deuda arquitectonica
) > ".opencode\core\ARCHITECTURE_DISCOVERY.md"

echo  [OK] Core generado

:: ==============================================================================
:: 6. GENERAR MEMORIA
:: ==============================================================================
echo.
echo  [6/9] Generando sistema de memoria...

:: PROJECT_PROFILE.md
(
echo # Perfil del Proyecto
echo.
echo ## Informacion general
echo - Nombre: %PROJECT_NAME%
echo - Descripcion: %PROJECT_DESC%
echo - Dominio: %DOMAIN_NAME%
echo - Stack principal: %BACKEND_NAME% / %FRONTEND_NAME% / %DB_NAME%
echo.
echo ## Arquitectura
echo - Estilo: %ARCH_STYLE%
echo - Frontend: %FRONTEND_NAME%
echo - Backend: %BACKEND_NAME%
echo - Base de datos: %DB_NAME%
echo - Cloud: %CLOUD_NAME%
echo.
echo ## Calidad
echo - Cobertura de pruebas objetivo: %COVERAGE_TARGET%%%
echo - Framework testing: %TEST_FRAMEWORK%
echo - CI/CD: %CICD_NAME%
echo.
echo ## Estado
echo - Fase: Inicio
echo - CI/CD: %CICD_NAME%
echo - Contenedores: %CONTAINER_NAME%
echo - Monitoreo: Pendiente
echo.
echo ## Riesgos detectados
echo - [Pendiente de evaluacion inicial]
) > ".opencode\memory\PROJECT_PROFILE.md"

:: PROJECT_MEMORY.md
(
echo # Project Memory - %PROJECT_NAME%
echo.
echo Ultima actualizacion: %DATE%
echo.
echo ## Historial de sesiones
echo.
echo ### [%DATE%] - Bootstrap inicial
echo - Tarea: Inicializacion del proyecto con AIBF
echo - Agentes: Coordinator, Software Architect, Backend Expert, Frontend Expert
echo - Archivos generados: Estructura .opencode/ completa
echo - Decisiones: Proyecto creado con AIBF Generator
echo - Proximos pasos: Iniciar desarrollo del primer modulo
) > ".opencode\memory\PROJECT_MEMORY.md"

:: PROJECT_CONTEXT.md
(
echo # Project Context
echo.
echo Proyecto: %PROJECT_NAME%
echo Descripcion: %PROJECT_DESC%
echo.
echo ## Stakeholders
echo - [Pendiente de definir]
echo.
echo ## Objetivos de negocio
echo - [Pendiente de definir]
echo.
echo ## Restricciones
echo - Stack: %BACKEND_NAME% / %FRONTEND_NAME%
echo - Base de datos: %DB_NAME%
echo - Cloud: %CLOUD_NAME%
echo.
echo ## Integraciones externas
echo - [Pendiente de identificar]
) > ".opencode\memory\PROJECT_CONTEXT.md"

:: PROJECT_STATUS.md
(
echo # Project Status
echo.
echo Proyecto: %PROJECT_NAME%
echo Fecha: %DATE%
echo Fase: Inicializacion
echo.
echo ## Progreso general
echo - [ ] Bootstrap completado
echo - [ ] Discovery inicial
echo - [ ] Memoria configurada
echo - [ ] Primer modulo en desarrollo
echo.
echo ## Bloqueos activos
echo - Ninguno por el momento
echo.
echo ## Proximos hitos
echo - Definir backlog inicial
echo - Configurar entorno de desarrollo
echo - Implementar primer modulo
) > ".opencode\memory\PROJECT_STATUS.md"

:: ARCHITECTURE.md
(
echo # Architecture
echo.
echo Proyecto: %PROJECT_NAME%
echo Estilo: %ARCH_STYLE%
echo.
echo ## Stack tecnologico
echo - Backend: %BACKEND_NAME%
echo - Frontend: %FRONTEND_NAME%
echo - Base de datos: %DB_NAME%
echo - Cloud: %CLOUD_NAME%
echo - CI/CD: %CICD_NAME%
echo - Contenedores: %CONTAINER_NAME%
echo.
echo ## Decisiones arquitectonicas
echo - [Pendiente - ver ADRs en .opencode/templates/]
echo.
echo ## Diagramas
echo - C4 Context: Pendiente
echo - C4 Container: Pendiente
echo - C4 Component: Pendiente
echo.
echo ## Restricciones
echo - Lenguaje backend: %BACKEND_NAME%
echo - Framework frontend: %FRONTEND_NAME%
echo - Motor BD: %DB_NAME%
) > ".opencode\memory\ARCHITECTURE.md"

:: DATABASE.md
(
echo # Database
echo.
echo Proyecto: %PROJECT_NAME%
echo Motor: %DB_NAME%
echo.
echo ## Schema
echo - [Pendiente de definir]
echo.
echo ## ORM / Driver
echo - [Seleccionar segun stack]
echo.
echo ## Migraciones
echo - [Configurar herramienta de migraciones]
echo.
echo ## Backup policy
echo - [Definir segun requerimientos]
) > ".opencode\memory\DATABASE.md"

:: BUSINESS.md
(
echo # Business - %DOMAIN_NAME%
echo.
echo Dominio: %DOMAIN_NAME%
echo.
echo ## Reglas de negocio
echo - [Pendiente de documentar]
echo.
echo ## Procesos principales
echo - [Pendiente de mapear]
echo.
echo ## Entidades del dominio
echo - [Pendiente de listar]
) > ".opencode\memory\BUSINESS.md"

:: GLOSSARY.md
(
echo # Glossary - %DOMAIN_NAME%
echo.
echo Terminos del negocio para el dominio %DOMAIN_NAME%.
echo.
echo - [Pendiente de completar con el Business Analyst]
) > ".opencode\memory\GLOSSARY.md"

:: DECISIONS.md
(
echo # Architecture Decision Records
echo.
echo Historial de decisiones tecnicas del proyecto %PROJECT_NAME%.
echo.
echo - [Pendiente - usar ADR_TEMPLATE.md para registrar]
) > ".opencode\memory\DECISIONS.md"

:: RISKS.md
(
echo # Risks - %PROJECT_NAME%
echo.
echo Riesgos abiertos del proyecto.
echo.
echo - [Pendiente de identificar en fase Discovery]
) > ".opencode\memory\RISKS.md"

:: ROADMAP.md
(
echo # Roadmap - %PROJECT_NAME%
echo.
echo Proximas tareas y hitos del proyecto.
echo.
echo ## Fase 1: Fundacion
echo - [ ] Configurar entorno de desarrollo
echo - [ ] Implementar arquitectura base (%ARCH_STYLE%)
echo - [ ] Configurar CI/CD (%CICD_NAME%)
echo - [ ] Configurar base de datos (%DB_NAME%)
echo.
echo ## Fase 2: Core
echo - [ ] Implementar autenticacion y autorizacion
echo - [ ] Implementar modulo principal del dominio %DOMAIN_NAME%
echo - [ ] Implementar APIs REST
echo - [ ] Implementar UI basica
echo.
echo ## Fase 3: Calidad
echo - [ ] Alcanzar %COVERAGE_TARGET%% de cobertura
echo - [ ] Implementar logging y monitoreo
echo - [ ] Documentar APIs y arquitectura
echo - [ ] Auditoria de seguridad
echo.
echo ## Fase 4: Produccion
echo - [ ] Pruebas de carga y rendimiento
echo - [ ] Despliegue a produccion
echo - [ ] Monitoreo y alertas
echo - [ ] Documentacion final
) > ".opencode\memory\ROADMAP.md"

:: README.md for memory
(
echo # Memory System
echo.
echo Memoria incremental y persistente del proyecto.
echo.
echo Reglas:
echo - Nunca guardar codigo fuente, solo conocimiento resumido
echo - Actualizar despues de cada tarea significativa
echo - Mantener como fuente unica de verdad del proyecto
echo - Las decisiones obsoletas se archivan, no se eliminan
) > ".opencode\memory\README.md"

:: BACKEND.md
(
echo # Backend - %PROJECT_NAME%
echo.
echo Stack: %BACKEND_NAME%
echo Lenguaje: Segun stack seleccionado
echo Framework: Segun stack seleccionado
echo.
echo ## Modulos backend
echo - [Pendiente de definir]
echo.
echo ## APIs expuestas
echo - [Pendiente de documentar]
) > ".opencode\memory\BACKEND.md"

:: FRONTEND.md
(
echo # Frontend - %PROJECT_NAME%
echo.
echo Stack: %FRONTEND_NAME%
echo Framework: Segun stack seleccionado
echo.
echo ## Modulos frontend
echo - [Pendiente de definir]
echo.
echo ## Componentes principales
echo - [Pendiente de documentar]
) > ".opencode\memory\FRONTEND.md"

:: API.md
(
echo # API - %PROJECT_NAME%
echo.
echo Resumen de endpoints e integraciones.
echo.
echo ## Endpoints REST
echo - [Pendiente de documentar con API_SPEC.md]
echo.
echo ## Integraciones externas
echo - [Pendiente de identificar]
) > ".opencode\memory\API.md"

echo  [OK] Memoria generada

:: ==============================================================================
:: 7. GENERAR TEMPLATES
:: ==============================================================================
echo.
echo  [7/9] Generando templates y prompts...

:: Standard templates
(
echo # ADR - Architecture Decision Record
echo.
echo ## Contexto
echo.
echo ## Decision
echo.
echo ## Consecuencias
) > ".opencode\templates\ADR_TEMPLATE.md"

(
echo # API Specification
echo.
echo ## Endpoint
echo - Method:
echo - Path:
echo.
echo ## Request
echo.
echo ## Response
) > ".opencode\templates\API_SPEC.md"

(
echo # User Story
echo.
echo ## Historia
echo Como [rol], quiero [funcionalidad] para [beneficio].
echo.
echo ## Criterios de aceptacion
echo.
echo ## Notas tecnicas
) > ".opencode\templates\USER_STORY.md"

(
echo # RFC Template
echo.
echo ## Problema
echo.
echo ## Contexto
echo.
echo ## Propuesta
echo.
echo ## Riesgos
echo.
echo ## Alternativas
echo.
echo ## Decision
) > ".opencode\templates\RFC_TEMPLATE.md"

(
echo # Technical Spike
echo.
echo ## Objetivo
echo.
echo ## Hipotesis
echo.
echo ## Experimentos
echo.
echo ## Resultados
echo.
echo ## Conclusiones
) > ".opencode\templates\TECHNICAL_SPIKE.md"

(
echo # Project Profile Template
echo.
echo ## Informacion general
echo - Nombre:
echo - Dominio:
echo - Stack:
echo - Estado:
echo.
echo ## Arquitectura
echo - Estilo:
echo - Frontend:
echo - Backend:
echo - BD:
echo.
echo ## Modulos
echo.
echo ## Riesgos
) > ".opencode\templates\PROJECT_PROFILE.md"

(
echo # Project Memory Template
echo.
echo Fecha:
echo Tarea:
echo Agentes:
echo Decisiones:
echo Lecciones:
echo Proximos pasos:
) > ".opencode\templates\PROJECT_MEMORY.md"

:: Enterprise templates
(
echo # ADR - Architecture Decision Record
echo.
echo ## Contexto
echo.
echo ## Decision
echo.
echo ## Consecuencias
) > ".opencode\templates\enterprise\ADR.md"

(
echo # RFC
echo.
echo ## Problema
echo.
echo ## Propuesta
) > ".opencode\templates\enterprise\RFC.md"

(
echo # Epic
echo.
echo ## Vision
echo.
echo ## Objetivos de negocio
echo.
echo ## Alcance
echo.
echo ## Historias de usuario
) > ".opencode\templates\enterprise\EPIC.md"

(
echo # Feature
echo.
echo ## Descripcion
echo.
echo ## Criterios de aceptacion
echo.
echo ## Dependencias
) > ".opencode\templates\enterprise\FEATURE.md"

(
echo # User Story
echo Como [rol] quiero [accion] para [beneficio].
) > ".opencode\templates\enterprise\USER_STORY.md"

(
echo # Use Case
) > ".opencode\templates\enterprise\USE_CASE.md"

(
echo # Risk
) > ".opencode\templates\enterprise\RISK.md"

(
echo # Architecture Review
) > ".opencode\templates\enterprise\ARCHITECTURE_REVIEW.md"

(
echo # Security Review
) > ".opencode\templates\enterprise\SECURITY_REVIEW.md"

(
echo # Performance Review
) > ".opencode\templates\enterprise\PERFORMANCE_REVIEW.md"

(
echo # Database Change
) > ".opencode\templates\enterprise\DATABASE_CHANGE.md"

(
echo # Incident Report
) > ".opencode\templates\enterprise\INCIDENT.md"

(
echo # Postmortem
) > ".opencode\templates\enterprise\POSTMORTEM.md"

(
echo # Release Notes
) > ".opencode\templates\enterprise\RELEASE.md"

(
echo # Sprint Plan
) > ".opencode\templates\enterprise\SPRINT.md"

(
echo # Roadmap
) > ".opencode\templates\enterprise\ROADMAP.md"

(
echo # C4 Context Diagram
) > ".opencode\templates\enterprise\C4_CONTEXT.md"

(
echo # C4 Container Diagram
) > ".opencode\templates\enterprise\C4_CONTAINER.md"

(
echo # C4 Component Diagram
) > ".opencode\templates\enterprise\C4_COMPONENT.md"

(
echo # API Contract
) > ".opencode\templates\enterprise\API_CONTRACT.md"

echo  [OK] Templates generados

:: ==============================================================================
:: 8. GENERAR PROMPTS Y ENGINE
:: ==============================================================================
echo.
echo  [8/9] Generando prompts, engine, gobierno y calidad...

:: Prompts
(
echo # Master Prompt - Coordinator
echo.
echo Eres el Coordinator del AI Bootstrap Framework Central.
echo Actuas como un team lead virtual que orquesta agentes especializados.
echo.
echo Proyecto: %PROJECT_NAME%
echo Dominio: %DOMAIN_NAME%
echo Stack: %BACKEND_NAME% / %FRONTEND_NAME% / %DB_NAME%
echo Arquitectura: %ARCH_STYLE%
echo.
echo WORKFLOW OBLIGATORIO (cada solicitud):
echo Bootstrap ^> Discovery ^> Deep Analysis ^> Business ^> Questions ^> Summary ^> Approval ^> Planning ^> Execution ^> Validation ^> Documentation ^> Memory Update
echo.
echo REGLAS CARDINALES:
echo - Nunca implementes sin entender primero
echo - Siempre pregunta si hay incertidumbre
echo - Minimo contexto, maxima eficiencia de tokens
echo - Los agentes especializados NUNCA hablan directamente con el usuario
echo - Toda decision importante genera un ADR
echo - Siempre pide aprobacion antes de cambios relevantes
) > ".opencode\prompts\core\MASTER_PROMPT.md"

(
echo # Implementation Prompt Template
echo.
echo ## Rol
echo [Agente especializado]
echo.
echo ## Contexto del proyecto
echo Proyecto: %PROJECT_NAME%
echo Stack: %BACKEND_NAME% / %FRONTEND_NAME%
echo.
echo ## Tarea
echo [Descripcion de la tarea a implementar]
echo.
echo ## Instrucciones
echo - Sigue las buenas practicas del stack
echo - Manten la arquitectura existente
echo - Genera pruebas para el codigo nuevo
echo - Actualiza la documentacion si es necesario
echo.
echo ## Criterios de aceptacion
echo - [Criterio 1]
echo - [Criterio 2]
) > ".opencode\prompts\core\IMPLEMENTATION_PROMPT.md"

(
echo # INIT Prompt
echo.
echo Inicializar AI Bootstrap Framework sobre este proyecto siguiendo
echo el workflow obligatorio. No implementar codigo aun.
echo Analizar primero, presentar resumen y esperar aprobacion.
) > ".opencode\prompts\INIT_PROJECT.md"

:: Agent prompts
(
echo Decidir expertos, contexto y plan antes de ejecutar.
) > ".opencode\prompts\agents\COORDINATOR_PROMPT.md"

(
echo Evaluar impacto arquitectonico y generar ADR cuando corresponda.
) > ".opencode\prompts\agents\ARCHITECT_PROMPT.md"

:: Stack prompts
if "%BACKEND_NAME%"=="dotnet" (
(
echo # .NET Stack Prompt
echo.
echo Stack: .NET 8+ / C# 12+
echo ORM: EF Core
echo Testing: xUnit
echo Arquitectura: %ARCH_STYLE%
echo.
echo Buenas practicas:
echo - Usar async/await para operaciones I/O
echo - Seguir Clean Architecture con capas bien definidas
echo - Usar Dependency Injection nativa de .NET
echo - Configurar EF Core con migrations
echo - Implementar validacion con FluentValidation
echo - Usar MediatR para CQRS si aplica
echo - Logging estructurado con Serilog
) > ".opencode\prompts\stacks\DOTNET_PROMPT.md"
)

if "%FRONTEND_NAME%"=="react" (
(
echo Priorizar componentes reutilizables, accesibilidad y rendimiento.
echo Usar patrones de composicion, custom hooks y lazy loading.
echo Mantener bundle size optimo y Core Web Vitals.
) > ".opencode\prompts\stacks\REACT_PROMPT.md"
)

:: Domain prompts
(
echo Preservar reglas de %DOMAIN_NAME%: entidades, procesos y restricciones del dominio.
) > ".opencode\prompts\domains\%DOMAIN_NAME%_PROMPT.md"

:: ENGINE - Token Engine
(
echo # Motor de Gestion de Tokens
echo.
echo Proyecto: %PROJECT_NAME%
echo.
echo ## Reglas
echo 1. Trabajar por modulos pequenos en lugar de archivos completos
echo 2. Priorizar carga de skills especificas sobre conocimiento general
echo 3. Usar resumenes de codigo en lugar de codigo completo
echo 4. Cachear contexto cargado dentro del mismo ciclo
echo 5. Monitorear tokens usados vs disponibles en cada fase
echo.
echo ## Limites sugeridos
echo ^| Fase ^| Tokens max ^| Estrategia ^|
echo ^| Discovery ^| 8K ^| Resumir hallazgos ^|
echo ^| Planning ^| 4K ^| Plan conciso ^|
echo ^| Execution ^| 16K ^| Solo codigo relevante ^|
echo ^| Validation ^| 4K ^| Resultados de tests ^|
echo ^| Memory Update ^| 2K ^| Solo cambios relevantes ^|
) > ".opencode\engine\TOKEN_ENGINE.md"

:: CONTEXT_COMPRESSION
(
echo # Context Compression
echo.
echo Estrategias para reducir el contexto entre ciclos:
echo - Resumir historial de la sesion actual
echo - Mantener solo decisiones activas en memoria
echo - Archivar contenido de fases completadas
echo - Usar referencias a ADRs para detalle completo
echo - No repetir informacion ya conocida por el modelo
) > ".opencode\engine\CONTEXT_COMPRESSION.md"

:: CONTEXT_ROUTING
(
echo # Context Routing
echo.
echo Compartir solo el contexto necesario:
echo - Cada agente recibe solo los archivos relevantes
echo - Preferir resumenes sobre archivos completos
echo - No reprocesar informacion ya analizada
echo - Mantener trazabilidad del contexto compartido
) > ".opencode\engine\CONTEXT_ROUTING.md"

:: MEMORY_EVOLUTION
(
echo # Evolution de Memoria
echo.
echo Proyecto: %PROJECT_NAME%
echo.
echo ## Reglas
echo 1. PROJECT_MEMORY se actualiza al final de cada ciclo
echo 2. Solo almacenar informacion relevante para ciclos futuros
echo 3. Decisiones obsoletas se archivan, no se eliminan
echo 4. La memoria crece incrementalmente
echo 5. Cada actualizacion agrega entrada con timestamp
echo.
echo ## Politica de retencion
echo - Decisiones activas: Indefinido
echo - Historial de sesiones: Ultimas 10
echo - Lecciones aprendidas: Indefinido
echo - Contexto temporal: 1 semana
) > ".opencode\engine\MEMORY_EVOLUTION.md"

:: PROJECT_EVOLUTION
(
echo # Project Evolution
echo.
echo Seguimiento de madurez del proyecto %PROJECT_NAME%.
echo.
echo - Actualizar roadmap despues de cada hito
echo - Registrar cambios de arquitectura o stack
echo - Monitorear metricas de calidad con tendencias
echo - Acciones correctivas cuando las metricas empeoran
echo - Revision trimestral de salud del proyecto
) > ".opencode\engine\PROJECT_EVOLUTION.md"

:: GOVERNANCE
(
echo # Enterprise Policy
echo.
echo Proyecto: %PROJECT_NAME%
echo.
echo Todas las implementaciones deben:
echo - Seguir el workflow de 12 fases
echo - Respetar la arquitectura definida (%ARCH_STYLE%)
echo - Actualizar la memoria del proyecto
echo - Actualizar la documentacion
echo - Pasar las validaciones de calidad
echo - Minimizar el consumo de tokens
) > ".opencode\governance\ENTERPRISE_POLICY.md"

(
echo # Architecture Governance
echo.
echo - ADR obligatorio para decisiones que cambien la arquitectura
echo - Revisar impacto antes de implementar cambios
echo - No romper contratos publicos de API
echo - Mantener trazabilidad entre requisitos e implementacion
echo - Revision arquitectonica trimestral
) > ".opencode\governance\ARCHITECTURE_GOVERNANCE.md"

(
echo # Code Review Standard
echo.
echo ## Checklist de revision
echo - Arquitectura: respeta el estilo definido (%ARCH_STYLE%)
echo - Calidad: codigo limpio, sin duplicacion, con pruebas
echo - Tests: coverage minimo %COVERAGE_TARGET%%%, pruebas unitarias + integration
echo - Seguridad: sin secretos, SQL parametrizado, validacion de input
echo - Performance: sin N+1, sin bloqueos, sin memory leaks
echo.
echo ## Proceso
echo 1. Crear PR con descripcion clara
echo 2. Asignar revisor
echo 3. Revision en menos de 24h
echo 4. Squash merge a main
) > ".opencode\governance\CODE_REVIEW_STANDARD.md"

(
echo # Engineering Policy
echo.
echo Proyecto: %PROJECT_NAME%
echo.
echo Cada tarea debe tener:
echo - Objetivo claro y medible
echo - Plan de implementacion
echo - Validacion con pruebas
echo - Actualizacion de memoria
echo - Actualizacion de documentacion
echo.
echo Flujo: Analisis ^> Diseno ^> Plan ^> Implementacion ^> Validacion ^> Documentacion ^> Memoria
) > ".opencode\governance\ENGINEERING_POLICY.md"

:: QUALITY
(
echo # Quality Gate
echo.
echo No aprobar cambios si:
echo - Rompen la arquitectura (%ARCH_STYLE%)
echo - Reducen la cobertura por debajo de %COVERAGE_TARGET%%%
echo - Incrementan deuda tecnica critica
echo - No actualizan la documentacion
echo - No pasan las pruebas automaticas
) > ".opencode\quality\QUALITY_GATE.md"

(
echo # Bootstrap Checklist
echo.
echo - [ ] Proyecto identificado: %PROJECT_NAME%
echo - [ ] Dominio identificado: %DOMAIN_NAME%
echo - [ ] Stack identificado: %BACKEND_NAME% / %FRONTEND_NAME%
echo - [ ] Arquitectura identificada: %ARCH_STYLE%
echo - [ ] Riesgos detectados
echo - [ ] Memoria creada
echo - [ ] Agentes creados
echo - [ ] Skills creadas
echo - [ ] Plan generado
echo - [ ] Aprobacion recibida
) > ".opencode\quality\BOOTSTRAP_CHECKLIST.md"

(
echo # Implementation Checklist
echo.
echo - [ ] Plan aprobado por el usuario
echo - [ ] Codigo implementado siguiendo la arquitectura
echo - [ ] Pruebas unitarias agregadas
echo - [ ] Pruebas de integracion agregadas
echo - [ ] Validacion de calidad superada
echo - [ ] Documentacion actualizada
echo - [ ] Memoria actualizada
) > ".opencode\quality\IMPLEMENTATION_CHECKLIST.md"

(
echo # Release Checklist
echo.
echo - [ ] Build exitoso
echo - [ ] Todas las pruebas pasan
echo - [ ] Documentacion actualizada
echo - [ ] ADRs actualizados si aplica
echo - [ ] Changelog actualizado
echo - [ ] Riesgos revisados
echo - [ ] Performance validada
echo - [ ] Seguridad validada
) > ".opencode\quality\RELEASE_CHECKLIST.md"

(
echo # Audit Engine
echo.
echo El proyecto %PROJECT_NAME% cuenta con auditorias automaticas de:
echo - Arquitectura
echo - Codigo
echo - Seguridad
echo - Performance
echo - Testing
echo - Documentacion
echo - Deuda tecnica
) > ".opencode\quality\AUDIT_ENGINE.md"

(
echo # Quality Metrics
echo.
echo Proyecto: %PROJECT_NAME%
echo.
echo Registrar periodicamente:
echo - Complejidad ciclomatica promedio
echo - Cobertura de pruebas (%COVERAGE_TARGET%%% objetivo)
echo - Deuda tecnica estimada
echo - Tiempo de implementacion por tarea
echo - Riesgos abiertos
echo - ADRs pendientes
echo - Vulnerabilidades conocidas
) > ".opencode\quality\QUALITY_METRICS.md"

(
echo # Architecture Review
echo.
echo Hallazgos, Riesgos y Recomendaciones.
echo.
echo Realizar revision arquitectonica cada 3 meses o cuando haya cambios significativos.
) > ".opencode\quality\ARCHITECTURE_REVIEW.md"

:: KNOWLEDGE
(
echo # Knowledge Policy
echo.
echo - El conocimiento debe ser resumido
echo - Separar conocimiento tecnico y funcional
echo - No copiar codigo fuente
echo - Actualizar solo cuando cambie el proyecto
echo - Usar esta base antes de releer archivos
) > ".opencode\knowledge\KNOWLEDGE_POLICY.md"

(
echo # Architecture Patterns
echo.
echo Patrones disponibles para arquitectura %ARCH_STYLE%:
echo - Patrones de diseno GoF segun necesidad
echo - Patrones especificos del dominio %DOMAIN_NAME%
echo - Patrones de integracion y mensajeria
) > ".opencode\knowledge\ARCHITECTURE_PATTERNS.md"

(
echo # Anti-Patterns
echo.
echo Anti-patrones a evitar en el proyecto %PROJECT_NAME%:
echo - God Class / God Object
echo - Spaghetti Code
echo - Lava Flow
echo - Golden Hammer
echo - Copy-Paste Programming
echo - Premature Optimization
echo - SELECT N+1
echo - Magic Numbers / Strings
) > ".opencode\knowledge\ANTI_PATTERNS.md"

:: ENGINEERING PLAYBOOK
(
echo # Engineering Playbook
echo.
echo ## Principios
echo - Comprender antes de implementar
echo - Implementar en iteraciones pequenas
echo - Mantener la arquitectura (%ARCH_STYLE%)
echo - Actualizar documentacion y memoria
echo - Validar cada cambio
echo - Pruebas automaticas como requisito
echo.
echo ## Flujo
echo Analisis ^> Diseno ^> Plan ^> Implementacion ^> Validacion ^> Documentacion ^> Memoria
) > ".opencode\engineering\ENGINEERING_PLAYBOOK.md"

(
echo # Testing Strategy
echo.
echo Proyecto: %PROJECT_NAME%
echo Cobertura objetivo: %COVERAGE_TARGET%%%
echo Framework: %TEST_FRAMEWORK%
echo.
echo ## Piramide de testing
echo - 70%% Unitarias (logica de negocio, servicios, utilidades)
echo - 20%% Integracion (APIs, base de datos, integraciones)
echo - 10%% E2E (flujos completos del usuario)
echo.
echo ## Criterios de calidad
echo - Coverage unitario: ^>%COVERAGE_TARGET%%%
echo - Coverage de integracion: ^>60%%
echo - Tiempo maximo de suite completa: ^<10min
) > ".opencode\engineering\TESTING_STRATEGY.md"

(
echo # Refactoring Guide
echo.
echo Proyecto: %PROJECT_NAME%
echo.
echo Principios de refactorizacion:
echo - Reducir deuda tecnica sin cambiar comportamiento
echo - Mejorar legibilidad y mantenibilidad
echo - Refactorizar por modulos, no todo a la vez
echo - Acompanar cada refactor con pruebas
echo - Priorizar deuda tecnica de alto impacto
) > ".opencode\engineering\REFACTORING_GUIDE.md"

:: RULES
(
echo # Generation Rules
echo.
echo - No generar archivos innecesarios
echo - Reutilizar templates existentes
echo - Mantener estructura consistente
echo - Evitar duplicacion de contenido
echo - Actualizar memoria con cada cambio
) > ".opencode\rules\GENERATION_RULES.md"

:: ENGINE - MULTI AI
(
echo # Multi-AI Orchestration
echo.
echo El Coordinator puede distribuir tareas segun fortaleza de cada IA:
echo - Diseno de arquitectura: modelo fuerte en razonamiento
echo - Implementacion: modelo fuerte en codigo
echo - Revision de seguridad: modelo entrenado en vulnerabilidades
echo - Automatizacion: opencode
echo.
echo Proyecto: %PROJECT_NAME%
echo Stack: %BACKEND_NAME% / %FRONTEND_NAME%
) > ".opencode\engine\MULTI_AI_ORCHESTRATION.md"

echo  [OK] Prompts, engine, gobierno y calidad generados

:: ==============================================================================
:: 9. GENERAR SKILLS Y TECNOLOGIA
:: ==============================================================================
echo.
echo  [9/9] Generando skills, tecnologia, especialistas y playbooks...

:: Skills base - Discovery
(
echo # Skill: Analyze Project
echo.
echo ## Objetivo
echo Analizar la estructura y configuracion del proyecto.
echo.
echo ## Cuando usar
echo Al iniciar un nuevo proyecto o al recibir un proyecto existente.
echo.
echo ## Procedimiento
echo 1. Examinar estructura de directorios
echo 2. Identificar archivos de configuracion
echo 3. Detectar tecnologias y frameworks
echo 4. Identificar patrones de diseno
echo 5. Evaluar calidad del codigo
echo.
echo ## Salida
echo Resumen del proyecto con tecnologias, arquitectura y estado.
) > ".opencode\skills\discovery\analyze-project\SKILL.md"

(
echo # Skill: Detect Stack
echo.
echo ## Objetivo
echo Identificar el stack tecnologico del proyecto.
echo.
echo ## Cuando usar
echo Durante la fase Discovery.
echo.
echo ## Procedimiento
echo 1. Revisar package.json / .csproj / requirements.txt / pom.xml
echo 2. Identificar frameworks y librerias principales
echo 3. Detectar versiones de cada tecnologia
echo 4. Identificar herramientas de build y testing
echo.
echo ## Salida
echo Stack tecnologico completo con versiones.
) > ".opencode\skills\discovery\detect-stack\SKILL.md"

(
echo # Skill: Detect Domain
echo.
echo ## Objetivo
echo Identificar el dominio de negocio del proyecto.
echo.
echo ## Cuando usar
echo Durante la fase Discovery.
echo.
echo ## Procedimiento
echo 1. Analizar nombres de modulos y namespaces
echo 2. Leer documentacion existente
echo 3. Identificar entidades del dominio
echo 4. Clasificar el tipo de negocio
echo.
echo ## Salida
echo Dominio de negocio identificado y glosario inicial.
) > ".opencode\skills\discovery\detect-domain\SKILL.md"

(
echo # Skill: Detect Architecture
echo.
echo ## Objetivo
echo Identificar el estilo arquitectonico del proyecto.
echo.
echo ## Cuando usar
echo Durante la fase Discovery.
echo.
echo ## Procedimiento
echo 1. Analizar estructura de capas y modulos
echo 2. Identificar patrones de diseno
echo 3. Mapear dependencias entre modulos
echo 4. Identificar estilo arquitectonico
echo.
echo ## Salida
echo Diagrama de arquitectura y patrones identificados.
) > ".opencode\skills\discovery\detect-architecture\SKILL.md"

:: Skills base - Development
(
echo # Skill: Review Code
echo.
echo ## Objetivo
echo Revisar la calidad del codigo siguiendo las buenas practicas del stack.
echo.
echo ## Cuando usar
echo Antes de aprobar un PR o cambio significativo.
echo.
echo ## Procedimiento
echo 1. Verificar que sigue estandares del stack
echo 2. Identificar code smells
echo 3. Verificar cobertura de pruebas
echo 4. Identificar problemas de rendimiento
echo.
echo ## Salida
echo Reporte de revision con hallazgos y recomendaciones.
) > ".opencode\skills\development\review-code\SKILL.md"

(
echo # Skill: Generate Tests
echo.
echo ## Objetivo
echo Generar pruebas unitarias y de integracion para el codigo.
echo.
echo ## Cuando usar
echo Despues de implementar nueva funcionalidad.
echo.
echo ## Procedimiento
echo 1. Identificar casos de uso y limites
echo 2. Generar pruebas unitarias para logica de negocio
echo 3. Generar pruebas de integracion para APIs
echo 4. Verificar cobertura minima (%COVERAGE_TARGET%%%)
echo.
echo ## Salida
echo Suite de pruebas con cobertura documentada.
) > ".opencode\skills\development\generate-tests\SKILL.md"

(
echo # Skill: Refactor Module
echo.
echo ## Objetivo
echo Refactorizar un modulo manteniendo su comportamiento.
echo.
echo ## Cuando usar
echo Cuando hay deuda tecnica acumulada o codigo dificil de mantener.
echo.
echo ## Procedimiento
echo 1. Identificar el modulo a refactorizar
echo 2. Asegurar cobertura de pruebas existente
echo 3. Refactorizar en pequenos pasos
echo 4. Verificar que las pruebas siguen pasando
echo.
echo ## Salida
echo Modulo refactorizado con documentacion de cambios.
) > ".opencode\skills\development\refactor-module\SKILL.md"

:: Skills base - Architecture
(
echo # Skill: Create ADR
echo.
echo ## Objetivo
echo Documentar decisiones arquitectonicas importantes.
echo.
echo ## Cuando usar
echo Cuando se toma una decision que afecta la arquitectura.
echo.
echo ## Procedimiento
echo 1. Documentar contexto y motivacion
echo 2. Describir la decision tomada
echo 3. Listar alternativas consideradas
echo 4. Documentar consecuencias
echo.
echo ## Salida
echo ADR registrado en .opencode/templates/enterprise/ADR.md
) > ".opencode\skills\architecture\create-adr\SKILL.md"

(
echo # Skill: Architecture Review
echo.
echo ## Objetivo
echo Revisar que la arquitectura se mantiene coherente.
echo.
echo ## Cuando usar
echo Durante code review o cuando se agreguen nuevos modulos.
echo.
echo ## Procedimiento
echo 1. Verificar que se respeta el estilo arquitectonico (%ARCH_STYLE%)
echo 2. Identificar violaciones de dependencias
echo 3. Verificar separacion de concerns
echo.
echo ## Salida
echo Reporte de salud arquitectonica.
) > ".opencode\skills\architecture\architecture-review\SKILL.md"

:: Skills base - Documentation
(
echo # Skill: Update Memory
echo.
echo ## Objetivo
echo Mantener la memoria del proyecto actualizada.
echo.
echo ## Cuando usar
echo Al final de cada ciclo de trabajo.
echo.
echo ## Procedimiento
echo 1. Registrar tareas completadas
echo 2. Documentar decisiones tomadas
echo 3. Actualizar lecciones aprendidas
echo 4. Listar proximos pasos
echo.
echo ## Salida
echo PROJECT_MEMORY actualizado con timestamp.
) > ".opencode\skills\documentation\update-memory\SKILL.md"

(
echo # Skill: Generate Docs
echo.
echo ## Objetivo
echo Generar documentacion tecnica del proyecto.
echo.
echo ## Cuando usar
echo Cuando se implementan nuevas APIs o modulos.
echo.
echo ## Procedimiento
echo 1. Documentar endpoints y contratos
echo 2. Actualizar README si es necesario
echo 3. Generar diagramas de arquitectura
echo 4. Documentar decisiones en ADRs
echo.
echo ## Salida
echo Documentacion actualizada y consistente.
) > ".opencode\skills\documentation\generate-docs\SKILL.md"

:: Skills base - Business
(
echo # Skill: Discover Business
echo.
echo ## Objetivo
echo Descubrir y documentar reglas de negocio del dominio.
echo.
echo ## Cuando usar
echo Al inicio del proyecto o cuando se trabaja en un nuevo modulo.
echo.
echo ## Procedimiento
echo 1. Identificar actores y roles
echo 2. Mapear procesos de negocio
echo 3. Documentar reglas de negocio
echo 4. Crear glosario del dominio
echo.
echo ## Salida
echo Documentacion de negocio y glosario.
) > ".opencode\skills\business\discover-business\SKILL.md"

:: Expert skills - Architecture
setlocal enabledelayedexpansion
for /l %%i in (1,1,3) do (
(
echo # Architecture Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de arquitectura para el proyecto %PROJECT_NAME%.
echo.
echo ## Checklist
echo - Mantener consistencia con el estilo %ARCH_STYLE%
echo - Evitar duplicacion de responsabilidades
echo - Optimizar mantenibilidad y escalabilidad
echo - Documentar decisiones en ADRs
echo.
echo ## Validaciones
echo - La arquitectura respeta los principios del estilo elegido
echo - Las dependencias fluyen en la direccion correcta
echo - Los modulos tienen responsabilidad unica
echo.
echo ## Cuando aplicar
echo Durante el diseno e implementacion de nuevos modulos o funcionalidades.
) > ".opencode\skills\expert\architecture\architecture-skill-0%%i.md"
)

for /l %%i in (4,1,9) do (
(
echo # Architecture Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de arquitectura para el proyecto %PROJECT_NAME%.
echo.
echo ## Checklist
echo - Mantener consistencia con el estilo %ARCH_STYLE%
echo - Evitar duplicacion de responsabilidades
echo - Optimizar mantenibilidad y escalabilidad
echo - Documentar decisiones en ADRs
echo.
echo ## Cuando aplicar
echo Durante el diseno e implementacion de nuevos modulos o funcionalidades.
) > ".opencode\skills\expert\architecture\architecture-skill-0%%i.md"
)
(
echo # Architecture Skill 10
echo.
echo ## Objetivo
echo Validaciones finales de arquitectura antes de release.
echo.
echo ## Checklist
echo - Todos los ADRs importantes estan documentados
echo - La arquitectura es consistente en todo el proyecto
echo - No hay violaciones de dependencias entre capas
echo - Los diagramas C4 estan actualizados
echo.
echo ## Cuando aplicar
echo Antes de cada release importante.
) > ".opencode\skills\expert\architecture\architecture-skill-10.md"

:: Expert skills - Backend
for /l %%i in (1,1,9) do (
(
echo # Backend Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de backend para %BACKEND_NAME% en %PROJECT_NAME%.
echo.
echo ## Checklist
echo - APIs RESTful consistentes
echo - Manejo de errores adecuado
echo - Validacion de datos de entrada
echo - Logging estructurado
echo.
echo ## Cuando aplicar
echo Durante la implementacion de APIs y servicios backend.
) > ".opencode\skills\expert\backend\backend-skill-0%%i.md"
)
(
echo # Backend Skill 10
echo.
echo ## Objetivo
echo Optimizacion de rendimiento backend.
echo.
echo ## Checklist
echo - Consultas N+1 eliminadas
echo - Caching implementado donde aplica
echo - Conexiones a BD con pooling
echo - Endpoints con paginacion
echo.
echo ## Cuando aplicar
echo Durante optimizacion de rendimiento backend.
) > ".opencode\skills\expert\backend\backend-skill-10.md"

:: Expert skills - Frontend
for /l %%i in (1,1,9) do (
(
echo # Frontend Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de frontend para %FRONTEND_NAME% en %PROJECT_NAME%.
echo.
echo ## Checklist
echo - Componentes reutilizables
echo - Estado gestionado correctamente
echo - Accesibilidad WCAG 2.1 AA
echo - Core Web Vitals optimizados
echo.
echo ## Cuando aplicar
echo Durante la implementacion de UI y componentes.
) > ".opencode\skills\expert\frontend\frontend-skill-0%%i.md"
)
(
echo # Frontend Skill 10
echo.
echo ## Objetivo
echo Optimizacion de rendimiento frontend.
echo.
echo ## Checklist
echo - Lazy loading implementado
echo - Bundle size optimizado
echo - Core Web Vitals en verde
echo - Sin renderizados innecesarios
echo.
echo ## Cuando aplicar
echo Durante optimizacion de rendimiento frontend.
) > ".opencode\skills\expert\frontend\frontend-skill-10.md"

:: Expert skills - Database
for /l %%i in (1,1,9) do (
(
echo # Database Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de base de datos para %DB_NAME% en %PROJECT_NAME%.
echo.
echo ## Checklist
echo - Indices optimizados para consultas frecuentes
echo - Migraciones versionadas
echo - Consultas parametrizadas
echo - Esquema normalizado
echo.
echo ## Cuando aplicar
echo Durante el diseno y mantenimiento de la base de datos.
) > ".opencode\skills\expert\database\database-skill-0%%i.md"
)
(
echo # Database Skill 10
echo.
echo ## Objetivo
echo Optimizacion de consultas y rendimiento de BD.
echo.
echo ## Checklist
echo - Planes de ejecucion revisados
echo - Indices faltantes identificados
echo - Consultas lentas optimizadas
echo - Particionamiento considerado para tablas grandes
echo.
echo ## Cuando aplicar
echo Cuando hay problemas de rendimiento en consultas.
) > ".opencode\skills\expert\database\database-skill-10.md"

:: Expert skills - DevOps
for /l %%i in (1,1,9) do (
(
echo # DevOps Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de DevOps para %PROJECT_NAME%.
echo.
echo ## Checklist
echo - Pipeline CI/CD funcional (%CICD_NAME%)
echo - Infraestructura como codigo
echo - Despliegues automatizados
echo - Monitoreo y alertas configurados
echo.
echo ## Cuando aplicar
echo Durante configuracion de infraestructura y CI/CD.
) > ".opencode\skills\expert\devops\devops-skill-0%%i.md"
)
(
echo # DevOps Skill 10
echo.
echo ## Objetivo
echo Seguridad en el pipeline CI/CD.
echo.
echo ## Checklist
echo - Secretos gestionados con vault
echo - Vulnerabilidades escaneadas en dependencias
echo - Imagenes Docker escaneadas
echo - Acceso restringido a produccion
echo.
echo ## Cuando aplicar
echo Durante auditoria de seguridad del pipeline.
) > ".opencode\skills\expert\devops\devops-skill-10.md"

:: Expert skills - Testing
for /l %%i in (1,1,9) do (
(
echo # Testing Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de testing para %PROJECT_NAME%.
echo.
echo ## Checklist
echo - Pruebas unitarias cubren logica de negocio
echo - Pruebas de integracion cubren APIs
echo - Mocks utilizados correctamente
echo - Cobertura objetivo: %COVERAGE_TARGET%%%
echo.
echo ## Cuando aplicar
echo Durante y despues de la implementacion de funcionalidades.
) > ".opencode\skills\expert\testing\testing-skill-0%%i.md"
)
(
echo # Testing Skill 10
echo.
echo ## Objetivo
echo Estrategia de testing E2E.
echo.
echo ## Checklist
echo - Flujos criticos cubiertos con E2E
echo - Pruebas en entorno similar a produccion
echo - Datos de prueba gestionados
echo - Reportes de resultados automatizados
echo.
echo ## Cuando aplicar
echo Antes de releases importantes.
) > ".opencode\skills\expert\testing\testing-skill-10.md"

:: Expert skills - Security
for /l %%i in (1,1,9) do (
(
echo # Security Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de seguridad para %PROJECT_NAME%.
echo.
echo ## Checklist
echo - OWASP Top 10 revisado
echo - Autenticacion y autorizacion implementadas
echo - Datos sensibles cifrados
echo - Input validation en todos los endpoints
echo.
echo ## Cuando aplicar
echo Durante implementacion y auditoria de seguridad.
) > ".opencode\skills\expert\security\security-skill-0%%i.md"
)
(
echo # Security Skill 10
echo.
echo ## Objetivo
echo Threat modeling y analisis de riesgos.
echo.
echo ## Checklist
echo - Diagrama de flujo de datos creado
echo - Threat model documentado
echo - Mitigaciones implementadas
echo - Pruebas de penetracion realizadas
echo.
echo ## Cuando aplicar
echo Para aplicaciones que manejan datos sensibles o criticos.
) > ".opencode\skills\expert\security\security-skill-10.md"

:: Expert skills - Performance
for /l %%i in (1,1,9) do (
(
echo # Performance Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de rendimiento para %PROJECT_NAME%.
echo.
echo ## Checklist
echo - Latencia de API optimizada
echo - Bundle size controlado
echo - Caching implementado
echo - Consultas de BD optimizadas
echo.
echo ## Cuando aplicar
echo Durante desarrollo y optimizacion de rendimiento.
) > ".opencode\skills\expert\performance\performance-skill-0%%i.md"
)
(
echo # Performance Skill 10
echo.
echo ## Objetivo
echo Load testing y capacity planning.
echo.
echo ## Checklist
echo - Pruebas de carga realizadas
echo - Cuellos de botella identificados
echo - Plan de escalamiento definido
echo - SLOs de rendimiento documentados
echo.
echo ## Cuando aplicar
echo Antes de lanzamientos a produccion.
) > ".opencode\skills\expert\performance\performance-skill-10.md"

:: Expert skills - Business
for /l %%i in (1,1,9) do (
(
echo # Business Skill %%i
echo.
echo ## Objetivo
echo Analisis de negocio para dominio %DOMAIN_NAME% en %PROJECT_NAME%.
echo.
echo ## Checklist
echo - Reglas de negocio documentadas
echo - Actores y roles identificados
echo - Procesos mapeados
echo - Glosario actualizado
echo.
echo ## Cuando aplicar
echo Durante fase Discovery y analisis de requerimientos.
) > ".opencode\skills\expert\business\business-skill-0%%i.md"
)
(
echo # Business Skill 10
echo.
echo ## Objetivo
echo Mapa de dependencias e integraciones del negocio.
echo.
echo ## Checklist
echo - Integraciones externas mapeadas
echo - Dependencias entre modulos documentadas
echo - Riesgos de integracion identificados
echo - Plan de mitigacion definido
echo.
echo ## Cuando aplicar
echo Cuando hay integraciones con sistemas externos.
) > ".opencode\skills\expert\business\business-skill-10.md"

:: Expert skills - Mobile (if selected)
if "%INCLUDE_MOBILE%"=="true" (
for /l %%i in (1,1,9) do (
(
echo # Mobile Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de desarrollo movil para %PROJECT_NAME%.
echo.
echo ## Checklist
echo - UI adaptable a diferentes tamanos de pantalla
echo - Manejo de estado offline
echo - Sincronizacion eficiente
echo - Notificaciones push configuradas
echo.
echo ## Cuando aplicar
echo Durante desarrollo de funcionalidades moviles.
) > ".opencode\skills\expert\mobile\mobile-skill-0%%i.md"
)
(
echo # Mobile Skill 10
echo.
echo ## Objetivo
echo Publicacion en tiendas de aplicaciones.
echo.
echo ## Checklist
echo - Assets y configuracion de tienda preparados
echo - Pruebas en dispositivos reales realizadas
echo - Cumplimiento de politicas de tienda verificado
echo - Proceso de release documentado
echo.
echo ## Cuando aplicar
echo Antes de publicar en App Store o Google Play.
) > ".opencode\skills\expert\mobile\mobile-skill-10.md"
)

:: Expert skills - Data (if selected)
if "%INCLUDE_DATA%"=="true" (
for /l %%i in (1,1,9) do (
(
echo # Data Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de datos y analitica para %PROJECT_NAME%.
echo.
echo ## Checklist
echo - Pipelines de datos disenados
echo - Calidad de datos validada
echo - Modelos documentados
echo - Privacidad de datos asegurada
echo.
echo ## Cuando aplicar
echo Durante implementacion de funcionalidades de datos.
) > ".opencode\skills\expert\data\data-skill-0%%i.md"
)
(
echo # Data Skill 10
echo.
echo ## Objetivo
echo MLOps y monitoreo de modelos en produccion.
echo.
echo ## Checklist
echo - Pipeline de ML automatizado
echo - Modelos versionados y registrados
echo - Deriva de modelos monitoreada
echo - Retraining automatizado
echo.
echo ## Cuando aplicar
echo Cuando se tienen modelos ML en produccion.
) > ".opencode\skills\expert\data\data-skill-10.md"
)

:: Expert skills - Documentation (if selected)
if "%INCLUDE_DOCS%"=="true" (
for /l %%i in (1,1,9) do (
(
echo # Documentation Skill %%i
echo.
echo ## Objetivo
echo Buenas practicas de documentacion para %PROJECT_NAME%.
echo.
echo ## Checklist
echo - README actualizado con instrucciones claras
echo - APIs documentadas con ejemplos
echo - ADRs registrados para decisiones importantes
echo - Guia de onboarding para nuevos desarrolladores
echo.
echo ## Cuando aplicar
echo Durante y despues de cada implementacion.
) > ".opencode\skills\expert\documentation\documentation-skill-0%%i.md"
)
(
echo # Documentation Skill 10
echo.
echo ## Objetivo
echo Documentacion de arquitectura y diagramas.
echo.
echo ## Checklist
echo - Diagramas C4 actualizados (Contexto, Contenedores, Componentes)
echo - Documentacion de decisiones arquitectonicas (ADRs)
echo - Guia de despliegue documentada
echo - Plan de disaster recovery documentado
echo.
echo ## Cuando aplicar
echo Cuando hay cambios arquitectonicos importantes.
) > ".opencode\skills\expert\documentation\documentation-skill-10.md"
)

:: Technology guides based on selected stack
if "%BACKEND_NAME%"=="dotnet" (
mkdir ".opencode\technology\dotnet\architecture" 2>nul
mkdir ".opencode\technology\dotnet\aspnet-core" 2>nul
mkdir ".opencode\technology\dotnet\entity-framework" 2>nul
mkdir ".opencode\technology\dotnet\performance" 2>nul
mkdir ".opencode\technology\dotnet\testing" 2>nul

call :create_guide "dotnet" "architecture" ".NET - Arquitectura"
call :create_guide "dotnet" "aspnet-core" ".NET - ASP.NET Core"
call :create_guide "dotnet" "entity-framework" ".NET - Entity Framework"
call :create_guide "dotnet" "performance" ".NET - Performance"
call :create_guide "dotnet" "testing" ".NET - Testing"
)

if "%BACKEND_NAME%"=="node" (
mkdir ".opencode\technology\node\express" 2>nul
mkdir ".opencode\technology\node\nest" 2>nul
mkdir ".opencode\technology\node\security" 2>nul
mkdir ".opencode\technology\node\testing" 2>nul

call :create_guide "node" "express" "Node.js - Express"
call :create_guide "node" "nest" "Node.js - NestJS"
call :create_guide "node" "security" "Node.js - Seguridad"
call :create_guide "node" "testing" "Node.js - Testing"
)

if "%BACKEND_NAME%"=="python" (
mkdir ".opencode\technology\python\fastapi" 2>nul
mkdir ".opencode\technology\python\django" 2>nul
mkdir ".opencode\technology\python\testing" 2>nul
mkdir ".opencode\technology\python\typing" 2>nul

call :create_guide "python" "fastapi" "Python - FastAPI"
call :create_guide "python" "django" "Python - Django"
call :create_guide "python" "testing" "Python - Testing"
call :create_guide "python" "typing" "Python - Type Hints"
)

if "%BACKEND_NAME%"=="java" (
mkdir ".opencode\technology\java\spring" 2>nul
mkdir ".opencode\technology\java\jpa" 2>nul
mkdir ".opencode\technology\java\performance" 2>nul
mkdir ".opencode\technology\java\testing" 2>nul

call :create_guide "java" "spring" "Java - Spring Boot"
call :create_guide "java" "jpa" "Java - JPA"
call :create_guide "java" "performance" "Java - Performance"
call :create_guide "java" "testing" "Java - Testing"
)

if "%FRONTEND_NAME%"=="react" (
mkdir ".opencode\technology\react\components" 2>nul
mkdir ".opencode\technology\react\state" 2>nul
mkdir ".opencode\technology\react\routing" 2>nul
mkdir ".opencode\technology\react\performance" 2>nul
mkdir ".opencode\technology\react\testing" 2>nul

call :create_guide "react" "components" "React - Componentes"
call :create_guide "react" "state" "React - Estado"
call :create_guide "react" "routing" "React - Routing"
call :create_guide "react" "performance" "React - Performance"
call :create_guide "react" "testing" "React - Testing"
)

if "%FRONTEND_NAME%"=="angular" (
mkdir ".opencode\technology\angular\components" 2>nul
mkdir ".opencode\technology\angular\routing" 2>nul
mkdir ".opencode\technology\angular\signals" 2>nul
mkdir ".opencode\technology\angular\testing" 2>nul

call :create_guide "angular" "components" "Angular - Componentes"
call :create_guide "angular" "routing" "Angular - Routing"
call :create_guide "angular" "signals" "Angular - Signals"
call :create_guide "angular" "testing" "Angular - Testing"
)

if "%DB_NAME%"=="postgresql" call :create_guide "database" "postgresql" "Base de Datos - PostgreSQL"
if "%DB_NAME%"=="sqlserver" call :create_guide "database" "sqlserver" "Base de Datos - SQL Server"
if "%DB_NAME%"=="mysql" call :create_guide "database" "mysql" "Base de Datos - MySQL"
if "%DB_NAME%"=="mongodb" call :create_guide "database" "mongodb" "Base de Datos - MongoDB"

:: Specialists based on stack
if "%BACKEND_NAME%"=="dotnet" (
(
echo %BACKEND_NAME% - Especialista .NET
echo.
echo Especialista en .NET con Clean Architecture, ASP.NET Core,
echo EF Core, Minimal APIs, rendimiento y buenas practicas C# 12+.
) > ".opencode\specialists\backend\%BACKEND_NAME%.md"
)
if "%BACKEND_NAME%"=="node" (
(
echo Node.js - Especialista Backend Node
echo.
echo Especialista en Node.js con Express, NestJS, TypeScript,
echo APIs REST/GraphQL, y optimizacion de rendimiento.
) > ".opencode\specialists\backend\%BACKEND_NAME%.md"
)
if "%BACKEND_NAME%"=="python" (
(
echo Python - Especialista Backend Python
echo.
echo Especialista en Python con FastAPI, Django, type hints,
echo y buenas practicas de desarrollo Python.
) > ".opencode\specialists\backend\%BACKEND_NAME%.md"
)

if "%FRONTEND_NAME%"=="react" (
(
echo React - Especialista Frontend React
echo.
echo Especialista en React con componentes reutilizables,
echo hooks, estado global, rendimiento y accesibilidad.
) > ".opencode\specialists\frontend\%FRONTEND_NAME%.md"
)
if "%FRONTEND_NAME%"=="angular" (
(
echo Angular - Especialista Frontend Angular
echo.
echo Especialista en Angular con Signals, componentes standalone,
echo routing, NgRx y buenas practicas Angular 17+.
) > ".opencode\specialists\frontend\%FRONTEND_NAME%.md"
)

:: Domain specialist
(
echo %DOMAIN_NAME% - Especialista en dominio %DOMAIN_NAME%
echo.
echo Especialista en logica de negocio, reglas y procesos
echo del dominio %DOMAIN_NAME%.
) > ".opencode\specialists\domains\%DOMAIN_NAME%.md"

:: Playbook stacks
(
echo # Playbook %BACKEND_NAME% + %FRONTEND_NAME%
echo.
echo Checklist completo para proyectos Full Stack:
echo - Backend: %BACKEND_NAME%
echo - Frontend: %FRONTEND_NAME%
echo - Base de datos: %DB_NAME%
echo - Arquitectura: %ARCH_STYLE%
echo.
echo Fases:
echo 1. Configuracion del entorno de desarrollo
echo 2. Implementacion de autenticacion
echo 3. Implementacion de API REST
echo 4. Implementacion de UI
echo 5. Pruebas y validacion
echo 6. Despliegue
) > ".opencode\playbooks\stacks\%BACKEND_NAME%-%FRONTEND_NAME%.md"

:: Playbook domain
(
echo # Playbook %DOMAIN_NAME%
echo.
echo Checklist completo para proyectos de dominio %DOMAIN_NAME%.
echo - Entidades principales del dominio
echo - Reglas de negocio especificas
echo - Procesos transaccionales
echo - Reportes y analitica
) > ".opencode\playbooks\domains\%DOMAIN_NAME%.md"

:: Master playbook
(
echo # Master Playbook - %PROJECT_NAME%
echo.
echo Playbook Maestro: Analizar ^> Preguntar ^> Resumir ^> Aprobar ^> Planificar ^> Ejecutar ^> Validar ^> Auditar.
echo.
echo Proyecto: %PROJECT_NAME%
echo Stack: %BACKEND_NAME% + %FRONTEND_NAME%
echo Dominio: %DOMAIN_NAME%
echo Arquitectura: %ARCH_STYLE%
) > ".opencode\playbooks\MASTER_PLAYBOOK.md"

:: Knowledge domain
(
echo # Dominio: %DOMAIN_NAME%
echo.
echo Entidades del dominio %DOMAIN_NAME% para el proyecto %PROJECT_NAME%.
echo - [Pendiente de definir con Business Analyst]
) > ".opencode\knowledge\domains\%DOMAIN_NAME%.md"

:: DOCS
(
echo # Guia de Uso - %PROJECT_NAME%
echo.
echo Proyecto generado con AI Bootstrap Framework Central v%AIBF_VERSION%.
echo.
echo ## Inicio rapido
echo.
echo 1. Abre opencode en la raiz del proyecto
echo 2. Escribe: "Inicia este proyecto con AIBF"
echo 3. El asistente ejecutara el workflow de bootstrap
echo.
echo ## Agentes disponibles
echo - Coordinator: Orquestador principal
echo - Product Owner: Vision de producto
echo - Business Analyst: Analisis de negocio
echo - Software Architect: Arquitectura
echo - Tech Lead: Liderazgo tecnico
echo - Backend Expert (%BACKEND_NAME%)
echo - Frontend Expert (%FRONTEND_NAME%)
echo - Database Expert (%DB_NAME%)
echo - DevOps Expert (CI/CD: %CICD_NAME%)
echo - QA Expert (cobertura: %COVERAGE_TARGET%%%)
echo - Scrum Master: Procesos agiles
echo - Documentation Expert: Documentacion
echo.
echo ## Workflow
echo Cada solicitud ejecuta 12 fases: Bootstrap ^> Discovery ^> Deep Analysis
echo ^> Business ^> Questions ^> Summary ^> Approval ^> Planning
echo ^> Execution ^> Validation ^> Documentation ^> Memory Update
) > "docs\AIBF-GUIA-USO.md"

:: README.md del proyecto
(
echo # %PROJECT_NAME%
echo.
echo %PROJECT_DESC%
echo.
echo ---
echo.
echo Proyecto generado con **AI Bootstrap Framework Central v%AIBF_VERSION%**
echo.
echo ## Stack tecnologico
echo.
echo ^| Capa ^| Tecnologia ^|
echo ^|---^|---^|
echo ^| Backend ^| %BACKEND_NAME% ^|
echo ^| Frontend ^| %FRONTEND_NAME% ^|
echo ^| Base de Datos ^| %DB_NAME% ^|
echo ^| Arquitectura ^| %ARCH_STYLE% ^|
echo ^| Cloud ^| %CLOUD_NAME% ^|
echo ^| CI/CD ^| %CICD_NAME% ^|
echo ^| Contenedores ^| %CONTAINER_NAME% ^|
echo.
echo ## Dominio
echo %DOMAIN_NAME%
echo.
echo ## Comenzar
echo.
echo 1. Abre el proyecto con opencode
echo 2. Ejecuta: "Inicia este proyecto con AIBF"
echo 3. Sigue el workflow guiado
echo.
echo ---
echo Generado el %DATE%
) > "README.md"

echo  [OK] Skills, tecnologia, especialistas y playbooks generados
echo.

:: Calculate agent count
set "AGENT_COUNT=15"
if "%INCLUDE_MOBILE%"=="true" set /a "AGENT_COUNT+=1"
if "%INCLUDE_DATA%"=="true" set /a "AGENT_COUNT+=1"
if "%INCLUDE_COMPLIANCE%"=="true" set /a "AGENT_COUNT+=1"
if "%INCLUDE_UX%"=="true" set /a "AGENT_COUNT+=1"
if "%INCLUDE_SECURITY%"=="true" set /a "AGENT_COUNT+=1"
if "%INCLUDE_PERFORMANCE%"=="true" set /a "AGENT_COUNT+=1"

:: ==============================================================================
:: RESUMEN FINAL
:: ==============================================================================

popd
cls
echo ===============================================================================
echo                     GENERACION COMPLETADA CON EXITO
echo ===============================================================================
echo.
echo  Proyecto: %PROJECT_NAME%
echo  Ubicacion: %CD%\%PROJECT_NAME%\
echo.
echo  Estructura generada:
echo.
echo    %PROJECT_NAME%/
echo    +-- README.md              ^(Documentacion del proyecto^)
echo    +-- AGENTS.md              ^(Configuracion para opencode^)
echo    +-- AIBF-COMPLETE.md       ^(Contexto del framework^)
echo    +-- .gitignore
echo    +-- docs/
echo    ^|   +-- AIBF-GUIA-USO.md   ^(Guia de uso^)
echo    +-- .opencode/
echo        +-- agents/            ^(%AGENT_COUNT% agentes activos^)
echo        +-- core/              ^(Bootstrap y discovery^)
echo        +-- workflow/          ^(Workflow y orquestador^)
echo        +-- memory/            ^(Memoria persistente^)
echo        +-- knowledge/         ^(Conocimiento del dominio^)
echo        +-- templates/         ^(Plantillas ADR, API, etc.^)
echo        +-- prompts/           ^(Prompts reutilizables^)
echo        +-- technology/        ^(Guias tecnologicas^)
echo        +-- specialists/       ^(Especialistas por stack^)
echo        +-- skills/            ^(Skills base + expertas^)
echo        +-- engineering/       ^(Playbook de ingenieria^)
echo        +-- governance/        ^(Politicas de gobierno^)
echo        +-- quality/           ^(Calidad y auditoria^)
echo        +-- engine/            ^(Motores de tokens y memoria^)
echo        +-- playbooks/         ^(Playbooks enterprise^)
echo        +-- rules/             ^(Reglas de generacion^)
echo.
echo  TOTAL: Directorio con inteligencia IA completa para tu proyecto.
echo.
echo ===============================================================================
echo  PROXIMOS PASOS:
echo ===============================================================================
echo.
echo  1. cd %PROJECT_NAME%
echo  2. opencode
echo  3. Escribe: "Inicia este proyecto con AIBF"
echo.
echo  El asistente ejecutara el workflow de 12 fases:
echo  Bootstrap ^> Discovery ^> Deep Analysis ^> Business ^> Questions
echo  ^> Summary ^> Approval ^> Planning ^> Execution ^> Validation
echo  ^> Documentation ^> Memory Update
echo.
echo ===============================================================================
echo.
echo  Presiona ENTER para salir...
pause >nul 2>&1

goto :EOF

:: ==============================================================================
:: SUBRUTINA: Crear guia tecnologica
:: ==============================================================================
:create_guide
set "CATEGORY=%~1"
set "TOPIC=%~2"
set "TITLE=%~3"
(
echo # %CATEGORY% - %TOPIC%
echo.
echo ## Objetivo
echo Buenas practicas para %TITLE%.
echo.
echo ## Checklist
echo - Mantener consistencia con el stack (%CATEGORY%)
echo - Evitar duplicacion de codigo
echo - Optimizar rendimiento
echo - Documentar decisiones tecnicas
echo - Generar pruebas cuando corresponda
echo.
echo ## Cuando cargar
echo Solo si el proyecto utiliza %CATEGORY% (%TOPIC%).
) > ".opencode\technology\%CATEGORY%\%TOPIC%\GUIDE.md"
goto :EOF
