import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LunaComponentsLibrary',
      formats: ['es'],
      fileName: () => `luna-components-library.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        format: 'es',
        exports: 'named',
        manualChunks: undefined,
      },
    },
    target: 'esnext',
    sourcemap: true,
    minify: false,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
