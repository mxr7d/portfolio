import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import fs from 'fs';

const getSrcPath = () => {
  if (fs.existsSync('./src')) return './src';
  if (fs.existsSync('./Src')) return './Src';
  if (fs.existsSync('./Portfolio-Website-main/src')) return './Portfolio-Website-main/src';
  return './src';
};

const srcPath = getSrcPath();

export default defineConfig({
  plugins: [react()],
  // Add this line below to fix the blank page issue:
  base: '/portfolio/', 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(srcPath, import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
