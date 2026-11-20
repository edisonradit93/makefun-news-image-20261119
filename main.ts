import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

// Resolve directory
const botDir = process.env.MAKEFUN_BOT_DIR || path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(botDir, 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const targetPath = path.resolve(outputDir, 'entry.png');

console.log(`[make.fun] Verifying editorial image from: ${sourcePath}`);

if (!fs.existsSync(sourcePath)) {
  console.error(`[make.fun] Error: Source image file not found at ${sourcePath}`);
  process.exit(1);
}

const stats = fs.statSync(sourcePath);
const maxBytes = 1048576; // 1 MB limit

if (stats.size > maxBytes) {
  console.error(`[make.fun] Error: Image size ${stats.size} exceeds maximum limit of ${maxBytes} bytes`);
  process.exit(1);
}

console.log(`[make.fun] Image size validation passed: ${stats.size} bytes (<= ${maxBytes} bytes)`);

// Cryptographic SHA-256 hashing and integrity verification
const calculateHash = (filePath: string): string => {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
};

const sourceHash = calculateHash(sourcePath);
console.log(`[make.fun] Source image SHA-256 hash: ${sourceHash}`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.copyFileSync(sourcePath, targetPath);

// Verify destination file cryptographic integrity
const targetHash = calculateHash(targetPath);
if (sourceHash !== targetHash) {
  console.error(`[make.fun] Integrity verification failed: hash mismatch (${sourceHash} !== ${targetHash})`);
  process.exit(1);
}

console.log(`[make.fun] Cryptographic integrity verified (SHA-256: ${targetHash})`);
console.log(`[make.fun] Successfully delivered editorial image to ${targetPath}`);
