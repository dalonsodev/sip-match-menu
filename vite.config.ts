import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ← This allows for external connections
    port: 5173
  },
  esbuild: {
    drop: command === 'build' ? ['console', 'debugger'] : []
  }
}))
