import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled']
  },
  server: {
    port: 5173
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
})
