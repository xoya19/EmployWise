import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/EmployWise/', // 👈 Add this line
  plugins: [react()],
});
