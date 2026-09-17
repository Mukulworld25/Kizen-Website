import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: '/' serves assets from domain root so nested routes (/institutions/*)
// load scripts correctly on direct hard reloads.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
})