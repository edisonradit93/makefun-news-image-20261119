// World News 19 November 2026 - Image Delivery Entrypoint
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
console.log('Successfully delivered 19 November 2026 world news summary to /output/entry.png');
