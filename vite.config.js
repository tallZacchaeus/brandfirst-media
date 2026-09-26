import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false },
  // The build-time prerender (vite build --ssr src/entry-server.jsx) runs the
  // app in Node. These are bundled into the server build rather than left as
  // external imports, because Node's ESM loader cannot take them as they are:
  // GSAP's subpath imports ("gsap/ScrollTrigger") have no extension to resolve,
  // and react-helmet-async is CommonJS with no named exports for Node to find.
  ssr: { noExternal: ['gsap', 'lenis', 'react-helmet-async'] },
});
