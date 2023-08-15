import { defineConfig } from 'tailwindcss-patch'
import { resolve } from 'path'
export default defineConfig({
  patch: {
    tailwindcss: {
      config: resolve(__dirname, './tailwind.config.ts')
    }
  }
})
