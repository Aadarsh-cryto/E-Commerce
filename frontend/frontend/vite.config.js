import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  
  // 🌟 Server block plugins ke bahar, main level par ekdum mast set hai
  server: {
    historyApiFallback: true, 
    port: 5173 
  }
})