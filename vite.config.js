import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' keeps the built bundle fully relative so the static dist/
// folder can be dropped anywhere (subfolder, subdomain, Hostinger public_html).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})