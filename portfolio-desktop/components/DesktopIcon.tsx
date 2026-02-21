'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/projects';
import { useRef, useEffect } from 'react';

interface DesktopIconProps {
  project: Project;
  onClick: () => void;
  initialPosition: { x: number; y: number };
}

export default function DesktopIcon({ project, onClick, initialPosition }: DesktopIconProps) {
  if (!project) return null;
  const { title, icon, status } = project;

  const motionRef = useRef<any>(null);
  const hasDragged = useRef(false);

  // Check if icon is an emoji (short string, typically 1-2 characters) or an image path
  const isEmoji = icon.length <= 4 && !icon.startsWith('/');

  // Update position when initialPosition changes (e.g., after screen rotation)
  useEffect(() => {
    if (motionRef.current) {
      motionRef.current.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;
    }
  }, [initialPosition.x, initialPosition.y]);

  const handleTap = () => {
    // Only open if no drag occurred
    // onTap can sometimes fire after a small drag, so we double-check
    if (!hasDragged.current) {
      onClick();
    }
    // Reset after tap
    hasDragged.current = false;
  };

  const handleDragStart = () => {
    hasDragged.current = false;
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    // Check if the drag distance exceeds the threshold
    const distance = Math.sqrt(
      Math.pow(info.offset.x, 2) + Math.pow(info.offset.y, 2)
    );

    // If moved more than 3 pixels, consider it a drag
    if (distance > 3) {
      hasDragged.current = true;
    }
  };

  const handleDragEnd = () => {
    // Reset after a delay to ensure onTap doesn't fire
    setTimeout(() => {
      hasDragged.current = false;
    }, 100);
  };

  return (
    <motion.div
      ref={motionRef}
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
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex flex-col items-center justify-start cursor-pointer group absolute z-10"
      initial={{ x: initialPosition.x, y: initialPosition.y, opacity: 0, scale: 0.8 }}
      animate={{ x: initialPosition.x, y: initialPosition.y, opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-0.5 sm:mb-1">
        {/* Render emoji as text or image with high quality */}
        {isEmoji ? (
          <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl drop-shadow-lg transition-transform duration-200 group-hover:scale-105">
            {icon}
          </div>
        ) : (
          <div className="relative w-full h-full transition-transform duration-200 group-hover:scale-105 drop-shadow-lg">
            <Image
              src={icon}
              alt={title}
              fill
              className="pointer-events-none object-contain"
              sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
              quality={90}
            />

            {/* Overlay with CSS mask for "In Progress" status */}
            {status === 'In Progress' && (
              <div
                className="progress-mask absolute inset-0 bg-black/60 pointer-events-none z-20"
              />
            )}

            {/* "New" Badge */}
            {project.new && (
              <div className="absolute -top-1.5 -right-2 z-30">
                <div className="relative rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  {/* Outer glow */}
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-[2px] opacity-60"></div>

                  {/* Badge content */}
                  <div className="relative overflow-hidden flex items-center justify-center px-1.5 py-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-300 border border-yellow-200">
                    <span className="text-[8px] sm:text-[9px] font-extrabold text-amber-900 tracking-wider z-10 relative">NEW</span>

                    {/* Animated shine using framer-motion */}
                    <motion.div
                      initial={{ x: '-200%' }}
                      animate={{ x: '200%' }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", repeatDelay: 1.5 }}
                      className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/90 to-transparent skew-x-[20deg] z-20 pointer-events-none"
                    />

                    {/* Inner static gloss */}
                    <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-0"></span>
                  </div>
                </div>
              </div>
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