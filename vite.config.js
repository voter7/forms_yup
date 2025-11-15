import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isDev = mode !== 'production';

  const basePath = isDev ? '/' : '/forms/';

  return {
    base: basePath,
    cssCodeSplit: true,
    plugins: [
      react({
        babel: {
          plugins: isDev ? ['check-prop-types'] : [],
        },
      }),
    ],
  };
});
