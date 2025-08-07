// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vite.dev/config/
// export default defineConfig({
// 	plugins: [react()],
// 	resolve: {
// 		alias: {
// 			'@': '/src',
// 			'~': '/src/pages/dashboard',
// 		},
// 	},
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '~': '/src/pages/dashboard',
    },
  },
  server: {
    host: true, // agar bisa diakses dari jaringan publik seperti ngrok
    port: 5173, // sesuaikan dengan port yang kamu jalankan
    allowedHosts: ['4cb9ceab2887.ngrok-free.app'], // ganti dengan host ngrok kamu sekarang
  },
});