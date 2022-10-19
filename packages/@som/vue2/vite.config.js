import { defineConfig } from 'vite'
export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi']
  }
})
