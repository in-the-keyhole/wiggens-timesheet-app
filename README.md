# Wiggens Timesheet Application

A full‑stack timesheet system built per Agents.md:
- Backend: Spring Boot 3, Spring Data JPA, H2 (dev) / PostgreSQL (prod), Maven
- Frontend: React (Vite + TypeScript) with MUI
- Testing: JUnit 5 + Spring Boot Test (backend), Vitest + React Testing Library (frontend)

## Project Structure
- `api/` Spring Boot backend (Maven)
- `ui/` React frontend (Vite + TypeScript)

## Prerequisites
- Java 17+
- Maven (`mvn` on PATH)
- Node.js 18+

## Backend
- Run: `cd api && mvn spring-boot:run`
- Test: `cd api && mvn test`
- Build: `cd api && mvn clean package`

H2 console available at `http://localhost:8080/h2-console` (dev profile).

### REST Endpoints
All endpoints are under base path `codex-example/api/v1/`.
- `POST /codex-example/api/v1/employees` — create employee
- `GET  /codex-example/api/v1/employees` — list employees (optional `?q=` search by first/last name)
- `GET  /codex-example/api/v1/employees/{id}` — get one employee
- `PUT  /codex-example/api/v1/employees/{id}` — update employee
- `DELETE /codex-example/api/v1/employees/{id}` — delete employee
- `POST /codex-example/api/v1/timesheets` — create/update weekly timesheet
- `GET  /codex-example/api/v1/timesheets/employee/{employeeId}?weekStart=YYYY-MM-DD` — fetch weekly timesheet

## Frontend
- Install: `cd ui && npm install`
- Dev server: `cd ui && npm run dev` (http://localhost:5173)
- Test: `cd ui && npm test` (uses `vitest run`)
- Build: `cd ui && npm run build`

Set `VITE_API_BASE_URL` to override API base (defaults to `http://localhost:8080/codex-example/api/v1`).

### Screens
- Dashboard (Home): `/` — shows total Employees and Timesheets
- Timesheet: `/timesheet`
- Reports: `/reports`
- Employees: `/employees` (browse, add, edit, delete, search)

## Notes
- Layered architecture followed: Controller → Service → Repository.
- DTOs used for all requests/responses; entities not exposed.
- Validation with Jakarta Bean Validation.
- UI uses functional components, hooks, and MUI.

## GitHub Issues Loop
The implementation follows `PROMPT.md`: work one `wiggens:` issue per iteration, commit with conventional messages, and run tests before closing. A PAT is required to close issues via the GitHub API.
