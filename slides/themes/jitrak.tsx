import type { CSSProperties, ReactNode } from 'react';
import type { SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import jLogo from '../assets/brand/j-logo-black.png';

export const jitrak = {
  bg: '#0a0f0d',
  text: '#e2e8f0',
  muted: '#94a3b8',
  accent: '#10b981',
  accentAlt: '#00bb7f',
  link: '#22d3ee',
  font: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export type BrandMode = 'hero' | 'corner' | false;

export function slideRoot(extra: CSSProperties = {}): CSSProperties {
  return {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    background: jitrak.bg,
    color: jitrak.text,
    fontFamily: jitrak.font,
    padding: '72px 96px',
    ...extra,
  };
}

export function brandedRoot(brand: BrandMode = false, extra: CSSProperties = {}): CSSProperties {
  return slideRoot({
    ...(brand === 'corner' ? { position: 'relative' as const } : {}),
    ...extra,
  });
}

export function JitrakMark({ size }: { readonly size: 'hero' | 'corner' }) {
  const px = size === 'hero' ? 168 : 64;
  const style: CSSProperties =
    size === 'corner'
      ? {
          position: 'absolute',
          top: 48,
          right: 64,
          width: px,
          height: px,
          display: 'block',
          pointerEvents: 'none',
        }
      : {
          width: px,
          height: px,
          display: 'block',
          marginBottom: 24,
          flexShrink: 0,
        };
  return <img src={jLogo} alt="" width={px} height={px} style={style} />;
}

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

/** Quiet rise — house transition for Day1/Day2 */
export const deckTransition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

/** Opacity-only pair for morphing pages (assign on both sides of a morph cut). */
export const morphFadeTransition: SlideTransition = {
  duration: 280,
  exit: { duration: 224, easing: EASE_IN, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: {
    duration: 308,
    delay: 112,
    easing: EASE_OUT,
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
  morph: { duration: 868, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
};

export function Shell({
  children,
  style,
  brand = 'corner',
}: Readonly<{
  children: ReactNode;
  style?: CSSProperties;
  brand?: BrandMode;
}>) {
  return (
    <div style={brandedRoot(brand, style)}>
      {brand === 'hero' ? <JitrakMark size="hero" /> : null}
      {brand === 'corner' ? <JitrakMark size="corner" /> : null}
      {children}
    </div>
  );
}

export function PageFooter() {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 96,
        bottom: 40,
        fontSize: 20,
        color: jitrak.muted,
        fontFamily: jitrak.font,
        pointerEvents: 'none',
      }}
    >
      {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </div>
  );
}
