# Wiggens Timesheet API

Spring Boot 3 service exposing REST endpoints under `/codex-example/api/v1/`.

## Tech
- Spring Boot 3, Spring Data JPA
- H2 (dev) / PostgreSQL (prod)
- Maven, Lombok, Jakarta Bean Validation
- Tests: JUnit 5 + Spring Boot Test

## Run
```
cd api && mvn spring-boot:run
```
- Port: `8080` (configurable via `SERVER_PORT`)
- Profiles: `dev` (default, H2), `prod` (PostgreSQL)

## Test
```
cd api && mvn test
```

## Build
```
cd api && mvn clean package
```
Produces `target/timesheet-api-<version>.jar`.

## Configuration
- `SPRING_PROFILES_ACTIVE` — `dev` or `prod`
- Dev (H2): no extra config required
- Prod (PostgreSQL):
  - `SPRING_DATASOURCE_URL` (e.g. `jdbc:postgresql://localhost:5432/wiggens`)
  - `SPRING_DATASOURCE_USERNAME`
  - `SPRING_DATASOURCE_PASSWORD`

## Conventions
- Layered: Controller → Service → Repository
- DTOs for all requests/responses (no entities exposed)
- Validate inputs with Bean Validation annotations

