'use client';

import { useState, useRef, useEffect } from 'react';
import { Project } from '@/lib/projects';
import ProjectAppStoreView from '@/components/ProjectAppStoreView';
import LiquidGlass from '@/components/LiquidGlass';

interface ProjectWindowProps {
  project: Project;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialPosition: { x: number; y: number } | null;
}

// Fenêtre macOS draggable. Chrome (toolbar glass + drag/position) ici ;
// contenu = layout "App Store glass" réutilisable (ProjectAppStoreView), theme-aware.
export default function ProjectWindow({
  project,
  onClose,
  onFocus,
  zIndex,
  initialPosition = null,
}: ProjectWindowProps) {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const isDark = project.modalTheme === 'dark';

  // --- Positionnement initial ---
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

  // --- Orientation ---
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

  // --- Drag ---
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
      className={`fixed rounded-[20px] overflow-hidden flex flex-col border ${
        isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'
      }`}
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        opacity: position.x === -9999 ? 0 : 1,
        width: isMobilePortrait ? '95vw' : '1000px',
        maxWidth: 'min(1200px, 94vw)',
        height: isMobilePortrait ? '85vh' : '650px',
        maxHeight: '90vh',
        boxShadow: '0 50px 120px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.4)',
      }}
    >
      {/* Toolbar verre (drag handle) */}
      <div
        className={`shrink-0 flex items-center gap-3 px-4 py-3 cursor-move backdrop-blur-2xl backdrop-saturate-150 border-b z-20 ${
          isDark ? 'bg-[#1c1c1e]/60 border-white/10' : 'bg-white/40 border-black/[0.06]'
        }`}
        onMouseDown={handleHeaderMouseDown}
      >
        {/* Window controls — clic rouge ferme */}
        <div className="flex gap-2 group cursor-pointer" onClick={onClose}>
          <button className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:brightness-90 transition" aria-label="Fermer" />
          <button className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:brightness-90 transition" />
          <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:brightness-90 transition" />
        </div>

        <div className={`ml-3 flex items-center gap-3 pointer-events-none select-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>

        <LiquidGlass
          radius={10}
          blur={6}
          shadow={false}
          tint={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.4)'}
          strokeColor="255,255,255"
          strokeEdge={0.2}
          strokeMid={0.2}
          highlight={0.3}
          shade={0.05}
          className={`ml-auto pointer-events-none select-none ${isDark ? 'text-gray-300' : 'text-gray-500'}`}
          contentClassName="flex items-center gap-2 px-3 py-1.5 text-sm"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          {project.title}
        </LiquidGlass>
      </div>

      {/* Contenu */}
      <div className="flex-1 min-h-0 relative">
        <ProjectAppStoreView project={project} isDark={isDark} />
      </div>
    </div>
  );
}
