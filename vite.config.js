import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "climate-mind",
    project: "frontend-web"
  })],
  base: './',
  build: {
    outDir: 'build',
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'features': path.resolve(__dirname, 'src/features'),
      'types': path.resolve(__dirname, 'src/types'),
      'shared': path.resolve(__dirname, 'src/shared'),
      'router': path.resolve(__dirname, 'src/router'),
      'services': path.resolve(__dirname, 'src/services'),
      'store': path.resolve(__dirname, 'src/store'),
      'helpers': path.resolve(__dirname, 'src/helpers'),
      'App': path.resolve(__dirname, 'src/App.tsx'),
    },
  },
});