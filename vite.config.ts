import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    'process.env': process.env
  },
  server: {
    host: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    },
    allowedHosts: [
      'localhost',
      '.ngrok-free.app',
      '0c26-103-194-158-69.ngrok-free.app'
    ],
    fs: {
      allow: [
        // Allow serving files from project root
        path.resolve(__dirname, '.'),
        // Allow serving files from src directory
        path.resolve(__dirname, './src'),
        // Allow serving files from public directory
        path.resolve(__dirname, './public')
      ]
    }
  }
})
