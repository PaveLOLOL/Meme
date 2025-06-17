import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Упрощает импорты (если юзаем функции пакетов автоматом стягивает их)
import AutoImport from 'unplugin-auto-import/vite'

// Импорт плагина для автоматического импорта Vue-компонентов (например, компонентов Element Plus)
import Components from 'unplugin-vue-components/vite'

// Импорт резолвера, который знает, как автоматически подключать компоненты Element Plus
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Функция, которая говорит Vue, какие теги считать кастомными элементами (Web Components)
          // В данном случае — все теги, в имени которых есть 'media-'
          isCustomElement: (tag) => tag.includes('media-'),
        }
      }
    }),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router'], // автоматически импортировать функции из vue и vue-router
      dts: 'src/auto-imports.d.ts', // генерировать декларации типов (для TS)
      resolvers: [ElementPlusResolver()], // Резолвер указывает, из какой библиотеки импортировать функции (например, ElMessage, ElLoading)
    }),
    Components({
      resolvers: [ElementPlusResolver()], // Резолвер для автоподключения компонентов Element Plus по мере их использования в шаблоне
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.190.30', // dev
        changeOrigin: true,
        secure: false,
      },
    },
    open: true,
  }
})
