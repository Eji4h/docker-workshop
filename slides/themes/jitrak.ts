import type { CSSProperties } from 'react';

export const jitrak = {
  bg: '#0a0f0d',
  text: '#e2e8f0',
  muted: '#94a3b8',
  accent: '#10b981',
  accentAlt: '#00bb7f',
  link: '#22d3ee',
  font: '"JetBrains Mono", ui-monospace, monospace',
} as const;

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
