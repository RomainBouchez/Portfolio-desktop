'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projects';

interface ProjectWindow1Props {
  project: Project;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initialPosition: { x: number; y: number } | null;
}

type Tab = 'overview' | 'features' | 'tech' | 'links';

export default function ProjectWindow_1({ project, onClose, onFocus, zIndex, initialPosition = null }: ProjectWindow1Props) {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<Tab>('overview');
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

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'tech', label: 'Technologies' },
    { id: 'links', label: 'Links' }
  ];

  return (
    <div
      ref={windowRef}
      onMouseDown={onFocus}
      className="bg-white rounded-xl overflow-hidden w-[900px] max-w-[90vw] h-[600px] flex flex-col fixed shadow-2xl"
      style={{
        left: position.x,
        top: position.y,
        zIndex: zIndex,
        opacity: position.x === -9999 ? 0 : 1,
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 15px 25px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Header avec traffic lights */}
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

      {/* Tabs Navigation - Style Safari */}
      <div className="flex gap-1 px-4 pt-3 bg-gray-50 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Fixed Image (30%) */}
        <div className="w-[30%] bg-gray-100 flex items-center justify-center p-4 border-r border-gray-200">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image src={project.image} alt={project.title} fill className="object-cover" sizes="300px" />
          </div>
        </div>

        {/* Right: Scrollable Content (70%) */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h2>
                <p className="text-lg text-gray-600 mb-4">{project.subtitle}</p>
              </div>
              <div className="prose prose-sm">
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Contact: {project.email}</p>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              {project.features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Technologies Tab */}
          {activeTab === 'tech' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold hover:bg-blue-200 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links Tab */}
          {activeTab === 'links' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Project Links</h3>
              <div className="space-y-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🚀</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">Live Demo</h4>
                          <p className="text-sm text-gray-600">View the project in action</p>
                        </div>
                      </div>
                      <span className="text-gray-400 group-hover:text-gray-600">→</span>
                    </div>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💻</span>
                        <div>
                          <h4 className="font-semibold text-gray-900">GitHub Repository</h4>
                          <p className="text-sm text-gray-600">View source code</p>
                        </div>
                      </div>
                      <span className="text-gray-400 group-hover:text-gray-600">→</span>
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
