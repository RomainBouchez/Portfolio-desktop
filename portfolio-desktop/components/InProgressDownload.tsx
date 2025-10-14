'use client';

import { motion } from 'framer-motion';
import { Project } from '@/lib/projects';

interface InProgressDownloadProps {
  project: Project;
}

export default function InProgressDownload({ project }: InProgressDownloadProps) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  // On veut s'arrêter à 75%, donc l'offset restant est de 25%
  const progressOffset = circumference * 0.25; 

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center bg-gray-50 p-8">
      {/* L'animation de téléchargement */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-6">
        {/* SVG pour les cercles */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          {/* Cercle de fond (la piste grise) */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="#e6e6e6"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Cercle de progression (l'arc bleu) animé */}
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            stroke="#007AFF" // Couleur bleu Apple
            strokeWidth="10"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progressOffset }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
        {/* Icône "Stop" au centre */}
        <div className="absolute w-10 h-10 bg-[#007AFF] rounded-lg" />
      </div>

      {/* Textes d'information */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Work in Progress</h2>
      <p className="text-gray-500 max-w-sm">
        This project is currently under development. More details, images, and a live demo will be available soon!
      </p>
    </div>
  );
}