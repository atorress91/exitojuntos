import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.bin', '**/*-shard*'],
  server: {
    fs: {
      // Allow serving files from assets/models
      allow: ['..'],
    },
  },
  optimizeDeps: {
    exclude: ['face-api.js'],
  },
});
