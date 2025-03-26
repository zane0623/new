import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@chakra-ui/react',
            '@emotion/react',
            '@emotion/styled',
            'framer-motion'
          ],
          // Split features by route
          admin: [
            './src/pages/admin/Dashboard.jsx',
            './src/pages/admin/UserManagement.jsx',
            './src/pages/admin/SystemSettings.jsx'
          ],
          student: [
            './src/pages/student/Dashboard.jsx',
            './src/pages/student/ExamSimulation.jsx',
            './src/pages/student/Results.jsx',
            './src/pages/student/Profile.jsx'
          ],
          parent: [
            './src/pages/parent/Dashboard.jsx',
            './src/pages/parent/Profile.jsx',
            './src/pages/parent/StudentProgress.jsx'
          ],
          auth: [
            './src/pages/auth/Login.jsx',
            './src/pages/auth/Register.jsx',
            './src/pages/auth/ForgotPassword.jsx'
          ]
        }
      }
    }
  },
}); 