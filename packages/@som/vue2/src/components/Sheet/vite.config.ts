import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
import { createVuePlugin } from 'vite-plugin-vue2'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin({
      jsx: true
    }),
    dts({
      outputDir: 'types',
      staticImport: true,
      insertTypesEntry: true,
      logDiagnostics: true
    })
  ],
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, './src/')
  //   }
  // },
  build: {
    lib: {
      entry: resolve(__dirname, './exports.ts'),
      name: 'vue-dom-sheet',
      // the proper extensions will be added
      fileName: 'vue-dom-sheet'
    },

    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        dir: resolve(__dirname, 'dist'),
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
