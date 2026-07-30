import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite-react-ssg reads this route config from src/main.jsx and prerenders
  // every static route to HTML at build time (npm run build).
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // Ensures per-route <Head> meta is written into each served .html file.
    crittersOptions: false,
  },
})
