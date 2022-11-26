import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      workbox: {
        cacheId: 'key', //缓存名称
        runtimeCaching: [
          {
            urlPattern: /.*\.js.*/, //缓存文件
            handler: 'StaleWhileRevalidate', //重新验证时失效
            options: {
              cacheName: 'XiaoMan-js', //缓存js，名称
              expiration: {
                maxEntries: 30, //缓存文件数量 LRU算法
                maxAgeSeconds: 30 * 24 * 60 * 60 //缓存有效期
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true, //css 拆分
    sourcemap: false, //不生成sourcemap
    minify: 'terser', //是否禁用最小化混淆，esbuild打包速度最快，terser打包体积最小。
    assetsInlineLimit: 5000 //小于该值 图片将打包成Base64
  }
})
