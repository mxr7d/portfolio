import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import fs from 'fs';

// Automatically detect where your actual source code folder is hiding
const getSrcPath = () => {
  if (fs.existsSync('./src')) return './src';
  if (fs.existsSync('./Src')) return './Src';
  if (fs.existsSync('./Portfolio-Website-main/src')) return './Portfolio-Website-main/src';
  return './src'; // Fallback
};

const srcPath = getSrcPath();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(srcPath, import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
