// vite.config.js
import { defineConfig } from 'vite';
import { babel } from '@rollup/plugin-babel';
import { resolve, dirname } from 'node:path';

export default defineConfig({
  plugins: [babel({ babelHelpers: 'bundled' })],

  server: {
    port: 5000,
  },
  extensions: ['.js'],
  // resolve: {
  //   alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  // },
});
