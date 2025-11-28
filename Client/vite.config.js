import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'suppress-source-map-404',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.includes('.map')) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ version: 3, sources: [], mappings: '' }));
          } else {
            next();
          }
        });
      },
    },
  ],

  // Disable sourcemaps from build
  build: {
    sourcemap: false,
  },

  // Disable sourcemaps during dev mode (Vite 5+)
  css: {
    devSourcemap: false,
  },

  // Prevent Vite from trying to resolve .map files
  optimizeDeps: {
    esbuildOptions: {
      sourcemap: false,
    },
  },
})
