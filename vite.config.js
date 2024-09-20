import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0',  // Allows access from external IPs
        // port: 8081,       // Default port for Vite, adjust if needed
        hmr: {
            host:'192.168.14.70',
        }
    }
});
