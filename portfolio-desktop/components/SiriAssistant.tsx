'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { projects } from '@/lib/projects';

// "Faux" assistant Siri : Q&A scriptée (matching mots-clés) sur Romain. Pas d'API → déterministe, gratuit, offline.

type Msg = { role: 'user' | 'assistant'; text: string };

const SUGGESTIONS: Record<'fr' | 'en', string[]> = {
  fr: ['Qui est Romain ?', 'Ses compétences ?', 'Ses projets ?', 'Cherche-t-il un stage ?', 'Le contacter ?'],
  en: ['Who is Romain?', 'His skills?', 'His projects?', 'Looking for an internship?', 'Contact him?'],
};

function answerFor(qRaw: string, language: 'fr' | 'en'): string {
  const q = qRaw.toLowerCase();
  const fr = language === 'fr';
  const has = (...k: string[]) => k.some((x) => q.includes(x));
  const titles = projects
    .filter((p) => !p.status)
    .slice(0, 4)
    .map((p) => p.title)
    .join(', ');

  if (has('comp', 'skill', 'techno', 'stack', 'langage', 'tech'))
    return fr
      ? "Stack principale : Next.js, React, TypeScript, Python (PyTorch), PHP, Java Spring. Romain aime l'IA, le Machine Learning et le développement full-stack."
      : 'Main stack: Next.js, React, TypeScript, Python (PyTorch), PHP, Java Spring. Romain loves AI, Machine Learning and full-stack development.';
  if (has('projet', 'project', 'réalis', 'realis', 'fait', 'build', 'app'))
    return fr
      ? `Il a réalisé une dizaine de projets, dont ${titles}. Clique sur les icônes du bureau pour les explorer !`
      : `He built around a dozen projects, including ${titles}. Click the desktop icons to explore them!`;
  if (has('stage', 'intern', 'job', 'emploi', 'recrut', 'hire', 'oppor'))
    return fr
      ? 'Oui ! Romain recherche un stage en ingénierie IA / Machine Learning pour mettre en pratique ses compétences.'
      : 'Yes! Romain is looking for an AI / Machine Learning engineering internship to apply his skills.';
  if (has('contact', 'mail', 'email', 'joindre', 'github', 'linkedin', 'reach'))
    return fr
      ? 'Email : bouchez@et.esiea.fr — GitHub : github.com/RomainBouchez'
      : 'Email: bouchez@et.esiea.fr — GitHub: github.com/RomainBouchez';
  if (has('parcours', 'école', 'ecole', 'esiea', 'étud', 'etud', 'formation', 'cursus', 'school', 'study', 'background'))
    return fr
      ? "Cycle ingénieur à l'ESIEA (spécialisation IA / data), avec un échange à HvA Amsterdam (projet data sur les transports)."
      : 'Engineering degree at ESIEA (AI / data major), with an exchange at HvA Amsterdam (a transport data project).';
  if (has('qui', 'who', 'présent', 'present', 'romain', 'about'))
    return fr
      ? "Romain Bouchez, étudiant ingénieur à l'ESIEA, passionné d'IA et de Machine Learning. Il conçoit des apps web modernes et des projets data/IA."
      : 'Romain Bouchez, an engineering student at ESIEA, passionate about AI and Machine Learning. He builds modern web apps and data/AI projects.';

  return fr
    ? "Bonne question ! Je suis un assistant de démo. Essaie : ses compétences, ses projets, son parcours, ou comment le contacter."
    : "Good question! I'm a demo assistant. Try: his skills, his projects, his background, or how to contact him.";
}

// Orbe Siri = logo Apple Siri officiel, avec un léger pulse
function SiriOrb({ size = 56 }: { size?: number }) {
  return (
    <motion.div
      className="shrink-0"
      style={{ width: size, height: size, willChange: 'transform' }}
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon/siri-orb.png"
        alt=""
        className="w-full h-full select-none object-contain"
        draggable={false}
        style={{ filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.3))' }}
      />
    </motion.div>
  );
}

