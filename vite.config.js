import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePluginCopy } from "vite-plugin-copy2";

export default defineConfig({
  plugins: [
    react(),

    // Add the vite-plugin-copy2 plugin to handle file copying
    VitePluginCopy({
      // Define the file copying targets
      targets: [
        {
          src: "public/_redirects", // Specify the source file (_redirects) in the public folder
          dest: "dist", // Specify the destination folder (dist) for the copied file
        },
      ],
      // Set the hook to run the copy process during the 'writeBundle' phase
      hook: "writeBundle",
    }),
  ],
});
