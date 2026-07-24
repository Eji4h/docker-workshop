import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const themePath = join(root, 'themes', 'jitrak.ts');
assert.equal(existsSync(themePath), true, 'themes/jitrak.ts must exist');
console.log('check-demo: theme file present');
