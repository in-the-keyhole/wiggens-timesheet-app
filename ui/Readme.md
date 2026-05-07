# Wiggens Timesheet UI

React + Vite + TypeScript frontend using MUI and Axios.

## Install
```
cd ui && npm install
```

## Dev
```
cd ui && npm run dev
```
- Dev server on `http://localhost:5173`
- Proxies API requests to backend

## Test
```
cd ui && npm test
```
Uses `vitest run` + React Testing Library.

## Build
```
cd ui && npm run build
```
Outputs to `ui/dist/`.

## Env Vars
- `VITE_DEV_PORT` (default `5173`)
- `VITE_API_PREFIX` (default `/codex-example/api`)
- `VITE_API_PROXY_TARGET` (default `http://localhost:8080`)
- `VITE_API_BASE_URL` (default `/codex-example/api/v1`)

## Conventions
- Functional components with hooks
- Colocate files per component page: `ComponentName/index.tsx`, `ComponentName/ComponentName.test.tsx`
- Shared Axios client in `src/codex-example/api/client.ts`

