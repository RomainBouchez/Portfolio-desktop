'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrientationWarning() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth < 768; // Mobile et petites tablettes
      const isPortrait = window.innerHeight > window.innerWidth;

      // Afficher l'avertissement si mobile ET en mode portrait
      setShowWarning(isMobile && isPortrait);
    };

    // Vérifier au chargement
    checkOrientation();

    // Vérifier lors du redimensionnement/rotation
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          style={{ pointerEvents: 'none' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl"
          >
            {/* Icône rotation téléphone */}
            <div className="mb-6 flex justify-center">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-500"
              >
                {/* Téléphone horizontal */}
                <rect
                  x="10"
                  y="25"
                  width="60"
                  height="30"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
                <circle cx="62" cy="40" r="2" fill="currentColor" />
                <path
                  d="M15 30 L15 50"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Flèche de rotation */}
                <path
                  d="M 40 10 Q 50 5, 60 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 60 10 L 55 8 M 60 10 L 58 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Mode Paysage Recommandé
            </h2>
            <p className="text-gray-600 mb-2">
              Pour une meilleure expérience, veuillez passer votre appareil en mode paysage.
            </p>
            <p className="text-sm text-gray-500">
              Les fenêtres de projet s'affichent mieux horizontalement.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
