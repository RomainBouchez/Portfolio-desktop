'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/projects';
import { useRef } from 'react';

interface DesktopIconProps {
  project: Project;
  onClick: () => void;
  initialPosition: { x: number; y: number };
}

export default function DesktopIcon({ project, onClick, initialPosition }: DesktopIconProps) {
  if (!project) return null;
  const { title, icon, status } = project;

  const dragStartPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // Check if icon is an emoji (short string, typically 1-2 characters) or an image path
  const isEmoji = icon.length <= 4 && !icon.startsWith('/');

  const handleClick = () => {
    // Only trigger onClick if the icon wasn't dragged significantly
    if (!isDragging.current) {
      onClick();
    }
  };

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    isDragging.current = false;
    const clientX = 'clientX' in event ? event.clientX : (event as TouchEvent).touches[0].clientX;
    const clientY = 'clientY' in event ? event.clientY : (event as TouchEvent).touches[0].clientY;
    dragStartPos.current = { x: clientX, y: clientY };
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent) => {
    const clientX = 'clientX' in event ? event.clientX : (event as TouchEvent).touches[0].clientX;
    const clientY = 'clientY' in event ? event.clientY : (event as TouchEvent).touches[0].clientY;

    // Calculate distance moved from drag start
    const deltaX = Math.abs(clientX - dragStartPos.current.x);
    const deltaY = Math.abs(clientY - dragStartPos.current.y);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // If moved more than 5 pixels, consider it a drag
    if (distance > 5) {
      isDragging.current = true;
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={{
        top: 0,
        left: 0,
        right: typeof window !== 'undefined' ? window.innerWidth - (window.innerWidth < 640 ? 64 : window.innerWidth < 768 ? 80 : 96) : 0,
        bottom: typeof window !== 'undefined' ? window.innerHeight - (window.innerWidth < 640 ? 64 : window.innerWidth < 768 ? 80 : 96) - 100 : 0
      }}
      dragTransition={{
        bounceStiffness: 600,
        bounceDamping: 20,
        power: 0.2
      }}
      whileDrag={{
        scale: 1.1,
        rotate: 2,
        cursor: 'grabbing'
      }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onClick={handleClick}
      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex flex-col items-center justify-start cursor-pointer group absolute"
      initial={{ x: initialPosition.x, y: initialPosition.y, opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-0.5 sm:mb-1">
        {/* Render emoji as text or image with high quality */}
        {isEmoji ? (
          <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl drop-shadow-lg transition-transform duration-200 group-hover:scale-105">
            {icon}
          </div>
        ) : (
          <div className="relative w-full h-full transition-transform duration-200 group-hover:scale-105">
            {/* Icon with shadow that follows the rounded shape */}
            <div className="absolute inset-0 rounded-lg sm:rounded-xl shadow-lg"
                 style={{
                   boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                   filter: 'blur(0px)'
                 }}
            />
            <Image
              src={icon}
              alt={title}
              fill
              className="rounded-lg sm:rounded-xl pointer-events-none object-cover relative z-10"
              sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
              quality={90}
            />

            {/* Overlay with CSS mask for "In Progress" status */}
            {status === 'In Progress' && (
              <div
                className="progress-mask absolute inset-0 bg-black/60 rounded-lg sm:rounded-xl pointer-events-none z-20"
              />
            )}
          </div>
        )}
      </div>

      <p className="text-black text-[10px] sm:text-xs text-center font-medium truncate w-full px-0.5 sm:px-1 pointer-events-none">
        {/* Le texte affiche maintenant le titre, même pendant le téléchargement */}
        {title}
      </p>
    </motion.div>
  );
}