// Effet machine à écrire pour la dernière réponse
function Typewriter({ text, onTick }: { text: string; onTick?: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    setN(0);
    const id = setInterval(() => {
      i += 1;
      setN(i);
      onTick?.();
      if (i >= text.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [text, onTick]);
  return <span>{text.slice(0, n)}</span>;
}

export default function SiriAssistant() {
  const { language } = useLanguage();
  const fr = language === 'fr';
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const ask = (q: string) => {
    const question = q.trim();
    if (!question) return;
    const a = answerFor(question, language);
    setMessages((m) => [...m, { role: 'user', text: question }, { role: 'assistant', text: a }]);
    setInput('');
  };

  const stickToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    stickToBottom();
  }, [messages, stickToBottom]);

  return (
    <motion.div
      onClick={() => {
        if (!open) setOpen(true);
      }}
      className="fixed bottom-6 right-4 sm:right-6 z-[9999] overflow-hidden border border-black/[0.06] bg-white/75 backdrop-blur-2xl backdrop-saturate-150"
      style={{
        transformOrigin: 'bottom right',
        maxWidth: 'calc(100vw - 2rem)',
        maxHeight: 'calc(100vh - 7rem)',
        cursor: open ? 'default' : 'pointer',
        boxShadow: open
          ? '0 30px 80px -20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)'
          : '0 12px 30px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.6)',
      }}
      initial={false}
      animate={{ width: open ? 360 : 64, height: open ? 520 : 64, borderRadius: open ? 26 : 32 }}
      transition={{ type: 'spring', damping: 30, stiffness: 320 }}
      aria-label={fr ? 'Assistant IA' : 'AI assistant'}
    >
      {/* Couche orbe (état fermé) */}
      <motion.div
        className="absolute bottom-0 right-0 w-16 h-16 flex items-center justify-center pointer-events-none"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      >
        <SiriOrb size={52} />
      </motion.div>

      {/* Couche panneau (état ouvert) — taille finale fixe, révélée par le conteneur qui grandit */}
      <motion.div
        className="absolute bottom-0 right-0 flex flex-col"
        style={{
          width: 360,
          height: 520,
          maxWidth: 'calc(100vw - 2rem)',
          maxHeight: 'calc(100vh - 7rem)',
          pointerEvents: open ? 'auto' : 'none',
        }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2, delay: open ? 0.1 : 0 }}
        onClick={(e) => e.stopPropagation()}
      >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-black/[0.06] shrink-0">
              <SiriOrb size={28} />
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-sm leading-none">Assistant</p>
                <p className="text-gray-500 text-[11px] mt-1">{fr ? 'Pose une question sur Romain' : 'Ask about Romain'}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/5 text-gray-500 transition-colors"
                aria-label={fr ? 'Fermer' : 'Close'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[140px]"
              style={{ transform: 'translateZ(0)', contain: 'paint', overscrollBehavior: 'contain' }}
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center text-center py-4 gap-4">
                  <SiriOrb size={64} />
                  <p className="text-gray-600 text-sm max-w-[250px]">
                    {fr
                      ? 'Bonjour 👋 Pose-moi une question sur Romain — projets, compétences, parcours…'
                      : 'Hi 👋 Ask me anything about Romain — projects, skills, background…'}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-1">
                    {SUGGESTIONS[language].map((s, i) => (
                      <button
                        key={i}
                        onClick={() => ask(s)}
                        className="px-3 py-1.5 rounded-full text-xs text-gray-700 bg-black/[0.05] hover:bg-black/[0.09] border border-black/[0.06] transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[82%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-black/[0.05] text-gray-800 rounded-bl-md'
                      }`}
                    >
                      {m.role === 'assistant' && i === messages.length - 1 ? <Typewriter text={m.text} onTick={stickToBottom} /> : m.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-black/[0.06] flex items-center gap-2 shrink-0">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') ask(input);
                }}
                placeholder={fr ? 'Écris ta question…' : 'Type your question…'}
                className="flex-1 min-w-0 bg-black/[0.04] text-gray-900 placeholder-gray-400 text-sm rounded-full px-4 py-2 outline-none border border-black/[0.08] focus:border-black/20 transition-colors"
              />
              <button
                onClick={() => ask(input)}
                className="w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shrink-0 transition-colors"
                aria-label={fr ? 'Envoyer' : 'Send'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
      </motion.div>
    </motion.div>
  );
}
