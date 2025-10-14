'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/projects';

interface DesktopIconProps {
  project: Project;
  onClick: () => void;
  initialPosition: { x: number; y: number };
}

export default function DesktopIcon({ project, onClick, initialPosition }: DesktopIconProps) {
  if (!project) return null;
  const { title, icon, status } = project;

  // Check if icon is an emoji (short string, typically 1-2 characters) or an image path
  const isEmoji = icon.length <= 4 && !icon.startsWith('/');

  return (
    <motion.div
      drag
      dragMomentum={false}
      onClick={onClick}
      className="w-24 h-24 flex flex-col items-center justify-start cursor-pointer group absolute"
      initial={{ x: initialPosition.x, y: initialPosition.y, opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      <div className="relative w-20 h-20 mb-1">
        {/* Render emoji as text or image with high quality */}
        {isEmoji ? (
          <div className="w-full h-full flex items-center justify-center text-5xl drop-shadow-lg">
            {icon}
          </div>
        ) : (
          <Image
            src={icon}
            alt={title}
            fill
            className="rounded-xl shadow-lg transition-transform duration-200 group-hover:scale-105 pointer-events-none object-cover"
            sizes="160px"
            quality={90}
          />
        )}

        {/* Overlay with CSS mask for "In Progress" status */}
        {status === 'In Progress' && (
          <div
            className="progress-mask absolute inset-0 bg-black/60 rounded-xl pointer-events-none"
          />
        )}
      </div>
      
      <p className="text-white text-xs text-center font-medium truncate w-full px-1 pointer-events-none">
        {/* Le texte affiche maintenant le titre, même pendant le téléchargement */}
        {title}
      </p>
    </motion.div>
  );
}