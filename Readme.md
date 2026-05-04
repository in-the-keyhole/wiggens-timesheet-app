# Wiggens Timesheet App

Monorepo containing:
- `api/` Spring Boot 3 backend (H2 for dev, PostgreSQL for prod)
- `ui/` React + Vite + TypeScript frontend (MUI)

## Quickstart

Backend:
- `cd api`
- `mvn spring-boot:run` (starts on port 8080)
- REST base path: `/codex-example/api/v1`

Frontend:
- `cd ui`
- `npm install`
- `npm run dev` (starts on port 5173)

## Endpoints
- `GET /codex-example/api/v1/metrics` — employee and timesheet counts
- `GET /codex-example/api/v1/employees` — list employees (seeded Jane/John Doe)
- `POST /codex-example/api/v1/timesheets` — submit weekly timesheet
- `GET /codex-example/api/v1/reports/weekly?weekStart=YYYY-MM-DD` — weekly hours per employee

Example `POST /timesheets` body:
```
{
  "employeeId": 1,
  "weekStart": "2026-05-04",
  "mon": 8, "tue": 8, "wed": 8, "thu": 8, "fri": 8, "sat": 0, "sun": 0
}
```

## Tests
- Backend: `cd api && mvn test`
- Frontend: `cd ui && npm test` (uses `vitest run`)

## Build
- Backend: `cd api && mvn clean package`
- Frontend: `cd ui && npm run build`

## Notes
- H2 console at `/h2-console` when running locally.
- Entities are not exposed directly; DTOs are used.
- Validation via Jakarta Bean Validation on request DTOs.
