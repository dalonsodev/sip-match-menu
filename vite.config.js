import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSvgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [
      react(),
      vitePluginSvgr()
    ],
    server: {
      host: '0.0.0.0', // ← This allows for external connections
      port: 5173,
    },
    esbuild: {
      drop: command === 'build' ? ['console', 'debugger'] : []
    }
  })
)
