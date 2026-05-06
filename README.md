# Wiggens Timesheet App

Monorepo containing a Spring Boot API and React UI for a simple employee timesheet system.

## Project Structure
- `api/` Spring Boot 3 + Spring Data JPA (H2 dev / PostgreSQL prod)
- `ui/` React + TypeScript + Vite + MUI

## Backend (api/)
- Run: `cd api && mvn spring-boot:run` (port 8080)
- Test: `cd api && mvn test`
- Build: `cd api && mvn clean package`
- Base API path: `/codex-example/api/v1`

Key endpoints:
- `GET /codex-example/api/v1/metrics`
- `GET /codex-example/api/v1/employees`
- `POST /codex-example/api/v1/employees`
- `PUT /codex-example/api/v1/employees/{id}`
- `DELETE /codex-example/api/v1/employees/{id}`
- `GET /codex-example/api/v1/timesheets?weekStart=YYYY-MM-DD`
- `POST /codex-example/api/v1/timesheets`
- `GET /codex-example/api/v1/reports/weekly-hours?weekStart=YYYY-MM-DD`

Seed data: Jane Doe and John Doe are inserted at startup.

## Frontend (ui/)
- Install: `cd ui && npm install`
- Dev server: `cd ui && npm run dev` (port 5173)
- Test: `cd ui && npm test` (uses `vitest run`)
- Build: `cd ui && npm run build`

The dev server proxies API calls under `/codex-example/api/v1` to `http://localhost:8080`.

UI notes:
- Persistent left sidebar navigation (MUI Drawer)
- Inline add/edit employee form (no popup dialogs)
- Subtle custom theme (indigo/teal) with gradient AppBar
- Smooth route fades and animated Add/Edit Employee form
- Snackbar feedback for saving timesheets

## Development Notes
- Backend follows layered architecture (Controller -> Service -> Repository)
- DTOs are used for requests/responses; JPA entities are not exposed
- Validation with Jakarta Bean Validation
- Basic integration test included for employee controller
- Frontend uses functional components, hooks, and MUI; backend calls via a shared Axios client (`ui/src/codex-example/api/client.ts`)

## Git
- Commit: `git commit -m "feat: ..."`
- Push: `git push`
