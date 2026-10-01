import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        home: resolve(process.cwd(), 'index.html'),
        systems: resolve(process.cwd(), 'systems/index.html'),
        work: resolve(process.cwd(), 'work/index.html'),
        lab: resolve(process.cwd(), 'lab/index.html'),
        contact: resolve(process.cwd(), 'contact/index.html'),
      },
    },
  },
})
