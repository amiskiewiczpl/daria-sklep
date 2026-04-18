import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const monorepoRoot = fileURLToPath(new URL('../..', import.meta.url))
const appRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: appRoot,
  plugins: [react()],
  resolve: {
    alias: {
      '@rosna/shared': path.resolve(monorepoRoot, 'packages/shared/src/index.ts'),
    },
  },
  build: {
    outDir: 'dist',
  },
})
