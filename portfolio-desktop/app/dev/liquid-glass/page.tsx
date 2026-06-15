'use client';

import { useState } from 'react';
import LiquidGlass from '@/components/LiquidGlass';

// Labo Liquid Glass — valeurs par défaut = specs Figma (blur 10, highlight .4, shade .2, stroke 5/100/5).
// Page isolée : /dev/liquid-glass. Hors prod.

const BACKGROUNDS = [
  { id: 'gradient', label: 'Dégradé', src: '' },
  { id: 'isitopen', label: 'Photo colorée', src: '/img/isitopen/isitopen_preview.png' },
  { id: 'aical', label: 'Photo sombre', src: '/img/AiCal/aical-mainpage.jpg' },
  { id: 'twitthe', label: 'Photo claire', src: '/img/Twitthe/Twitthe-home.png' },
];

function Slider({
  label, value, min, max, step, onChange, suffix = '',
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; suffix?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-white/90">
      <span className="flex justify-between text-xs">
        <span>{label}</span>
        <span className="font-mono text-white">{value}{suffix}</span>
      </span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-white"
      />
    </label>
  );
}

export default function LiquidGlassLab() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [blur, setBlur] = useState(10);
  const [saturation, setSaturation] = useState(180);
  const [tintAlpha, setTintAlpha] = useState(0.2);
  const [highlight, setHighlight] = useState(0.4);
  const [shade, setShade] = useState(0.2);
  const [sideShade, setSideShade] = useState(0.3);
  const [strokeMid, setStrokeMid] = useState(1);
  const [strokeEdge, setStrokeEdge] = useState(0.05);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [strokeBlack, setStrokeBlack] = useState(true);
  const [shadow, setShadow] = useState(true);
  const [specular, setSpecular] = useState(false);
  const [specularOpacity, setSpecularOpacity] = useState(0.4);
  const [bg, setBg] = useState(BACKGROUNDS[0]);

  const tint = mode === 'dark'
    ? `rgba(20,20,22,${tintAlpha})`
    : `rgba(255,255,255,${tintAlpha})`;
  const strokeColor = strokeBlack ? '0,0,0' : '255,255,255';

  // Props communes (recette Figma)
  const glass = { blur, saturation, tint, highlight, shade, sideShade, strokeMid, strokeEdge, strokeWidth, strokeColor, shadow, specular, specularOpacity };

  const textColor = mode === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Fond de test */}
      <div className="absolute inset-0 z-0">
        {bg.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bg.src} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400" />
        )}
      </div>

      {/* Panneau de contrôle */}
      <LiquidGlass
        as="aside"
        radius={20}
        tint="rgba(20,20,22,0.6)"
        strokeColor="255,255,255"
        strokeMid={0.25}
        blur={24}
        saturation={150}
        className="fixed top-4 left-4 z-30 w-[300px] max-h-[94vh] overflow-y-auto"
        contentClassName="p-5 space-y-3"
      >
        <h1 className="text-white font-semibold text-sm">Liquid Glass — Labo</h1>

        <div className="flex gap-2">
          {(['light', 'dark'] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium border ${
                mode === m ? 'bg-white text-gray-900 border-white' : 'bg-white/10 text-white border-white/20'
              }`}>
              {m === 'light' ? 'Verre clair' : 'Verre sombre'}
            </button>
          ))}
        </div>

        <Slider label="Background blur" value={blur} min={0} max={40} step={1} onChange={setBlur} suffix="px" />
        <Slider label="Saturation" value={saturation} min={100} max={220} step={5} onChange={setSaturation} suffix="%" />
        <Slider label="Teinte (alpha)" value={tintAlpha} min={0} max={0.5} step={0.01} onChange={setTintAlpha} />
        <Slider label="Inner haut blanc (40%)" value={highlight} min={0} max={1} step={0.05} onChange={setHighlight} />
        <Slider label="Inner bas noir (20%)" value={shade} min={0} max={0.6} step={0.01} onChange={setShade} />
        <Slider label="Côtés noirs G/D (sans blob)" value={sideShade} min={0} max={0.6} step={0.01} onChange={setSideShade} />
        <Slider label="Stroke milieu (100%)" value={strokeMid} min={0} max={1} step={0.05} onChange={setStrokeMid} />
        <Slider label="Stroke bord (5%)" value={strokeEdge} min={0} max={0.5} step={0.01} onChange={setStrokeEdge} />
        <Slider label="Stroke épaisseur" value={strokeWidth} min={0} max={4} step={0.5} onChange={setStrokeWidth} suffix="px" />
        <Slider label="Reflet (opacité)" value={specularOpacity} min={0} max={1} step={0.05} onChange={setSpecularOpacity} />

        <div className="flex flex-wrap gap-3 text-xs text-white/90">
          <label className="flex items-center gap-1.5"><input type="checkbox" checked={strokeBlack} onChange={(e) => setStrokeBlack(e.target.checked)} /> Stroke noir</label>
          <label className="flex items-center gap-1.5"><input type="checkbox" checked={shadow} onChange={(e) => setShadow(e.target.checked)} /> Ombre</label>
          <label className="flex items-center gap-1.5"><input type="checkbox" checked={specular} onChange={(e) => setSpecular(e.target.checked)} /> Reflet</label>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {BACKGROUNDS.map((b) => (
            <button key={b.id} onClick={() => setBg(b)}
              className={`px-2 py-1 rounded text-[11px] border ${
                bg.id === b.id ? 'bg-white text-gray-900 border-white' : 'bg-white/10 text-white border-white/20'
              }`}>
              {b.label}
            </button>
          ))}
        </div>

        <pre className="text-[10px] text-white/70 bg-black/30 rounded-lg p-2 whitespace-pre-wrap leading-relaxed">{`blur=${blur} sat=${saturation}
tint="${tint}"
highlight=${highlight} shade=${shade} sideShade=${sideShade}
stroke: edge=${strokeEdge} mid=${strokeMid} w=${strokeWidth} ${strokeBlack ? 'noir' : 'blanc'}
specular=${specular ? specularOpacity : 'off'} shadow=${shadow}`}</pre>
      </LiquidGlass>

      {/* Zone d'exemples */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-7 pl-[320px] pr-8 py-12">

        {/* Now-playing (capsule) */}
        <LiquidGlass {...glass} radius={9999} className="w-[460px]" contentClassName="flex items-center gap-3 pl-3 pr-5 py-2.5">
          <span className="w-12 h-12 rounded-xl bg-green-700 flex items-center justify-center text-white text-[10px] font-bold shrink-0 text-center leading-tight">FB<br />RAMBLE</span>
          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-[15px] truncate ${textColor}`}>My kind of buffet</p>
            <p className={`text-[13px] truncate ${mode === 'dark' ? 'text-white/60' : 'text-gray-500'}`}>🖥 March 18</p>
          </div>
          <svg className={textColor} width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          <span className={`text-xs font-semibold ${textColor}`}>↺30</span>
        </LiquidGlass>

        {/* Tab bar (capsule) avec onglet actif imbriqué */}
        <LiquidGlass {...glass} radius={9999} className="w-[520px]" contentClassName="flex items-stretch justify-between px-2 py-2">
          {[
            { ic: <path d="M3 11l9-8 9 8M5 10v10h14V10" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" />, label: 'Home', active: true },
            { ic: <g fill="currentColor"><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></g>, label: 'New' },
            { ic: <g stroke="currentColor" strokeWidth="1.8" fill="none"><circle cx="12" cy="11" r="3" /><path d="M7 16a7 7 0 0110 0M5 18.5a11 11 0 0114 0" /></g>, label: 'Library' },
            { ic: <g stroke="currentColor" strokeWidth="1.8" fill="none"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" /></g>, label: 'Search' },
          ].map((tab, i) =>
            tab.active ? (
              <LiquidGlass key={i} radius={9999} tint="rgba(255,255,255,0.35)" highlight={0.6} shade={0.05} strokeMid={0.1} strokeEdge={0.02} shadow={false} blur={2} saturation={120}
                contentClassName="flex flex-col items-center justify-center gap-1 px-7 py-1.5">
                <svg className="text-violet-600" width="24" height="24" viewBox="0 0 24 24">{tab.ic}</svg>
                <span className="text-[12px] font-semibold text-violet-600">{tab.label}</span>
              </LiquidGlass>
            ) : (
              <button key={i} className={`flex flex-col items-center justify-center gap-1 px-6 py-1.5 ${textColor}`}>
                <svg width="24" height="24" viewBox="0 0 24 24">{tab.ic}</svg>
                <span className="text-[12px] font-medium">{tab.label}</span>
              </button>
            )
          )}
        </LiquidGlass>

        {/* Slider à thumb squircle */}
        <div className="w-[420px] flex items-center gap-3">
          <span className={textColor}>▥</span>
          <div className="relative flex-1 h-2 rounded-full bg-white/40">
            <div className="absolute inset-y-0 left-0 w-[78%] rounded-full bg-blue-500" />
            <LiquidGlass {...glass} radius={14} className="absolute top-1/2 left-[78%] -translate-x-1/2 -translate-y-1/2 w-12 h-9" contentClassName="" />
          </div>
          <span className={textColor}>▤</span>
        </div>

        {/* Composants génériques */}
        <div className="flex items-center gap-4 flex-wrap justify-center pt-2">
          <LiquidGlass as="button" {...glass} radius={9999} contentClassName={`px-7 py-3 flex items-center justify-center font-semibold text-sm ${textColor}`}>
            OBTENIR
          </LiquidGlass>
          <LiquidGlass as="button" {...glass} radius={9999} contentClassName={`w-12 h-12 flex items-center justify-center ${textColor}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </LiquidGlass>
          <LiquidGlass {...glass} radius={22} className="w-[300px]" contentClassName="p-5">
            <h2 className={`font-semibold ${textColor}`}>Panneau verre</h2>
            <p className={`text-sm mt-1 ${mode === 'dark' ? 'text-white/70' : 'text-gray-700'}`}>Lisibilité du texte au-dessus du matériau.</p>
          </LiquidGlass>
        </div>

      </div>
    </main>
  );
}
