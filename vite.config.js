import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'ngscorecard-api',
      async configureServer(server) {
        const { createApiRouter } = await import('./server/api.js')
        server.middlewares.use('/api', createApiRouter())
      },
    },
  ],
})
