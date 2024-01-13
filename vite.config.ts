import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      src: '/src',
      features: '/src/features',
      shared: '/src/shared',
    },
  },
  server: {
    port: 3000,
  },
});
