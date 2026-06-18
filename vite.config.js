import { defineConfig } from 'vite';
import nunjucks from 'vite-plugin-nunjucks';
import fs from 'fs';
import path from 'path';

// Recursively find all HTML files to construct rollup input entrypoints
function getHtmlInputs(dir, fileList = {}) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === 'dist' || file.startsWith('.')) continue;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlInputs(filePath, fileList);
    } else if (file.endsWith('.html')) {
      const relativePath = path.relative(process.cwd(), filePath);
      const name = relativePath.replace(/\.html$/, '').replace(/\\/g, '_').replace(/\//g, '_');
      fileList[name] = filePath;
    }
  }
  return fileList;
}

const htmlInputs = getHtmlInputs(process.cwd());

export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/template/' : '/',
    plugins: [
      nunjucks({
        templatesDir: './src'
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['import']
        }
      }
    },
    build: {
      rollupOptions: {
        input: htmlInputs,
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'css/main.css';
            }
            return 'assets/[name]-[hash][extname]';
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
        }
      }
    }
  };
});
