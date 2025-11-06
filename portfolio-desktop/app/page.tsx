'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopIcon from '@/components/DesktopIcon';
import ErrorModal from '@/components/ErrorModal';
import ProjectWindow from '@/components/ProjectWindow_2';
import AboutModal from '@/components/AboutModal';
import Dock from '@/components/Dock';
import MenuBar from '@/components/MenuBar';
import { projects, Project } from '@/lib/projects';

interface OpenWindow {
  id: string;
  appId: string;
  type: 'project' | 'about';
  data?: any;
  zIndex: number;
  position: { x: number, y: number } | null;
}

const Z_INDEX_BASE = 100;
const WINDOW_WIDTH = 896;
const WINDOW_MAX_WIDTH_VW = 48;
const GAP = 25;

export default function Home() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(Z_INDEX_BASE);
  const [showWipPopup, setShowWipPopup] = useState(false);
  const [iconPositions, setIconPositions] = useState<{ x: number; y: number }[]>([]);
  
  const handleFocusWindow = (windowId: string) => {
    const newZIndex = zIndexCounter + 1;
    setZIndexCounter(newZIndex);
    setOpenWindows(openWindows.map(w =>
      w.id === windowId ? { ...w, zIndex: newZIndex } : w
    ));
  };

  const handleCloseWindow = (windowId: string) => {
    const remainingWindows = openWindows.filter(w => w.id !== windowId);
    if (remainingWindows.length === 1) {
      remainingWindows[0].position = null;
    }
    setOpenWindows(remainingWindows);
  };

  const openWindow = (id: string, appId: string, type: 'project' | 'about', data?: any) => {
    const existingWindow = openWindows.find(w => w.id === id);
    if (existingWindow) {
      handleFocusWindow(id);
      return;
    }

    const newZIndex = zIndexCounter + 1;
    setZIndexCounter(newZIndex);

    let newWindowsList = [...openWindows];
    let newWindow: OpenWindow;

    // Get window dimensions - responsive based on screen size
    const isMobile = window.innerWidth < 640;
    const maxWindowHeight = isMobile
      ? window.innerHeight * 0.90  // Mobile: max 70% of screen height
      : window.innerHeight * 0.85; // Desktop: max 85% of screen height

    const windowWidth = Math.min(800, window.innerWidth * 0.85);
    const windowHeight = Math.min(800, maxWindowHeight);
    const menuBarHeight = 40; // Height of the menu bar at top
    const dockHeight = isMobile ? 70 : 85; // Dock space: 70px on mobile, 85px on desktop (reduced padding)

    if (newWindowsList.length === 0) {
      // First window: center it on screen
      newWindow = { id, appId, type, data, zIndex: newZIndex, position: null };
      newWindowsList.push(newWindow);
    } else if (newWindowsList.length === 1) {
      // Two windows: arrange side by side if there's enough space
      const existingWindow = newWindowsList[0];
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight - menuBarHeight - dockHeight;

      // Check if we can fit two windows side by side
      const totalWidthNeeded = windowWidth * 2 + GAP * 3; // 2 windows + gaps on sides and between

      if (totalWidthNeeded <= availableWidth) {
        // Side by side layout
        const yPos = Math.max(menuBarHeight + 20, (window.innerHeight - windowHeight) / 2);
        const leftX = (availableWidth - (windowWidth * 2 + GAP)) / 2;
        const rightX = leftX + windowWidth + GAP;

        existingWindow.position = { x: leftX, y: yPos };
        newWindow = { id, appId, type, data, zIndex: newZIndex, position: { x: rightX, y: yPos } };
      } else {
        // Stack with offset if not enough space
        const offset = 40;
        const centeredX = Math.max(20, (availableWidth - windowWidth) / 2);
        const centeredY = Math.max(menuBarHeight + 20, (availableHeight - windowHeight) / 2 + menuBarHeight);

        existingWindow.position = { x: centeredX, y: centeredY };
        newWindow = { id, appId, type, data, zIndex: newZIndex, position: { x: centeredX + offset, y: centeredY + offset } };
      }
      newWindowsList.push(newWindow);
    } else {
      // More than 2 windows: cascade with offset
      const offset = 30;
      const maxOffset = Math.min(newWindowsList.length - 1, 8) * offset; // Cap the offset
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight - menuBarHeight - dockHeight;

      const centeredX = Math.max(20, Math.min(
        (availableWidth - windowWidth) / 2 + maxOffset,
        availableWidth - windowWidth - 20
      ));
      const centeredY = Math.max(menuBarHeight + 20, Math.min(
        (availableHeight - windowHeight) / 2 + menuBarHeight + maxOffset,
        window.innerHeight - windowHeight - dockHeight - 20
      ));

      newWindow = { id, appId, type, data, zIndex: newZIndex, position: { x: centeredX, y: centeredY } };
      newWindowsList.push(newWindow);
    }
    setOpenWindows(newWindowsList);
  };

  const handleIconClick = (project: Project) => {
    if (project.status === 'In Progress') {
      setShowWipPopup(true);
      return;
    }
    openWindow(`project-${project.id}`, 'vscode', 'project', project);
  };

  const handleAppClick = (appId: string, appType: string, appUrl?: string, appAction?: string) => {
    if (appType === 'link' && appUrl) {
      window.open(appUrl, '_blank');
      return;
    }
    if (appAction === 'openAbout') {
      openWindow('about', 'notes', 'about');
    }
    if (appAction === 'openProjects') {
      // Show ErrorModal instead of opening a project
      setShowWipPopup(true);
    }
  };

  const openAppIds = [...new Set(openWindows.map(w => w.appId))];

  // Calculate responsive icon positions based on screen size
  useEffect(() => {
    const calculateIconPositions = () => {
      if (typeof window === 'undefined') return [];

      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 768;

      // Icon size based on screen size
      const iconSize = isMobile ? 64 : isTablet ? 80 : 96;
      const startY = isMobile ? 60 : 80;

      // Force 4 icons per row on mobile, calculate for other screens
      let iconsPerRow: number;
      if (isMobile) {
        iconsPerRow = 4; // Always 4 icons per row on mobile
      } else {
        const edgePadding = 20;
        const availableWidth = window.innerWidth - (edgePadding * 2);
        iconsPerRow = Math.floor(availableWidth / (iconSize + 24));
      }

      // Calculate spacing to make icons span from left to right edge
      const totalIconWidth = iconSize * iconsPerRow;
      const availableSpaceForGaps = window.innerWidth - totalIconWidth;
      const gap = availableSpaceForGaps / (iconsPerRow + 1); // Equal spacing including edges

      const positions = [];
      for (let i = 0; i < 12; i++) { // Support up to 12 icons
        const row = Math.floor(i / iconsPerRow);
        const col = i % iconsPerRow;

        // Position icons with calculated gap, starting from left edge
        const x = gap + col * (iconSize + gap);
        const y = startY + row * (iconSize + gap);

        positions.push({ x, y });
      }
      return positions;
    };

    setIconPositions(calculateIconPositions());

    const handleResize = () => {
      setIconPositions(calculateIconPositions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#f9f9f9]">

      <div className="progressive-blur-background absolute inset-0 z-0 backdrop-blur-sm"/>

      <motion.div
        className="absolute bottom-0 right-0 w-[120vw] sm:w-[90vw] md:w-[100vw] lg:w-[50vw] h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] z-1 pointer-events-none"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        style={{ filter: 'blur(1px)' }}
      >
        <Image
          src="/img/sans_fond_background.png"
          alt="Portrait de Romain Bouchez"
          fill
          className="object-contain object-bottom"
          priority
        />
      </motion.div>
      <MenuBar />
      <div className="relative z-20">
        {iconPositions.length > 0 && projects.map((project, index) => (
          <DesktopIcon
            key={project.id}
            project={project}
            onClick={() => handleIconClick(project)}
            initialPosition={iconPositions[index] || { x: 20, y: 80 }}
          />
        ))}
      </div>
      <Dock onAppClick={handleAppClick} openApps={openAppIds} />
      {openWindows.map(win => {
        if (win.type === 'project') {
          return (
            <ProjectWindow
              key={win.id}
              project={win.data}
              onClose={() => handleCloseWindow(win.id)}
              onFocus={() => handleFocusWindow(win.id)}
              zIndex={win.zIndex}
              initialPosition={win.position}
            />
          );
        }
        if (win.type === 'about') {
          return <AboutModal key={win.id} onClose={() => handleCloseWindow(win.id)} />;
        }
        return null;
      })}

      <AnimatePresence>
        {showWipPopup && (
          <ErrorModal
            title="Work in Progress"
            message="This feature is currently under development. Please explore my projects by clicking on the desktop icons!"
            buttonText="Got it"
            onClose={() => setShowWipPopup(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}