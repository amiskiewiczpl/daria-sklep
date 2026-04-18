import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

const monorepoRoot = fileURLToPath(new URL('../..', import.meta.url))
const appRoot = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, appRoot, '')

  return {
    root: appRoot,
    envDir: appRoot,
    plugins: [react()],
    base: env.VITE_ADMIN_BASE_PATH || '/',
    resolve: {
      alias: {
        '@rosna/shared': path.resolve(monorepoRoot, 'packages/shared/src/index.ts'),
      },
    },
    build: {
      outDir: 'dist',
    },
  }
})
