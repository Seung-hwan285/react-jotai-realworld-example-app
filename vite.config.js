// vite.config.js
import { defineConfig } from 'vite';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [babel({ babelHelpers: 'bundled' })],
  server: {
    port: 5000,
  },
});
