import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/boneshatter-hp-simulator/', // 👈 This is required for githug pages deployment
  plugins: [react()],
})
