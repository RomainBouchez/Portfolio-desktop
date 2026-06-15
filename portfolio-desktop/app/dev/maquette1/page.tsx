'use client';

import { useState } from 'react';
import Image from 'next/image';
import { projects } from '@/lib/projects';
import ProjectAppStoreView from '@/components/ProjectAppStoreView';

// Galerie de revue — maquette modal "App Store glass".
// Sélecteur de projet → vérifie les 10 projets (thèmes clair/sombre, contenu long) avant mise en prod.
// Page isolée : /dev/maquette1. Ne touche pas au site live.

export default function Maquette1Gallery() {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const project = projects.find((p) => p.id === selectedId)!;
  const isDark = project.modalTheme === 'dark';

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col items-center gap-5 p-4 sm:p-8">
      {/* Fond showcase */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950">
        <div className="absolute inset-0 progressive-blur-background opacity-40" />
      </div>

      {/* Sélecteur de projet */}
      <div className="relative z-10 flex flex-wrap justify-center gap-2 max-w-[1000px]">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors backdrop-blur-md ${
              p.id === selectedId
                ? 'bg-white text-gray-900 border-white'
                : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
            }`}
          >
            {p.title}
            {p.modalTheme === 'dark' && <span className="ml-1 opacity-60">🌙</span>}
          </button>
        ))}
      </div>

      {/* Fenêtre macOS — toolbar glass + vue projet */}
      <section
        className="relative z-10 w-full max-w-[1000px] h-[78vh] overflow-hidden rounded-[20px] border border-white/30 flex flex-col"
        style={{ boxShadow: '0 50px 120px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.5)' }}
      >
        {/* Toolbar (reprise pour la version finale du ProjectWindow) */}
        <div
          className={`shrink-0 flex items-center gap-3 px-4 py-3 backdrop-blur-2xl backdrop-saturate-150 border-b ${
            isDark ? 'bg-[#1c1c1e]/60 border-white/10' : 'bg-white/40 border-black/[0.06]'
          }`}
        >
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
          </div>
          <div className={`ml-3 flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div
            className={`ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${
              isDark ? 'bg-white/10 border-white/15 text-gray-300' : 'bg-white/50 border-white/50 text-gray-500'
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            Rechercher
          </div>
        </div>

        {/* Vue projet */}
        <div className="flex-1 min-h-0">
          <ProjectAppStoreView project={project} isDark={isDark} />
        </div>
      </section>

      <p className="relative z-10 text-xs text-white/50">/dev/maquette1 — galerie de revue (hors prod)</p>
    </main>
  );
}
