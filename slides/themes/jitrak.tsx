import type { CSSProperties } from 'react';
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

export function JitrakMark({ size }: { size: 'hero' | 'corner' }) {
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
