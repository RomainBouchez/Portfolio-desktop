'use client';

import { useState } from 'react';
import Dock from './Dock'; // Assurez-vous que le chemin est correct
import ProjectWindow from './ProjectWindow'; // Assurez-vous que le chemin est correct
import { projects, Project } from '@/lib/projects'; // Assurez-vous que le chemin et la structure sont corrects

// Interface pour décrire une fenêtre ouverte
interface OpenWindow {
  id: string;      // Doit être unique (ex: 'project-chess-robot')
  type: 'project'; // Pourrait être étendu à 'about', 'terminal', etc.
  data: Project;   // Les données spécifiques à la fenêtre
  zIndex: number;  // L'ordre de superposition
}

const Z_INDEX_START = 100; // Le z-index de base pour les fenêtres (au-dessus des icônes desktop)

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(Z_INDEX_START);

  // Gère le clic sur une app du Dock
  const handleAppClick = (appId: string, appType: string, appUrl?: string, appAction?: string) => {
    if (appType === 'link' && appUrl) {
      window.open(appUrl, '_blank');
      return;
    }

    if (appAction === 'openProjects') {
        // Logique pour ouvrir une fenêtre de projets spécifiques
        // Ici, ouvrons le premier projet pour l'exemple
        const projectToOpen = projects[0];
        if (!projectToOpen) return;
        
        const windowId = `project-${projectToOpen.id}`;

        // Si la fenêtre est déjà ouverte, on la ramène au premier plan
        if (openWindows.some(w => w.id === windowId)) {
            handleFocusWindow(windowId);
            return;
        }

        // Sinon, on crée une nouvelle fenêtre
        const newWindow: OpenWindow = {
            id: windowId,
            type: 'project',
            data: projectToOpen,
            zIndex: zIndexCounter + 1,
        };

        setOpenWindows([...openWindows, newWindow]);
        setZIndexCounter(zIndexCounter + 1);
    }
    // Ajoutez ici d'autres logiques pour 'openAbout', 'openTerminal', etc.
  };

  // Ferme une fenêtre
  const handleCloseWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== windowId));
  };

  // Ramène une fenêtre au premier plan
  const handleFocusWindow = (windowId: string) => {
    const newZIndex = zIndexCounter + 1;
    setOpenWindows(
      openWindows.map(w => (w.id === windowId ? { ...w, zIndex: newZIndex } : w))
    );
    setZIndexCounter(newZIndex);
  };
  
  // Pour l'instant, on n'a pas la logique pour `openApps`
  const openAppIds = openWindows.map(w => w.id);

  return (
    // Votre conteneur principal (le fond d'écran)
    <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/img/background_wallpaper.jpeg')"}}>
      
      {/* Affiche toutes les fenêtres ouvertes */}
      {openWindows.map(window => {
        if (window.type === 'project') {
          return (
            <ProjectWindow
              key={window.id}
              project={window.data}
              onClose={() => handleCloseWindow(window.id)}
              onFocus={() => handleFocusWindow(window.id)}
              zIndex={window.zIndex}
            />
          );
        }
        return null; // Pour d'autres types de fenêtres à l'avenir
      })}

      <Dock onAppClick={handleAppClick} openApps={openAppIds} />
    </div>
  );
}