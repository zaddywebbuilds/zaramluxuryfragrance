import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  plugins: [react()],
  base,
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('@supabase')) return 'supabase'
          if (id.includes('react-dom') || id.includes('react-router')) return 'vendor'
        },
      },
    },
  },
})
