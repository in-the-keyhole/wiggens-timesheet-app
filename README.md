## Wiggens Timesheet Application

A simple timesheet system with a Spring Boot backend and a React (Vite + TypeScript) frontend.

## Tech Stack
- Backend: Spring Boot 3, Spring Data JPA, H2 (dev) / PostgreSQL (prod), Maven
- Frontend: React + Vite + TypeScript, MUI
- Testing: JUnit 5 + Spring Boot Test (backend), Vitest + React Testing Library (frontend)

## Project Structure
```
ralph-timesheet/
  api/          # Spring Boot backend (Maven project)
  ui/           # React frontend (Vite + TypeScript)
  Agents.md     # Project instructions
  PROMPT.md     # Ralph loop prompt
```

## Backend

### Run
```
cd api && mvn spring-boot:run
```
- Starts on `http://localhost:8080`
- API base path: `/codex-example/api/v1`

### Build & Test
```
cd api && mvn test
cd api && mvn clean package
```

### Notable Endpoints
- `GET /codex-example/api/v1/metrics` — counts of employees and timesheets
- `GET /codex-example/api/v1/employees` — list employees
- `POST /codex-example/api/v1/employees` — create employee
- `PUT /codex-example/api/v1/employees/{id}` — update employee
- `DELETE /codex-example/api/v1/employees/{id}` — delete employee
- `POST /codex-example/api/v1/timesheets` — create or update weekly timesheet
- `GET /codex-example/api/v1/employees/{employeeId}/timesheets` — timesheets for an employee
- `GET /codex-example/api/v1/reports/week?weekStart=YYYY-MM-DD` — totals by employee for a week

### Dev Database
- Uses in‑memory H2 by default; H2 console enabled.

## Frontend

### Setup
```
cd ui && npm install
```

### Run Dev Server
```
cd ui && npm run dev
```
- Opens on `http://localhost:5173`
- Expects API at `http://localhost:8080/codex-example/api/v1`
- Override via `VITE_API_URL`

### Test & Build
```
cd ui && npm test
cd ui && npm run build
```

## Seed Data
On first run, the backend seeds two employees:
- Jane Doe (jane.doe@example.com)
- John Doe (john.doe@example.com)

## Development Notes
- Layered architecture: Controller → Service → Repository
- DTOs for request/response; JPA entities are not exposed
- Validation via Jakarta Bean Validation
- Basic controller integration tests with Spring Boot Test + MockMvc
- Frontend uses MUI and colocated components/tests

## Git
- Use conventional commits and push to `origin/main`

