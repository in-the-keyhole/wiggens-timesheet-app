import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled']
  },
  resolve: {
    alias: {
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled'),
    },
    dedupe: ['@emotion/react', '@emotion/styled', '@mui/material']
  },
  server: {
    port: 5173
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
})
