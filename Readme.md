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

## Backend

### Run
```
cd api && mvn spring-boot:run
```
API runs on http://localhost:8080 with base path `/codex-example/api/v1`.

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
- `GET /codex-example/api/v1/reports/weekly-hours?weekStart=YYYY-MM-DD` — hours by employee

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
Runs on http://localhost:5173 and proxies `/codex-example/api` to the backend.

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

