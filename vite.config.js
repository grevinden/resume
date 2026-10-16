import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// Base path for sub-path deployments (GitHub Pages: user.github.io/<repo>/).
// Local:            npm run build          → base '/'
// GitHub Pages:     BASE_PATH=/<login>/<repo> npm run build
// (the CI workflow in .github/ sets it automatically)
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [preact()],
})
