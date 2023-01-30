import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "./src/classes/ColorTemperature.ts"),
      name: "MyLib",
      // the proper extensions will be added
      fileName: "my-lib",
    },

    // cssCodeSplit:false
    outDir: "./dist",
    assetsDir: "example",
  },
});
