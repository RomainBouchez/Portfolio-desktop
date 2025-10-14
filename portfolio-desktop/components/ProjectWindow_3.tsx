'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projects';

interface ProjectWindow3Props {
  project: Project;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialPosition: { x: number; y: number } | null;
}

export default function ProjectWindow_3({ project, onClose, onFocus, zIndex, initialPosition = null }: ProjectWindow3Props) {
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
      className="bg-white rounded-xl overflow-hidden w-[700px] max-w-[85vw] h-[750px] flex flex-col fixed shadow-2xl"
      style={{
        left: position.x,
        top: position.y,
        zIndex: zIndex,
        opacity: position.x === -9999 ? 0 : 1,
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 15px 25px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Header avec actions quick */}
      <div
        className="relative bg-gradient-to-b from-gray-50/95 to-gray-100/95 backdrop-blur-2xl px-4 py-2.5 flex items-center gap-2 cursor-move border-b border-gray-200/60"
        onMouseDown={handleHeaderMouseDown}
      >
        <div className="flex items-center gap-2 group/buttons cursor-pointer traffic-lights-container" onClick={onClose}>
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] before:content-['×'] before:text-transparent group-hover/buttons:before:text-[#8B0000] before:font-bold before:flex before:items-center before:justify-center" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] before:content-['−'] before:text-transparent group-hover/buttons:before:text-[#8B5A00] before:font-bold before:flex before:items-center before:justify-center" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] before:content-['⤢'] before:text-transparent group-hover/buttons:before:text-[#006400] before:text-[10px] before:font-bold before:flex before:items-center before:justify-center" />
        </div>
        <span className="text-[13px] font-semibold text-gray-700 flex-1 text-center">{project.title}</span>
        {/* Quick Actions */}
        <div className="flex items-center gap-3 pr-2">
          <button className="text-gray-500 hover:text-gray-700 transition-colors" title="Quick actions">⚡</button>
          <button className="text-gray-500 hover:text-gray-700 transition-colors" title="Copy link">🔗</button>
          <button className="text-gray-500 hover:text-gray-700 transition-colors" title="Share">📤</button>
        </div>
      </div>

      {/* Content: Image dominante + Infos compactes */}
      <div className="flex-1 overflow-y-auto bg-white">
        {/* Grande Image Hero (60-70% de l'espace) */}
        <div className="relative w-full h-[420px] bg-gray-100">
          <Image src={project.image} alt={project.title} fill className="object-cover" sizes="700px" priority />
        </div>

        {/* Contenu compact en bas */}
        <div className="p-6 space-y-4">
          {/* Titre + Subtitle */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            <p className="text-base text-gray-600 mt-1">{project.subtitle}</p>
          </div>

          {/* Technologies Pills */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Features inline (horizontales) */}
          <div className="grid grid-cols-2 gap-3">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-xl">{feature.icon}</span>
                <span className="text-gray-700 font-medium">{feature.title}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors shadow-md"
              >
                🚀 Open Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg font-semibold text-center hover:bg-gray-800 transition-colors shadow-md"
              >
                💻 GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
