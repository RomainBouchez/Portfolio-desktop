'use client';

import React from 'react';

// Composant "Liquid Glass" (iOS 26) — recette exacte du calque Figma :
//   • Fill #FFFFFF 20%
//   • Background blur 10
//   • Inner shadow haut : y=+2, blur 4, #FFFFFF 40%  → highlight blanc net
//   • Inner shadow bas  : y=-2, blur 4, #000000 20%  → ombre basse
//   • Stroke linéaire vertical #000 5% → 100% → 5%   → rendu en OVERLAY MASQUÉ
//     (bord net qui suit le radius ; inner shadow colle au vrai bord, pas décalée).
// Tout paramétrable (le labo /dev/liquid-glass pilote ces valeurs en live).

export interface LiquidGlassProps extends React.AllHTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements;
  /** Background blur (px) — Figma "Background blur" */
  blur?: number;
  /** Saturation backdrop (%) — vibrance des couleurs derrière le verre */
  saturation?: number;
  /** Fill / teinte du verre, ex 'rgba(255,255,255,0.20)' (Figma #FFF 20%) */
  tint?: string;
  /** Rayon des coins (px ou string). 9999 = capsule */
  radius?: number | string;
  /** Inner shadow haut blanc — alpha (Figma #FFF 40% = 0.4) */
  highlight?: number;
  /** Inner shadow bas noir — alpha (Figma #000 20% = 0.2) */
  shade?: number;
  /** Inner shadow gauche+droite noir — alpha. Côtés sombres "lentille" SANS blob aux extrémités
   *  (contrairement au stroke dégradé vertical). 0 = désactivé. */
  sideShade?: number;
  /** Stroke dégradé : alpha au milieu (Figma 100% = 1) */
  strokeMid?: number;
  /** Stroke dégradé : alpha aux bords (Figma 5% = 0.05) */
  strokeEdge?: number;
  /** Épaisseur du stroke (px) */
  strokeWidth?: number;
  /** Couleur RGB du stroke, ex '0,0,0' (noir) ou '255,255,255' (blanc) */
  strokeColor?: string;
  /** Ombre portée flottante */
  shadow?: boolean;
  /** Reflet spéculaire dégradé en haut (en plus de l'inner shadow) */
  specular?: boolean;
  /** Opacité du reflet spéculaire (0–1) */
  specularOpacity?: number;
  /** overflow du conteneur. 'hidden' (défaut) clippe ; 'visible' pour laisser dépasser (ex: loupe du dock) */
  overflow?: React.CSSProperties['overflow'];
  /** Classes du wrapper de contenu (ex 'flex items-center gap-2 px-4') */
  contentClassName?: string;
}

export default function LiquidGlass({
  as = 'div',
  blur = 10,
  saturation = 180,
  tint = 'rgba(255,255,255,0.20)',
  radius = 9999,
  highlight = 0.4,
  shade = 0.2,
  sideShade = 0,
  strokeMid = 1,
  strokeEdge = 0.05,
  strokeWidth = 1,
  strokeColor = '0,0,0',
  shadow = true,
  specular = false,
  specularOpacity = 0.4,
  overflow = 'hidden',
  className = '',
  contentClassName = '',
  style,
  children,
  ...rest
}: LiquidGlassProps) {
  const Tag = as as React.ElementType;
  const r = typeof radius === 'number' ? `${radius}px` : radius;

  const boxShadow = [
    `inset 0 2px 4px rgba(255,255,255,${highlight})`,                       // haut → blanc 40%
    `inset 0 -2px 4px rgba(0,0,0,${shade})`,                                // bas → noir 20%
    sideShade > 0 ? `inset 4px 0 6px -2px rgba(0,0,0,${sideShade})` : '',   // gauche → noir
    sideShade > 0 ? `inset -4px 0 6px -2px rgba(0,0,0,${sideShade})` : '',  // droite → noir
    shadow ? '0 12px 32px rgba(0,0,0,0.18)' : '',
  ]
    .filter(Boolean)
    .join(', ');

  // Stroke dégradé vertical rendu en overlay masqué → bord net qui suit le radius
  const ring = `linear-gradient(to bottom, rgba(${strokeColor},${strokeEdge}), rgba(${strokeColor},${strokeMid}) 50%, rgba(${strokeColor},${strokeEdge}))`;

  return (
    <Tag
      className={`relative isolate ${className}`}
      style={{
        borderRadius: r,
        overflow,
        background: tint,
        backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
        boxShadow,
        ...style,
      }}
      {...rest}
    >
      {specular && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            borderRadius: r,
            background: `linear-gradient(to bottom, rgba(255,255,255,${specularOpacity}), rgba(255,255,255,0) 45%)`,
          }}
        />
      )}

      {/* Stroke dégradé (overlay masqué) */}
      {strokeWidth > 0 && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            borderRadius: r,
            padding: `${strokeWidth}px`,
            background: ring,
            boxSizing: 'border-box',
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            maskComposite: 'exclude',
          }}
        />
      )}

      <span className={`relative z-[3] block h-full w-full ${contentClassName}`}>{children}</span>
    </Tag>
  );
}
