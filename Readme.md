# Wiggens Timesheet Application

Monorepo containing a Spring Boot backend (`api/`) and a React (Vite + TypeScript) frontend (`ui/`).

## Tech Stack
- Backend: Spring Boot 3, Spring Data JPA, H2 (dev) / PostgreSQL (prod), Maven, Lombok
- Frontend: React 18, Vite, TypeScript, MUI, Axios, React Router
- Testing: JUnit 5 + Spring Boot Test (backend), Vitest + Testing Library (frontend)

## Project Structure
```
wiggens-timesheet-app/
  api/          # Spring Boot backend (Maven)
  ui/           # React frontend (Vite + TypeScript)
  Agents.md
  PROMPT.md
  Readme.md
```

## Quick Start
- Backend
  - Run: `cd api && mvn spring-boot:run`
  - Test: `cd api && mvn test`
  - Build: `cd api && mvn clean package`
- Frontend
  - Install: `cd ui && npm install`
  - Dev: `cd ui && npm run dev`
  - Test: `cd ui && npm test` (uses `vitest run`)
  - Build: `cd ui && npm run build`

## Backend

### Run
```
cd api && mvn spring-boot:run
```
API runs on `http://localhost:8080` with base path `/codex-example/api/v1`.

Configuration is externalized via environment variables:
- `SPRING_PROFILES_ACTIVE` (default `dev`) — `dev` uses in-memory H2; `prod` uses PostgreSQL
- `SERVER_PORT` (default `8080`) — server port
- For `prod` profile: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`

### Build & Test
```
cd api && mvn test
cd api && mvn clean package
```

### Notable Endpoints
- `GET /codex-example/api/v1/metrics` — employee and timesheet counts
- `GET /codex-example/api/v1/employees` — list employees
- `POST /codex-example/api/v1/employees` — create employee
- `POST /codex-example/api/v1/timesheets` — submit timesheet
  - Body: `employeeId`, `weekStart` (YYYY-MM-DD), `status`=`OPEN|CLOSED`, `entries[]`
  - Each entry: `dayOfWeek`=`MONDAY..FRIDAY`, `hours` (0-24), optional `notes` (up to 1000 chars)
- `GET /codex-example/api/v1/reports/weekly-hours?weekStart=YYYY-MM-DD` — hours by employee
- `GET /codex-example/api/v1/status/inactive?weekStart=YYYY-MM-DD` — employees with no hours for the week

Seed data creates Jane and John Doe employees on startup.

## Frontend

### Install
```
cd ui && npm install
```

### Dev Server
```
cd ui && npm run dev
```
Runs on `http://localhost:5173` and proxies `/codex-example/api` to the backend.

Frontend configuration is externalized via Vite env vars (see `ui/.env.example`):
- `VITE_DEV_PORT` (default `5173`) — Vite dev server port
- `VITE_API_PREFIX` (default `/codex-example/api`) — proxy context path for API
- `VITE_API_PROXY_TARGET` (default `http://localhost:8080`) — backend base URL for dev proxy
- `VITE_API_BASE_URL` (default `/codex-example/api/v1`) — Axios client base URL

New pages:
- Status: shows employees who have not input hours for the selected week.

### Tests
```
cd ui && npm test
```

### Build
```
cd ui && npm run build
```

## Conventions
- Backend layered architecture: Controller -> Service -> Repository
- REST base path: `/codex-example/api/v1/`
- DTOs for request/response, validation via Jakarta Bean Validation
- Minimal integration tests provided; extend as features grow

## Recent Changes
- Added daily notes to timesheet entries (backend + UI). Notes are persisted and returned by the API and can be entered for each weekday in the Timesheets page.
