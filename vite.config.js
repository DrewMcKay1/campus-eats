import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'campus-eats' to your actual GitHub repository name
const REPO_NAME = 'campus-eats'

export default defineConfig({
  plugins: [react()],
  // When hosting on GitHub Pages, the site lives at:
  // https://yourusername.github.io/campus-eats/
  // So the base path must match your repo name.
  // If you use a custom domain via Cloudflare, change this to '/'
  base: process.env.CUSTOM_DOMAIN ? '/' : `/${REPO_NAME}/`,
})
