// World News 19 November 2026 - Image Submission Entrypoint v1.1
// Copies entry.png to the target grader output directory with validation

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const srcPath = new URL('./entry.png', import.meta.url);
const destPath = join(outputDir, 'entry.png');

copyFileSync(srcPath, destPath);
const stats = statSync(destPath);
console.log(`Delivered 19 November 2026 world news summary (${stats.size} bytes) to:`, destPath);

