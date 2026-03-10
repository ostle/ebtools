import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Para GitHub Pages: si el repo es 'catalogo-industrial', usa base: '/catalogo-industrial/'
export default defineConfig({
  plugins: [react()],
  base: "./",
})
