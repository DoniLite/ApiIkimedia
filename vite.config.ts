// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import fastify from 'vite-plugin-fastify';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  plugins: [
    fastify({
      appPath: './src/app.ts', // Default: <rootDir>/src/app.ts
      serverPath: './src/server.ts', // Default: <rootDir>/src/server.ts
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
});