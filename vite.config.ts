import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Plugin React pour la compatibilité JSX/TSX
  base: '/', // Base URL pour Vercel (déploiement à la racine)
  optimizeDeps: {
    exclude: ['lucide-react'], // Exclut lucide-react de l'optimisation des dépendances (évite les erreurs de build)
  },
  // Ajoute cette section si tu utilises des assets statiques (ex: images, fonts)
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],
});
