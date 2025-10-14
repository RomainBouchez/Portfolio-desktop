'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projects';

interface ProjectWindow2Props {
  project: Project;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialPosition: { x: number; y: number } | null;
}

export default function ProjectWindow_2({ project, onClose, onFocus, zIndex, initialPosition = null }: ProjectWindow2Props) {
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
      className="bg-white rounded-xl overflow-hidden w-[1000px] max-w-[90vw] h-[650px] flex flex-col fixed shadow-2xl"
      style={{
        left: position.x,
        top: position.y,
        zIndex: zIndex,
        opacity: position.x === -9999 ? 0 : 1,
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 15px 25px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Header */}
      <div
        className="relative bg-gradient-to-b from-gray-50/95 to-gray-100/95 backdrop-blur-2xl px-4 py-2.5 flex items-center gap-2 cursor-move border-b border-gray-200/60"
        onMouseDown={handleHeaderMouseDown}
      >
        <div className="flex items-center gap-2 group/buttons cursor-pointer traffic-lights-container" onClick={onClose}>
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] before:content-['×'] before:text-transparent group-hover/buttons:before:text-[#8B0000] before:font-bold before:flex before:items-center before:justify-center" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] before:content-['−'] before:text-transparent group-hover/buttons:before:text-[#8B5A00] before:font-bold before:flex before:items-center before:justify-center" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] before:content-['⤢'] before:text-transparent group-hover/buttons:before:text-[#006400] before:text-[10px] before:font-bold before:flex before:items-center before:justify-center" />
        </div>
        <span className="text-[13px] font-semibold text-gray-700 flex-1 text-center pr-16">{project.title}</span>
      </div>

      {/* Finder-style Column View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Column 1: Details (25%) */}
        <div className="w-[25%] bg-gray-50 overflow-y-auto border-r border-gray-200 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Title</h3>
              <p className="text-sm font-medium text-gray-900">{project.title}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Type</h3>
              <p className="text-sm text-gray-700">{project.subtitle}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Description</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{project.description}</p>
            </div>
            <div className="pt-4 space-y-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-3 py-2 bg-blue-500 text-white text-xs font-medium rounded-md hover:bg-blue-600 transition-colors text-center"
                >
                  🚀 Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-3 py-2 bg-gray-800 text-white text-xs font-medium rounded-md hover:bg-gray-900 transition-colors text-center"
                >
                  💻 GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Features (25%) */}
        <div className="w-[25%] bg-white overflow-y-auto border-r border-gray-200 p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Features</h3>
          <div className="space-y-3">
            {project.features.map((feature, index) => (
              <div key={index} className="pb-3 border-b border-gray-100 last:border-0">
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-lg">{feature.icon}</span>
                  <h4 className="text-sm font-semibold text-gray-900">{feature.title}</h4>
                </div>
                <p className="text-xs text-gray-600 ml-7">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Technologies (20%) */}
        <div className="w-[20%] bg-gray-50 overflow-y-auto border-r border-gray-200 p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Stack</h3>
          <div className="space-y-2">
            {project.technologies.map((tech, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-xs font-medium text-gray-700">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 4: Preview (30%) */}
        <div className="w-[30%] bg-white overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Preview</h3>
          <div className="space-y-4">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image src={project.image} alt={project.title} fill className="object-cover" sizes="300px" />
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Contact</span>
                <span className="text-gray-900 font-medium">{project.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Technologies</span>
                <span className="text-gray-900 font-medium">{project.technologies.length}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Features</span>
                <span className="text-gray-900 font-medium">{project.features.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
