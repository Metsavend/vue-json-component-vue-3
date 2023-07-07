import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // src/indext.ts is where we have exported the component(s)
      entry: resolve(__dirname, "src/index.js"),
      name: "vue-json-component-vue-3",
      // the name of the output files when the build is run
      fileName: "library",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          Vue: "vue",
        },
      },
    },
  },
  plugins: [vue()]
});