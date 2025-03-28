import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/EmployWise/', // Must match exactly (case-sensitive)
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})