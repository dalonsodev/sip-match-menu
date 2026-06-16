import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [react()],
    server: {
      host: '0.0.0.0', // ← This allows for external connections
      port: 5173,
    },
    esbuild: {
      drop: command === 'build' ? ['console', 'debugger'] : []
    }
  })
)
