import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/scss/variables.scss" as *;'
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: true
      },
      dirs: ['./src/hooks/**', './src/store/**'],
      vueTemplate: true
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        }),
        (componentName) => {
          if (componentName.startsWith('FontAwesomeIcon')) {
            return { name: componentName, from: '@fortawesome/vue-fontawesome' }
          }
        }
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  server: {
    port: 3000,
    host: true
  }
})
