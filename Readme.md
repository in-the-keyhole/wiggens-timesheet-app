# Wiggens Timesheet App

Monorepo with Spring Boot backend (`api/`) and React + Vite + TypeScript frontend (`ui/`). Follows conventions in `Agents.md`.

## Structure
- `api/` Spring Boot 3, Spring Data JPA, H2 (dev) / PostgreSQL (prod)
- `ui/` React + Vite + TS + MUI, Vitest for tests

## Backend
- Base URL: `/codex-example/api/v1`
- Endpoints:
  - `GET /metrics` — counts of employees and timesheets
  - `GET /employees`, `GET /employees/{id}`, `POST /employees`, `PUT /employees/{id}`, `DELETE /employees/{id}`
  - `POST /timesheets` — submit weekly entries
  - `GET /reports?weekStart=YYYY-MM-DD` — summaries by employee for the week
- Seed data: Jane Doe, John Doe

### Run
```
cd api
mvn spring-boot:run
```

### Test
```
cd api
mvn test
```

### Build
```
cd api
mvn clean package
```

## Frontend
### Setup
```
cd ui
npm install
```

### Dev
```
cd ui
npm run dev
```
- Proxies API to `http://localhost:8080/codex-example/api/v1`

### Test
```
cd ui
npm test
```

### Build
```
cd ui
npm run build
```

## Notes
- Use `mvn` (not `./mvnw`) per Agents.md.
- Commit using conventional messages and close GitHub issues with PAT when pushing.
