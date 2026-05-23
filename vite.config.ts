import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
    alias: [
      {
        find: /^.*\.(jpg|jpeg|png|webp|gif|svg)$/,
        replacement: path.resolve(__dirname, './src/test/mocks/fileMock.ts'),
      },
    ],
  },
})
