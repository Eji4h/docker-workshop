import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const demoPath = join(root, 'slides', 'demo', 'index.tsx');
const day1Path = join(root, 'slides', 'day-1', 'index.tsx');
const day2Path = join(root, 'slides', 'day-2', 'index.tsx');
const brandPath = join(root, 'assets', 'brand', 'j-logo-black.png');
const themePathTsx = join(root, 'themes', 'jitrak.tsx');
const themePathTs = join(root, 'themes', 'jitrak.ts');
const themePath = existsSync(themePathTsx) ? themePathTsx : themePathTs;
const invDay1 = join(root, '..', 'docs', 'superpowers', 'specs', '2026-07-24-day1-inventory.md');

assert.equal(existsSync(demoPath), false, 'slides/demo must be deleted');
assert.equal(existsSync(brandPath), true, 'assets/brand/j-logo-black.png must exist');
assert.equal(existsSync(themePath), true, 'themes/jitrak.ts(x) must exist');
assert.equal(existsSync(invDay1), true, 'Day1 inventory spec must exist');

const themeSrc = readFileSync(themePath, 'utf8');
assert.match(themeSrc, /JitrakMark/, 'theme must export JitrakMark');
assert.match(themeSrc, /brandedRoot/, 'theme must export brandedRoot');

const REQUIRE_COURSE_KIT = true; // Task 3 sets true
if (REQUIRE_COURSE_KIT) {
  assert.match(themeSrc, /export function Shell/, 'theme must export Shell');
  assert.match(themeSrc, /deckTransition/, 'theme must export deckTransition');
  assert.match(themeSrc, /PageFooter/, 'theme must export PageFooter');
}

const REQUIRE_DAY1 = true; // Task 4 sets true
if (REQUIRE_DAY1) {
  assert.equal(existsSync(day1Path), true, 'slides/day-1/index.tsx must exist');
  const day1 = readFileSync(day1Path, 'utf8');
  assert.match(day1, /export default \[/, 'day-1 must default-export pages');
  assert.match(day1, /brand=["']hero["']/, 'day-1 Cover must use brand="hero"');
  assert.match(day1, /from ['"]\.\.\/\.\.\/themes\/jitrak['"]/, 'day-1 must import course kit');
  assert.match(day1, /deckTransition|export const transition/, 'day-1 must wire deck transition');
  assert.match(day1, /<Steps>|\bSteps\b/, 'day-1 must use Steps somewhere');
  assert.match(day1, /MorphElement/, 'day-1 must use MorphElement somewhere');
}

if (existsSync(day2Path)) {
  const day2 = readFileSync(day2Path, 'utf8');
  assert.match(day2, /export default \[/, 'day-2 must default-export pages');
  assert.match(day2, /brand=["']hero["']/, 'day-2 Cover must use brand="hero"');
}

console.log('check-decks: demo gone + day-1 kit/motion OK');
