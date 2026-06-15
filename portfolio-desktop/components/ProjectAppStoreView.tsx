'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/projects';
import { useLanguage } from '@/context/LanguageContext';
import LiquidGlass from '@/components/LiquidGlass';

// Vue projet style "App Store macOS" + liquid glass.
// Présentationnel : pas de chrome fenêtre, pas de drag. Le wrapper (ProjectWindow / galerie) fournit la toolbar.
// Theme-aware via `isDark` (dérivé de project.modalTheme).

const labels = {
  fr: {
    get: 'OBTENIR',
    open: 'OUVRIR',
    code: 'Code source',
    status: 'Statut',
    features: 'Features',
    stack: 'Stack',
    techs: 'techs',
    inProgress: 'En cours',
    live: 'En ligne',
    done: 'Terminé',
    highlights: 'Points forts',
    description: 'Description',
    technologies: 'Technologies',
    information: 'Informations',
    developer: 'Développeur',
    contact: 'Contact',
    demo: 'Démo',
  },
  en: {
    get: 'GET',
    open: 'OPEN',
    code: 'Source code',
    status: 'Status',
    features: 'Features',
    stack: 'Stack',
    techs: 'techs',
    inProgress: 'In progress',
    live: 'Live',
    done: 'Shipped',
    highlights: 'Highlights',
    description: 'Description',
    technologies: 'Technologies',
    information: 'Information',
    developer: 'Developer',
    contact: 'Contact',
    demo: 'Demo',
  },
};

// Couleur de marque d'une techno (match par sous-chaîne, ordre = priorité).
// 'javascript' AVANT 'java' (sinon "javascript".includes('java') = true).
const TECH_COLORS: [string, string][] = [
  ['next', '#000000'],
  ['react', '#61DAFB'],
  ['tailwind', '#38BDF8'],
  ['typescript', '#3178C6'],
  ['javascript', '#F7DF1E'],
  ['vanilla js', '#F7DF1E'],
  ['node', '#5FA04E'],
  ['pandas', '#150458'],
  ['python', '#3776AB'],
  ['php', '#777BB4'],
  ['spring', '#6DB33F'],
  ['java', '#E76F00'],
  ['maven', '#C71A36'],
  ['thymeleaf', '#005F0F'],
  ['mysql', '#00758F'],
  ['postgres', '#336791'],
  ['neondb', '#00E599'],
  ['prisma', '#5A67D8'],
  ['firebase', '#FFCA28'],
  ['clerk', '#6C47FF'],
  ['vite', '#646CFF'],
  ['gsap', '#88CE02'],
  ['framer', '#FF0080'],
  ['motion', '#FF0080'],
  ['gemini', '#8E75FF'],
  ['pytorch', '#EE4C2C'],
  ['deep learning', '#8E75FF'],
  ['computer vision', '#8E75FF'],
  ['websocket', '#5FA04E'],
  ['cryptojs', '#F7DF1E'],
  ['arduino', '#00979D'],
  ['stockfish', '#5A5A5A'],
  ['robotics', '#0EA5E9'],
  ['3d printing', '#0EA5E9'],
  ['google maps', '#34A853'],
  ['folium', '#77B829'],
  ['wikipedia', '#3366CC'],
];

function techColor(name: string): string {
  const n = name.toLowerCase();
  for (const [key, color] of TECH_COLORS) if (n.includes(key)) return color;
  return '#9CA3AF'; // neutre
}

// Slug Simple Icons par techno (tous vérifiés HTTP 200 sur cdn.simpleicons.org).
// Le logo s'affiche en couleur de marque dans une pastille blanche → visible thème clair ET sombre.
// 'spring' avant 'java', 'javascript' avant 'java'. Non couvert (WebSockets, CryptoJS, GSAP…) → null → pastille couleur.
const TECH_SLUGS: [string, string][] = [
  ['next', 'nextdotjs'],
  ['react', 'react'],
  ['tailwind', 'tailwindcss'],
  ['typescript', 'typescript'],
  ['javascript', 'javascript'],
  ['vanilla js', 'javascript'],
  ['node', 'nodedotjs'],
  ['pandas', 'pandas'],
  ['python', 'python'],
  ['php', 'php'],
  ['spring', 'springboot'],
  ['maven', 'apachemaven'],
  ['thymeleaf', 'thymeleaf'],
  ['mysql', 'mysql'],
  ['postgres', 'postgresql'],
  ['neondb', 'neon'],
  ['prisma', 'prisma'],
  ['firebase', 'firebase'],
  ['clerk', 'clerk'],
  ['vite', 'vite'],
  ['framer', 'framer'],
  ['motion', 'framer'],
  ['gemini', 'googlegemini'],
  ['pytorch', 'pytorch'],
  ['arduino', 'arduino'],
  ['google maps', 'googlemaps'],
  ['wikipedia', 'wikipedia'],
];

