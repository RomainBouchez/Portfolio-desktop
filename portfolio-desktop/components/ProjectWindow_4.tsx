'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projects';

interface ProjectWindow4Props {
  project: Project;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialPosition: { x: number; y: number } | null;
}

export default function ProjectWindow_4({ project, onClose, onFocus, zIndex, initialPosition = null }: ProjectWindow4Props) {
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
      className="bg-[#f5f5f7] rounded-xl overflow-hidden w-[750px] max-w-[85vw] h-[700px] flex flex-col fixed shadow-2xl"
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

      {/* Content - Style System Settings avec cards */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Banner Image */}
        <div className="relative w-full h-[200px] rounded-xl overflow-hidden shadow-md">
          <Image src={project.image} alt={project.title} fill className="object-cover" sizes="750px" />
        </div>

        {/* About Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">About</h3>
          <div className="space-y-3">
            <div className="flex">
              <div className="w-32 text-sm text-gray-600">Title</div>
              <div className="flex-1 text-sm font-medium text-gray-900">{project.title}</div>
            </div>
            <div className="flex">
              <div className="w-32 text-sm text-gray-600">Type</div>
              <div className="flex-1 text-sm text-gray-700">{project.subtitle}</div>
            </div>
            <div className="flex">
              <div className="w-32 text-sm text-gray-600 flex-shrink-0">Description</div>
              <div className="flex-1 text-sm text-gray-700 leading-relaxed">{project.description}</div>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Features</h3>
          <div className="space-y-4">
            {project.features.map((feature, index) => (
              <div key={index} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="text-2xl">{feature.icon}</div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Technologies</h3>
          <div className="grid grid-cols-2 gap-2">
            {project.technologies.map((tech, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-gray-700">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Links Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Links</h3>
          <div className="space-y-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🚀</span>
                  <span className="text-sm font-medium text-gray-900">Live Demo</span>
                </div>
                <span className="text-gray-400 group-hover:text-gray-600">→</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">💻</span>
                  <span className="text-sm font-medium text-gray-900">GitHub Repository</span>
                </div>
                <span className="text-gray-400 group-hover:text-gray-600">→</span>
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-4">
          Contact: {project.email}
        </div>
      </div>
    </div>
  );
}
