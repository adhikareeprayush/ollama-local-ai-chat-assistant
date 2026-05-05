import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const proxyTarget = (env.VITE_DEV_PROXY_TARGET || 'http://127.0.0.1:5000').replace(/\/$/, '');

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          // Long LLM responses — default proxy timeouts can cause "socket hang up"
          timeout: 1_800_000,
          proxyTimeout: 1_800_000,
        },
      },
    },
  };
});
