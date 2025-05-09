import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
    build: {
        outDir: 'build',
    },
=======
>>>>>>> refs/remotes/origin/main
    base: '/todo/',
    plugins: [react()],
});
