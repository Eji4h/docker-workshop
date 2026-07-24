import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const themePath = join(root, 'themes', 'jitrak.ts');
const demoPath = join(root, 'slides', 'demo', 'index.tsx');
const brandPath = join(root, 'assets', 'brand', 'j-logo-black.png');

assert.equal(existsSync(themePath), true, 'themes/jitrak.ts must exist');
assert.equal(existsSync(demoPath), true, 'slides/demo/index.tsx must exist');
assert.equal(existsSync(brandPath), true, 'assets/brand/j-logo-black.png must exist');

const src = readFileSync(demoPath, 'utf8');
assert.match(src, /export default \[/, 'demo must default-export a page array');
const pageConsts = [...src.matchAll(/^const (\w+): Page/gm)].map((m) => m[1]);
assert.equal(
  pageConsts.length,
  10,
  `expected 10 Page consts, got ${pageConsts.length}: ${pageConsts.join(', ')}`,
);
assert.match(src, /JetBrains Mono|jitrak\.font/, 'demo must use jitrak font tokens');
console.log('check-demo: theme + 10 pages + brand asset OK');
