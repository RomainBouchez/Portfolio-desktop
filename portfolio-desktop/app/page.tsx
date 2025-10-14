'use client';

import { useState } from 'react';
import DesktopIcon from '@/components/DesktopIcon';
import ErrorModal from '@/components/ErrorModal';
import ProjectWindow from '@/components/ProjectWindow_5';
import AboutModal from '@/components/AboutModal';
import Dock from '@/components/Dock';
import MenuBar from '@/components/MenuBar';
import { projects, Project } from '@/lib/projects';
import { AnimatePresence } from 'framer-motion';

interface OpenWindow {
  id: string;
  appId: string;
  type: 'project' | 'about';
  data?: any;
  zIndex: number;
  position: { x: number, y: number } | null;
}

const Z_INDEX_BASE = 10;
const WINDOW_WIDTH = 896;
const WINDOW_MAX_WIDTH_VW = 48;
const GAP = 25;

export default function Home() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(Z_INDEX_BASE);
  const [showWipPopup, setShowWipPopup] = useState(false);
  
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
    const effectiveWindowWidth = Math.min(WINDOW_WIDTH, window.innerWidth * (WINDOW_MAX_WIDTH_VW / 100));

    if (newWindowsList.length === 0) {
      newWindow = { id, appId, type, data, zIndex: newZIndex, position: null };
      newWindowsList.push(newWindow);
    } else if (newWindowsList.length === 1) {
      const existingWindow = newWindowsList[0];
      const yPos = (window.innerHeight * 0.7) / 4;
      const leftX = (window.innerWidth / 2) - effectiveWindowWidth - (GAP / 2);
      existingWindow.position = { x: leftX, y: yPos };
      const rightX = (window.innerWidth / 2) + (GAP / 2);
      newWindow = { id, appId, type, data, zIndex: newZIndex, position: { x: rightX, y: yPos } };
      newWindowsList.push(newWindow);
    } else {
      const offset = (newWindowsList.length - 1) * 30;
      const centeredX = (window.innerWidth - effectiveWindowWidth) / 2;
      const centeredY = (window.innerHeight * 0.7) / 4;
      const initialPos = { x: centeredX + offset, y: centeredY + offset };
      newWindow = { id, appId, type, data, zIndex: newZIndex, position: initialPos };
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
    if (appAction === 'openProjects' && projects.length > 0) {
      handleIconClick(projects[0]);
    }
  };

  const openAppIds = [...new Set(openWindows.map(w => w.appId))];
  
  // ----- TABLEAU DE POSITIONS CORRIGÉ -----
  const iconPositions = [
    { x: 50, y: 50 },
    { x: 200, y: 50 },
    { x: 350, y: 50 },
    { x: 500, y: 50 },
    { x: 50, y: 220 },
    { x: 200, y: 220 },
    { x: 350, y: 220 },
    { x: 500, y: 220 },
  ];

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#415A77]">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20"></div>
      </div>
      <MenuBar />
      <div className="relative z-10 p-8">
        {projects.map((project, index) => (
          <DesktopIcon
            key={project.id}
            project={project}
            onClick={() => handleIconClick(project)}
            initialPosition={iconPositions[index] || { x: 50, y: 50 }} // La logique ici est bonne, c'est le tableau qui était trop court
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
            message="You need to wait a little more, this project is not finished yet."
            buttonText="Got it"
            onClose={() => setShowWipPopup(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}