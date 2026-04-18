import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const monorepoRoot = fileURLToPath(new URL('../..', import.meta.url))
const appRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: appRoot,
  plugins: [react()],
  base: '/daria-sklep/',
  resolve: {
    alias: {
      '@rosna/shared': path.resolve(monorepoRoot, 'packages/shared/src/index.ts'),
    },
  },
  build: {
    outDir: 'dist',
  },
})
