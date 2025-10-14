'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projects';
import { motion, AnimatePresence } from 'framer-motion'; // Import pour les animations

interface ProjectWindow5Props {
  project: Project;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialPosition: { x: number; y: number } | null;
}

export default function ProjectWindow_5({ project, onClose, onFocus, zIndex, initialPosition = null }: ProjectWindow5Props) {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);

  // Timer de 1 seconde pour l'écran de chargement
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Logique de positionnement et de drag & drop (inchangée)
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
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
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
    if ((e.target as HTMLElement).closest('.traffic-lights-container')) return;
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDragging(true);
    }
  };

  // Fonctions pour la couleur et l'initiale de l'app (inchangées)
  const getAppColor = () => {
    const colors = { 'chess-robot': '#2C3E50', 'aical': '#FF6B6B', /* ...autres projets */ };
    return colors[project.id as keyof typeof colors] || '#007AFF';
  };
  const getAppInitial = () => project.title.charAt(0).toUpperCase();

  return (
    <motion.div
      ref={windowRef}
      onMouseDown={onFocus}
      className="bg-white rounded-xl overflow-hidden w-[800px] max-w-[85vw] h-[800px] flex flex-col fixed shadow-2xl"
      style={{
        left: position.x,
        top: position.y,
        zIndex: zIndex,
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 15px 25px rgba(0, 0, 0, 0.25)',
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Header avec les icônes corrigées */}
      <div
        className="relative bg-gradient-to-b from-gray-50/95 to-gray-100/95 backdrop-blur-2xl px-4 py-2.5 flex items-center gap-2 cursor-move border-b border-gray-200/60"
        onMouseDown={handleHeaderMouseDown}
      >
        {/* ----- CORRECTION DES ICÔNES FEU TRICOLORE ----- */}
        <div className="flex items-center gap-2 group/buttons cursor-pointer traffic-lights-container" onClick={onClose}>
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] before:text-transparent before:font-bold before:leading-none group-hover/buttons:before:text-[#8B0000] before:transition-colors" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] before:text-transparent before:font-bold before:leading-none before:translate-y-[-0.5px] group-hover/buttons:before:text-[#8B5A00] before:transition-colors" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] before:text-transparent before:font-bold before:text-[10px] before:leading-none before:translate-y-[-0.5px] group-hover/buttons:before:text-[#006400] before:transition-colors" />
        </div>
        <span className="text-[13px] font-semibold text-gray-700 flex-1 text-center pr-16">{project.title}</span>
      </div>

      {/* ----- CORRECTION DE LA TRANSITION DE CHARGEMENT ----- */}
      <div className="flex-1 relative">
        {/* Écran de chargement avec animation de sortie */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{ backgroundColor: getAppColor() }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <motion.div 
                className="relative w-32 h-32 rounded-[28px] shadow-2xl overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              >
                <Image 
                  src={project.image} 
                  alt={`${project.title} icon`} 
                  fill 
                  className="object-cover"
                  sizes="128px"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenu principal avec animation d'entrée retardée */}
        <motion.div
          className="absolute inset-0 overflow-y-auto bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }} // Le délai assure une transition douce
        >
          {/* Hero Section */}
          <div className="py-12 px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">{project.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{project.subtitle}</p>
            <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image src={project.image} alt={project.title} fill className="object-cover" sizes="800px" priority />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">{tech}</span>
              ))}
            </div>
          </div>

          {/* ... Reste du contenu (inchangé) ... */}
          <div className="border-t border-gray-200 my-8"></div>
          <div className="max-w-2xl mx-auto px-8 text-center"><p className="text-lg text-gray-700 leading-relaxed">{project.description}</p></div>
          <div className="border-t border-gray-200 my-12"></div>
          <div className="max-w-4xl mx-auto px-8 pb-12">
            <div className="grid grid-cols-2 gap-6">
              {project.features.map((feature) => (
                <div key={feature.title} className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          {/* ... etc ... */}
        </motion.div>
      </div>
    </motion.div>
  );
}