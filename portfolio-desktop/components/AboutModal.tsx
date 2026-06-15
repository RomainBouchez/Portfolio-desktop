'use client';

import { useState, useRef, useEffect } from 'react';

interface AboutModalProps {
  onClose: () => void;
  onFocus?: () => void;
  zIndex?: number;
  initialPosition?: { x: number; y: number } | null;
}

// Liste de notes (façade visuelle, style macOS). Seule "À propos" est réelle (contenu à droite).
type NoteItem = {
  title: string;
  date: string;
  preview: string;
  folder: string;
  thumb?: string;
  selected?: boolean;
};
const NOTE_GROUPS: { month: string; notes: NoteItem[] }[] = [
  {
    month: 'Juin',
    notes: [
      { title: 'À propos de moi', date: '12/06/25', preview: 'Étudiant ingénieur ESIEA, passionné IA & ML…', folder: 'Notes', thumb: '/img/sans_fond_background.png', selected: true },
      { title: 'Stack & compétences', date: '10/06/25', preview: 'Next.js, React, Python, PyTorch, Docker…', folder: 'Projects', thumb: '/img/AiCal/aical-mainpage.jpg' },
    ],
  },
  {
    month: 'Mai',
    notes: [
      { title: 'Parcours ESIEA', date: '28/05/25', preview: 'Cycle ingénieur, spécialisation IA / data…', folder: 'Notes' },
      { title: 'Projets récents', date: '20/05/25', preview: 'AICal, Ghost Note, WikiLink Race…', folder: 'Projects', thumb: '/img/isitopen/isitopen_preview.png' },
      { title: 'Contact', date: '12/05/25', preview: 'bouchez@et.esiea.fr · GitHub · LinkedIn', folder: 'Notes' },
    ],
  },
  {
    month: 'Avril',
    notes: [
      { title: 'Veille techno', date: '30/04/25', preview: 'Liquid glass, RSC, edge runtime…', folder: 'Personal', thumb: '/img/wikilink-race/preview.png' },
    ],
  },
];

