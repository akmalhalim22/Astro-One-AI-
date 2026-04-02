import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    build({
      // Exclude static assets from worker routing so Cloudflare Pages serves them directly
      staticPaths: ['/static/*', '/favicon.svg', '/favicon.ico', '/*.png', '/*.jpg', '/*.css', '/*.js'],
    }),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
})
