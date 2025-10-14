'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projects';

interface ProjectWindowProps {
  project: Project;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialPosition: { x: number; y: number } | null;
}

export default function ProjectWindow({ project, onClose, onFocus, zIndex, initialPosition = null }: ProjectWindowProps) {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
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
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
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
    if ((e.target as HTMLElement).closest('.traffic-lights-container')) return;
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
      className="bg-gray-200/75 backdrop-blur-xl rounded-xl overflow-hidden w-[896px] max-w-[48vw] h-[70vh] flex flex-col fixed shadow-2xl transition-all duration-300 ease-in-out"
      style={{
        left: position.x,
        top: position.y,
        zIndex: zIndex,
        opacity: position.x === -9999 ? 0 : 1,
      }}
    >
      {/* Header */}
      <div
        className="relative bg-gray-300/60 px-4 py-2.5 flex items-center gap-2 cursor-move border-b border-gray-400/50 flex-shrink-0"
        onMouseDown={handleHeaderMouseDown}
      >
        <div 
        className="flex items-center gap-2 group/buttons cursor-pointer traffic-lights-container p-1 -m-1"
        onClick={onClose}
      >
        {/* Bouton Fermer */}
        <div
          className="w-3 h-3 rounded-full bg-[#FF5F56] flex items-center justify-center
                    before:content-['×'] before:text-transparent before:font-bold before:leading-none 
                    group-hover/buttons:before:text-[#8B0000] before:transition-colors"
          aria-label="Close"
        />

        {/* Bouton Minimiser */}
        <div
          className="w-3 h-3 rounded-full bg-[#FFBD2E] flex items-center justify-center
                    before:content-['−'] before:text-transparent before:font-bold before:leading-none before:translate-y-[-0.5px]
                    group-hover/buttons:before:text-[#8B5A00] before:transition-colors"
          aria-label="Minimize"
        />

        {/* Bouton Maximiser */}
        <div
          className="w-3 h-3 rounded-full bg-[#27C93F] flex items-center justify-center
                    before:content-['⤢'] before:text-transparent before:font-bold before:text-[10px] before:leading-none before:translate-y-[-0.5px]
                    group-hover/buttons:before:text-[#006400] before:transition-colors"
          aria-label="Maximize"
        />
      </div>
        <span className="text-sm font-medium text-gray-800 truncate flex-1 text-center pr-16">{project.title}</span>
      </div>

      <div className="overflow-y-auto flex-1 p-6 bg-white/90">
        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6 shadow-md">
          <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{project.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{project.subtitle}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">{tech}</span>
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
            {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">🚀 Live Demo</a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">💻 GitHub</a>}
        </div>
      </div>
    </div>
  );
}