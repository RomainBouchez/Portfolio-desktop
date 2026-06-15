'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { dockApps } from '@/lib/dockApps'; // Assurez-vous que ce chemin est correct
import Image from 'next/image';
import LiquidGlass from './LiquidGlass';

interface DockProps {
  onAppClick: (appId: string, appType: string, appUrl?: string, appAction?: string) => void;
  openApps: string[];
  onTrashClick?: () => void;
  trashEmptied?: boolean;
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
export default function Dock({ onAppClick, openApps, onTrashClick, trashEmptied }: DockProps) {
  const mouseX = useMotionValue<number>(Infinity);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-full">
      <LiquidGlass
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        radius={22}
        overflow="visible"
        tint="rgba(255,255,255,0.18)"
        strokeColor="255,255,255"
        strokeEdge={0.3}
        strokeMid={0.3}
        highlight={0.5}
        shade={0.1}
        sideShade={0.3}
        className="mx-auto w-fit max-w-full"
        contentClassName="flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-3 py-2"
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

        <TrashIconComponent mouseX={mouseX} onTrashClick={onTrashClick} trashEmptied={trashEmptied} />
      </LiquidGlass>
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
      className="absolute bottom-full mb-3 whitespace-nowrap pointer-events-none"
    >
      <LiquidGlass
        radius={10}
        blur={12}
        tint="rgba(30,30,33,0.55)"
        strokeColor="255,255,255"
        strokeEdge={0.12}
        strokeMid={0.12}
        highlight={0.2}
        shade={0.25}
        contentClassName="px-3 py-1.5 text-white text-xs font-medium"
      >
        {children}
      </LiquidGlass>
      {/* Petite flèche en dessous */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[rgba(30,30,33,0.7)]" />
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
function TrashIconComponent({ mouseX, onTrashClick, trashEmptied }: { mouseX: ReturnType<typeof useMotionValue<number>>; onTrashClick?: () => void; trashEmptied?: boolean }) {
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
          onClick={onTrashClick}
          style={{ scale, y, transformOrigin: 'bottom' }}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer"
          title="Trash"
      >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={trashEmptied ? '/icon/user-trash.svg' : '/icon/user-trash-full.svg'}
            alt="Corbeille"
            className="w-full h-full object-contain"
            draggable={false}
          />
      </motion.button>
    </div>
  );
}