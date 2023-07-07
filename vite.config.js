import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
      lib: {
        entry: resolve(__dirname, "src/index.js"),
        name: "vue-json-component-vue-3",
        fileName: (format) => `${format}.js`,
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue"
          }
        }
      }
  },
  plugins: [vue()],
})
