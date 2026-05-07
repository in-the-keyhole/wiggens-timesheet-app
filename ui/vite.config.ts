import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const devPort = Number(env.VITE_DEV_PORT || 5173)
  const apiPrefix = env.VITE_API_PREFIX || '/codex-example/api'
  const apiTarget = env.VITE_API_PROXY_TARGET || 'http://localhost:8080'

  return {
    plugins: [react()],
    server: {
      port: devPort,
      proxy: {
        [apiPrefix]: {
          target: apiTarget,
          changeOrigin: true
        }
      }
    },
    test: {
      environment: 'jsdom'
    }
  }
})
