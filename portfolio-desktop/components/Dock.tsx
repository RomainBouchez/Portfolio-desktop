'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { dockApps } from '@/lib/dockApps'; // Assurez-vous que ce chemin est correct
import { TrashIcon } from './icons/MacOSIcons'; // Assurez-vous que ce chemin est correct
import Image from 'next/image';

interface DockProps {
  onAppClick: (appId: string, appType: string, appUrl?: string, appAction?: string) => void;
  openApps: string[];
}

// Hook personnalisé pour la logique d'animation du Dock
function useDockAnimation(mouseX: ReturnType<typeof useMotionValue<number>>, ref: React.RefObject<HTMLButtonElement | null>) {
    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const scaleSync = useTransform(distance, [-100, 0, 100], [1, 1.3, 1]);
    const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 200, damping: 15 });

    const ySync = useTransform(distance, [-100, 0, 100], [0, -2.5, 0]);
    const y = useSpring(ySync, { mass: 0.1, stiffness: 200, damping: 15 });

    return { scale, y };
}


// Composant principal du Dock
export default function Dock({ onAppClick, openApps }: DockProps) {
  const mouseX = useMotionValue<number>(Infinity);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-full">
      <div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 bg-white/10 backdrop-blur-xl rounded-[16px] sm:rounded-[22px] border border-white/20 shadow-lg mx-auto w-fit max-w-full"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
        }}
      >
        {dockApps.map((app) => (
          <AppIcon
            key={app.id}
            app={app}
            mouseX={mouseX}
            onAppClick={onAppClick}
            isOpen={openApps.includes(app.id)}
          />
        ))}

        <div className="w-[1px] h-8 sm:h-12 bg-gray-200/20 mx-0.5 sm:mx-1" />

        <TrashIconComponent mouseX={mouseX} />
      </div>
    </div>
  );
}

// ----- NOUVEAU : Composant Tooltip réutilisable -----
function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: -8 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute bottom-full mb-3 px-3 py-1.5 bg-gray-800/90 backdrop-blur-sm text-white text-xs font-medium rounded-md shadow-lg whitespace-nowrap pointer-events-none"
    >
      {children}
      {/* Petite flèche en dessous */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800/90" />
    </motion.div>
  );
}

// ----- MIS À JOUR : Sous-composant pour chaque icône d'application -----
interface AppIconProps {
  app: typeof dockApps[0];
  mouseX: ReturnType<typeof useMotionValue<number>>;
  onAppClick: DockProps['onAppClick'];
  isOpen: boolean;
}

function AppIcon({ app, mouseX, onAppClick, isOpen }: AppIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const { scale, y } = useDockAnimation(mouseX, ref);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center"
    >
      <AnimatePresence>{isHovered && <Tooltip>{app.name}</Tooltip>}</AnimatePresence>

      <motion.button
        ref={ref}
        onClick={() => onAppClick(app.id, app.type, app.url, app.action)}
        style={{ scale, y, transformOrigin: 'bottom' }}
        className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer"
        title={app.name}
      >
        <Image src={app.iconPath} alt={app.name} fill className="object-cover" sizes="(max-width: 640px) 40px, 48px" />
      </motion.button>
      {isOpen && <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-gray-200/80" />}
    </div>
  );
}

// ----- MIS À JOUR : Sous-composant pour l'icône de la corbeille -----
function TrashIconComponent({ mouseX }: { mouseX: ReturnType<typeof useMotionValue<number>> }) {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    const { scale, y } = useDockAnimation(mouseX, ref);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center"
    >
      <AnimatePresence>{isHovered && <Tooltip>Trash</Tooltip>}</AnimatePresence>

      <motion.button
          ref={ref}
          style={{ scale, y, transformOrigin: 'bottom' }}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer"
          title="Trash"
      >
          <TrashIcon isFull={false} />
      </motion.button>
    </div>
  );
}