function techSlug(name: string): string | null {
  const n = name.toLowerCase();
  for (const [key, slug] of TECH_SLUGS) if (n.includes(key)) return slug;
  return null;
}

// Hostname lisible depuis une URL absolue (null si relative/locale)
function hostname(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

// Ligne label → valeur de la fiche Informations (style App Store)
function InfoRow({
  label,
  value,
  c,
  children,
}: {
  label: string;
  value?: string;
  c: { muted: string; statValue: string };
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
      <span className={`shrink-0 ${c.muted}`}>{label}</span>
      {value ? (
        <span className={`font-medium text-right truncate ${c.statValue}`}>{value}</span>
      ) : (
        <span className="text-right min-w-0">{children}</span>
      )}
    </div>
  );
}

export default function ProjectAppStoreView({
  project,
  isDark = false,
}: {
  project: Project;
  isDark?: boolean;
}) {
  const { language } = useLanguage();
  const t = labels[language];

  const statusLabel =
    project.status === 'In Progress' ? t.inProgress : project.demoUrl ? t.live : t.done;
  const statusDot =
    project.status === 'In Progress' ? 'bg-amber-400' : project.demoUrl ? 'bg-green-500' : 'bg-gray-400';

  // Palette glass selon thème
  const c = isDark
    ? {
        contentBg: 'bg-[#1c1c1e]/65',
        text: 'text-white',
        sub: 'text-gray-300',
        muted: 'text-gray-400',
        border: 'border-white/10',
        card: 'bg-white/[0.07] border-white/10 hover:bg-white/[0.12]',
        chip: 'bg-white/10 border-white/10 text-gray-200',
        heroTint: 'bg-black/55',
        primaryBtn: 'bg-white text-black hover:bg-gray-200',
        statValue: 'text-gray-100',
        panel: 'bg-white/[0.06] border-white/10',
        divide: 'divide-white/10',
        link: 'text-[#4aa3ff]',
      }
    : {
        contentBg: 'bg-white/70',
        text: 'text-gray-900',
        sub: 'text-gray-600',
        muted: 'text-gray-500',
        border: 'border-black/[0.06]',
        card: 'bg-white/55 border-white/60 hover:bg-white/75',
        chip: 'bg-white/55 border-white/60 text-gray-700',
        heroTint: 'bg-white/55',
        primaryBtn: 'bg-[#0A84FF] text-white hover:bg-[#0a78ef]',
        statValue: 'text-gray-800',
        panel: 'bg-white/55 border-white/60',
        divide: 'divide-black/[0.06]',
        link: 'text-[#0A84FF]',
      };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Backdrop ambiant : hero floutée + teinte → donne au verre de quoi réfracter */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.image}
          alt=""
          fill
          className={`object-cover scale-110 blur-3xl ${isDark ? 'brightness-50' : 'brightness-100'}`}
          aria-hidden
        />
        <div className={`absolute inset-0 ${c.heroTint}`} />
      </div>

      {/* Contenu scrollable (verre translucide au-dessus du backdrop) */}
      <div className={`relative z-10 h-full overflow-y-auto ${c.contentBg} backdrop-blur-2xl backdrop-saturate-150`}>
        {/* Hero captures (nette) */}
        <div className="relative h-[190px] sm:h-[250px] w-full shrink-0">
          <Image
            src={project.modalImage || project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#1c1c1e]' : 'from-white/80'} via-transparent to-transparent`} />
        </div>

        {/* Header : icône + titre + CTA */}
        <div className={`flex items-center gap-4 sm:gap-5 px-5 sm:px-8 py-5 border-b ${c.border}`}>
          <div className="relative w-16 h-16 sm:w-[88px] sm:h-[88px] shrink-0 rounded-[18px] overflow-hidden border border-white/50 shadow-lg bg-white/40">
            <Image src={project.icon} alt="" fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${c.text}`}>{project.title}</h1>
            <p className={`text-sm sm:text-base mt-1 line-clamp-2 ${c.sub}`}>{project.subtitle}</p>
            <p className={`text-xs mt-0.5 ${c.muted}`}>Romain Bouchez</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            {project.demoUrl && (
              <LiquidGlass
                as="a"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                radius={9999}
                blur={6}
                tint="rgba(10,132,255,0.7)"
                strokeColor="255,255,255"
                strokeEdge={0.35}
                strokeMid={0.35}
                highlight={0.55}
                shade={0.12}
                className="transition-all duration-200 ease-out hover:brightness-110 hover:scale-[1.04] active:scale-95 cursor-pointer"
                contentClassName="px-7 py-2 flex items-center justify-center text-sm font-semibold text-white"
              >
                {t.open}
              </LiquidGlass>
            )}
            {!project.demoUrl && project.githubUrl && (
              <LiquidGlass
                as="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                radius={9999}
                blur={6}
                tint={isDark ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.55)'}
                strokeColor={isDark ? '255,255,255' : '0,0,0'}
                strokeEdge={0.06}
                strokeMid={0.2}
                highlight={isDark ? 0.25 : 0.5}
                shade={0.1}
                className={c.text}
                contentClassName="px-7 py-2 flex items-center justify-center text-sm font-semibold"
              >
                {t.code}
              </LiquidGlass>
            )}
            {project.demoUrl && project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs transition-opacity hover:opacity-70 ${c.muted}`}
              >
                {t.code}
              </a>
            )}
          </div>
        </div>

        {/* Barre stats */}
        <div className={`grid grid-cols-3 border-b ${c.border}`}>
          {[
            { label: t.status, value: statusLabel },
            { label: t.features, value: String(project.features.length) },
            { label: t.stack, value: `${project.technologies.length} ${t.techs}` },
          ].map((s, i) => (
            <div key={i} className={`py-3 text-center ${i < 2 ? `border-r ${c.border}` : ''}`}>
              <p className={`text-[11px] uppercase tracking-wider ${c.muted}`}>{s.label}</p>
              <p className={`text-sm font-semibold mt-0.5 ${c.statValue}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Contenu */}
        <div className="px-5 sm:px-8 py-6 space-y-8">
          {/* Points forts */}
          <section>
            <h2 className={`text-lg font-semibold mb-4 ${c.text}`}>{t.highlights}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((f, i) => (
                <div
                  key={i}
                  className={`flex gap-3 p-4 rounded-2xl backdrop-blur-xl border shadow-sm transition-colors ${c.card}`}
                >
                  <span className="text-2xl shrink-0 leading-none">{f.icon}</span>
                  <div className="min-w-0">
                    <h3 className={`text-sm font-semibold ${c.text}`}>{f.title}</h3>
                    <p className={`text-xs leading-relaxed mt-1 whitespace-pre-line ${c.sub}`}>{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className={`text-lg font-semibold mb-3 ${c.text}`}>{t.description}</h2>
            <p className={`text-sm leading-relaxed ${c.sub}`}>{project.description}</p>
          </section>

          {/* Technologies */}
          <section>
            <h2 className={`text-lg font-semibold mb-3 ${c.text}`}>{t.technologies}</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => {
                const slug = techSlug(tech);
                return (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1 rounded-full backdrop-blur-md border text-sm font-medium transition-transform duration-200 hover:scale-105 ${c.chip}`}
                  >
                    {slug ? (
                      <span className="w-6 h-6 rounded-full bg-white border border-black/5 flex items-center justify-center shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://cdn.simpleicons.org/${slug}`}
                          alt=""
                          width={14}
                          height={14}
                          className="w-3.5 h-3.5"
                          loading="lazy"
                        />
                      </span>
                    ) : (
                      <span
                        className="w-6 h-6 rounded-full bg-white border border-black/5 flex items-center justify-center shrink-0"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: techColor(tech) }}
                        />
                      </span>
                    )}
                    {tech}
                  </span>
                );
              })}
            </div>
          </section>

          {/* Informations */}
          <section>
            <h2 className={`text-lg font-semibold mb-3 ${c.text}`}>{t.information}</h2>
            <div className={`rounded-2xl backdrop-blur-xl border divide-y overflow-hidden ${c.panel} ${c.divide}`}>
              <InfoRow label={t.developer} value="Romain Bouchez" c={c} />
              <InfoRow label={t.contact} c={c}>
                <a href={`mailto:${project.email}`} className={`font-medium hover:underline ${c.link}`}>
                  {project.email}
                </a>
              </InfoRow>
              <InfoRow label={t.status} c={c}>
                <span className="inline-flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusDot}`} />
                  <span className={`font-medium ${c.statValue}`}>{statusLabel}</span>
                </span>
              </InfoRow>
              {project.demoUrl && (
                <InfoRow label={t.demo} c={c}>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`font-medium hover:underline ${c.link}`}>
                    {hostname(project.demoUrl) || t.open} ↗
                  </a>
                </InfoRow>
              )}
              {project.githubUrl && (
                <InfoRow label={t.code} c={c}>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`font-medium hover:underline ${c.link}`}>
                    GitHub ↗
                  </a>
                </InfoRow>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
