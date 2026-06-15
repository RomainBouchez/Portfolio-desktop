'use client';

import { useState, useRef, useEffect } from 'react';

interface TrashModalProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex?: number;
  initialPosition?: { x: number; y: number } | null;
  emptied?: boolean;
  onEmptiedChange?: (v: boolean) => void;
}

// Faux fichiers supprimés — easter-egg humour dev. Icônes = thème MacTahoe (public/icon/trash/).
const TRASH_FILES: { icon: string; name: string; meta: string }[] = [
  { icon: '/icon/trash/pdf.svg', name: 'imposter_syndrome.pdf', meta: '404 Ko' },
  { icon: '/icon/trash/zip.svg', name: 'weekends.zip', meta: '0 octet' },
  { icon: '/icon/trash/folder.svg', name: 'node_modules', meta: '1,2 To' },
  { icon: '/icon/trash/js.svg', name: 'bugs_v1.js', meta: '666 Ko' },
  { icon: '/icon/trash/exe.svg', name: 'motivation_lundi.exe', meta: 'corrompu' },
  { icon: '/icon/trash/dmg.svg', name: 'sommeil.dmg', meta: '8 h manquantes' },
  { icon: '/icon/trash/js.svg', name: 'jquery.min.js', meta: 'déprécié' },
  { icon: '/icon/trash/text.svg', name: 'café.log', meta: '9 999 entrées' },
  { icon: '/icon/trash/html.svg', name: 'portfolio_v1.html', meta: '2019' },
  { icon: '/icon/trash/text.svg', name: 'idées_à_3h.txt', meta: '∞ lignes' },
  { icon: '/icon/trash/text.svg', name: 'TODO_un_jour.txt', meta: 'jamais ouvert' },
  { icon: '/icon/trash/archive.svg', name: 'temps_libre.rar', meta: 'vide' },
];

// Fenêtre "Corbeille" macOS. Même pattern que les autres fenêtres (drag, position, pastille rouge ferme).
export default function TrashModal({
  onClose,
  onFocus,
  zIndex = 100,
  initialPosition = null,
  emptied = false,
  onEmptiedChange,
}: TrashModalProps) {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let newPos = { x: 0, y: 0 };
    if (initialPosition) {
      newPos = initialPosition;
    } else if (windowRef.current) {
      const { offsetWidth, offsetHeight } = windowRef.current;
      newPos.x = (window.innerWidth - offsetWidth) / 2;
      newPos.y = (window.innerHeight - offsetHeight) / 3;
    }
    setPosition(newPos);
  }, [initialPosition]);

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsMobilePortrait(isMobile && isPortrait);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && windowRef.current) {
        const windowWidth = windowRef.current.offsetWidth;
        const windowHeight = windowRef.current.offsetHeight;
        const isMobile = window.innerWidth < 640;
        const dockHeight = isMobile ? 70 : 85;
        const menuBarHeight = 40;
        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;
        newX = Math.max(0, Math.min(newX, window.innerWidth - windowWidth));
        newY = Math.max(menuBarHeight, Math.min(newY, window.innerHeight - windowHeight - dockHeight));
        setPosition({ x: newX, y: newY });
      }
    };
    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, .no-drag')) return;
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDragging(true);
    }
  };

  return (
    <div
      ref={windowRef}
      onMouseDown={onFocus}
      className="fixed rounded-[18px] overflow-hidden flex flex-col border border-black/10 bg-[#F5F5F7]"
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        opacity: position.x === -9999 ? 0 : 1,
        width: isMobilePortrait ? '95vw' : '720px',
        maxWidth: 'min(820px, 94vw)',
        height: isMobilePortrait ? '80vh' : '520px',
        maxHeight: '90vh',
        boxShadow: '0 50px 120px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.5)',
      }}
    >
      {/* Toolbar verre */}
      <div
        className="shrink-0 flex items-center gap-3 px-4 py-2.5 cursor-move backdrop-blur-2xl backdrop-saturate-150 bg-white/45 border-b border-black/[0.06] z-20"
        onMouseDown={handleHeaderMouseDown}
      >
        <div className="flex gap-2 group cursor-pointer" onClick={onClose}>
          <button className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:brightness-90 transition" aria-label="Fermer" />
          <button className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:brightness-90 transition" />
          <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:brightness-90 transition" />
        </div>

        <span className="ml-2 text-sm font-semibold text-gray-700 pointer-events-none select-none">Corbeille</span>

        {!emptied && (
          <button
            onClick={() => onEmptiedChange?.(true)}
            className="no-drag ml-auto px-3 py-1 rounded-full text-xs font-semibold text-gray-700 bg-black/[0.06] hover:bg-black/[0.1] transition-colors"
          >
            Vider
          </button>
        )}
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto bg-white/70 backdrop-blur-xl">
        {emptied ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-8 gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon/user-trash.svg" alt="Corbeille vide" className="w-20 h-20 object-contain" draggable={false} />
            <p className="text-gray-800 font-medium">Corbeille vidée</p>
            <p className="text-sm text-gray-500 max-w-sm">
              Si seulement le syndrome de l&apos;imposteur partait aussi facilement.
            </p>
            <button
              onClick={() => onEmptiedChange?.(false)}
              className="mt-2 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-600 bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
            >
              Tout restaurer
            </button>
          </div>
        ) : (
          <>
            <div className="px-5 py-2.5 text-xs text-gray-400 border-b border-black/[0.05] sticky top-0 bg-white/60 backdrop-blur-xl">
              {TRASH_FILES.length} éléments · ne sera jamais vidée (promis)
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 p-4">
              {TRASH_FILES.map((f, i) => (
                <button
                  key={i}
                  className="group flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-blue-500/10 transition-colors text-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.icon} alt="" className="w-12 h-12 object-contain transition-transform group-hover:scale-110" draggable={false} loading="lazy" />
                  <span className="text-xs font-medium text-gray-800 text-center leading-tight break-all line-clamp-2 max-w-[100px]">{f.name}</span>
                  <span className="text-[10px] text-gray-400">{f.meta}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