// Fenêtre "Notes" macOS. Même pattern que ProjectWindow : drag via toolbar, position,
// pastille rouge ferme, pas de backdrop sombre. Chrome (toolbar + sidebar) en glass,
// contenu de la note opaque pour rester lisible.
export default function AboutModal({
  onClose,
  onFocus,
  zIndex = 100,
  initialPosition = null,
}: AboutModalProps) {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);

  // --- Positionnement initial ---
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

  // --- Orientation ---
  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsMobilePortrait(isMobile && isPortrait);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // --- Drag ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && windowRef.current) {
        const windowWidth = windowRef.current.offsetWidth;
        const windowHeight = windowRef.current.offsetHeight;
        const isMobile = window.innerWidth < 640;
        const dockHeight = isMobile ? 70 : 85;
        const menuBarHeight = 40;

        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;

        newX = Math.max(0, Math.min(newX, window.innerWidth - windowWidth));
        newY = Math.max(menuBarHeight, Math.min(newY, window.innerHeight - windowHeight - dockHeight));

        setPosition({ x: newX, y: newY });
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
    if ((e.target as HTMLElement).closest('button, .no-drag')) return;
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
      className="fixed rounded-[18px] overflow-hidden flex flex-col border border-black/10 bg-[#F5F5F7]"
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        opacity: position.x === -9999 ? 0 : 1,
        width: isMobilePortrait ? '95vw' : '900px',
        maxWidth: 'min(1100px, 94vw)',
        height: isMobilePortrait ? '85vh' : '600px',
        maxHeight: '90vh',
        boxShadow: '0 50px 120px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.5)',
      }}
    >
      {/* Toolbar verre (drag handle) — réplique macOS Notes */}
      <div
        className="shrink-0 flex items-center gap-1.5 px-3 py-2 cursor-move backdrop-blur-2xl backdrop-saturate-150 bg-white/45 border-b border-black/[0.06] z-20"
        onMouseDown={handleHeaderMouseDown}
      >
        {/* Window controls — clic rouge ferme */}
        <div className="flex gap-2 group cursor-pointer pr-1" onClick={onClose}>
          <button className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:brightness-90 transition" aria-label="Fermer" />
          <button className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:brightness-90 transition" />
          <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:brightness-90 transition" />
        </div>

        {/* Toggle sidebar (fonctionnel) */}
        <button
          onClick={() => setShowSidebar((s) => !s)}
          className={`p-1.5 rounded-full transition-colors ${
            showSidebar ? 'text-gray-800 bg-black/[0.07]' : 'text-gray-500 hover:bg-black/[0.06]'
          }`}
          aria-label="Afficher/masquer la liste"
          aria-pressed={showSidebar}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="9" y1="4" x2="9" y2="20" /></svg>
        </button>

        {/* Dossier sélectionné */}
        <div className="hidden sm:flex flex-col justify-center leading-tight ml-1 pointer-events-none select-none">
          <span className="text-[13px] font-semibold text-gray-700">All iCloud</span>
          <span className="text-[10px] text-gray-400">6 notes</span>
        </div>

        {/* Cluster d'actions (droite) */}
        <div className="ml-auto hidden md:flex items-center gap-0.5 text-gray-500">
          <button className="p-1.5 rounded-full hover:bg-black/[0.06] transition-colors" aria-label="Nouvelle note">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
          </button>
          <button className="p-1.5 rounded-full hover:bg-black/[0.06] transition-colors text-[15px] font-semibold leading-none" aria-label="Format">Aa</button>
          <button className="p-1.5 rounded-full hover:bg-black/[0.06] transition-colors" aria-label="Checklist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 6.5l1.2 1.2 2.3-2.4" /><path d="M3.5 12.5l1.2 1.2 2.3-2.4" /><path d="M3.5 18.5l1.2 1.2 2.3-2.4" /><line x1="11" y1="6" x2="20" y2="6" /><line x1="11" y1="12" x2="20" y2="12" /><line x1="11" y1="18" x2="20" y2="18" /></svg>
          </button>
          <button className="p-1.5 rounded-full hover:bg-black/[0.06] transition-colors" aria-label="Tableau">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="4" x2="9" y2="20" /><line x1="15" y1="4" x2="15" y2="20" /></svg>
          </button>
          <button className="p-1.5 rounded-full hover:bg-black/[0.06] transition-colors" aria-label="Pièce jointe">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11l-8.5 8.5a4 4 0 0 1-5.7-5.7L15 5.5a2.5 2.5 0 0 1 3.5 3.5L10 17.5a1 1 0 0 1-1.4-1.4l7.8-7.8" /></svg>
          </button>
          <button className="p-1.5 rounded-full hover:bg-black/[0.06] transition-colors" aria-label="Partager">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3" /><path d="M8 7l4-4 4 4" /><path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" /></svg>
          </button>
          <button className="p-1.5 rounded-full hover:bg-black/[0.06] transition-colors" aria-label="Plus">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
          </button>
        </div>

        {/* Champ recherche */}
        <div className="no-drag ml-1.5 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/[0.05] text-gray-400 text-sm w-28 lg:w-44 shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <span>Search</span>
        </div>
      </div>

      {/* Contenu : sidebar verre + note opaque */}
      <div className="flex flex-1 min-h-0">
        {/* Liste de notes (façade, style macOS) */}
        <div className={`${showSidebar ? 'hidden md:block' : 'hidden'} w-64 shrink-0 overflow-y-auto border-r border-black/[0.06] bg-white/35 backdrop-blur-xl py-1`}>
          {NOTE_GROUPS.map((group) => (
            <div key={group.month}>
              <div className="px-4 pt-3 pb-1 text-xs font-bold text-gray-600">{group.month}</div>
              {group.notes.map((n, i) => (
                <div
                  key={i}
                  className={`mx-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    n.selected ? 'bg-amber-200/50' : 'hover:bg-black/[0.04]'
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[13px] font-semibold text-gray-900 truncate">{n.title}</h3>
                      <p className="text-[11px] mt-0.5 truncate">
                        <span className="text-gray-600 font-medium">{n.date}</span>{' '}
                        <span className="text-gray-400">{n.preview}</span>
                      </p>
                      <div className="flex items-center gap-1 mt-1.5 text-[10px] text-gray-400">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
                        </svg>
                        {n.folder}
                      </div>
                    </div>
                    {n.thumb && (
                      <div className="w-11 h-11 rounded-md overflow-hidden shrink-0 bg-gray-200/60 border border-black/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={n.thumb} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Note (opaque, lisible) */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto p-8 sm:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">À propos de moi</h1>
            <div className="text-sm text-gray-400 mb-8">
              {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="space-y-6 text-[15px] leading-relaxed text-gray-800">
              <p>
                Je suis <strong>Romain Bouchez</strong>, étudiant en école d'ingénieur à l'<strong>ESIEA</strong> avec une forte appétence pour l'<strong>Intelligence Artificielle</strong> et le <strong>Machine Learning</strong>. Mon parcours académique m'a permis d'acquérir de solides bases en programmation (Python, C), en algorithmique et en analyse de données.
              </p>
              <p>
                Fasciné par la capacité des modèles à extraire des tendances et à automatiser des tâches complexes, je souhaite orienter ma carrière vers l'ingénierie IA. Je suis actuellement à la recherche d'un stage stimulant où je pourrais mettre en pratique mes connaissances et contribuer à des projets ayant un impact réel.
              </p>
              <p>
                Curieux et autonome, mon objectif est de rejoindre une équipe innovante pour développer des solutions intelligentes, tout en continuant à apprendre et à repousser les limites de mes compétences techniques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
