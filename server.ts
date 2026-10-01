import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serverDistPath = join(__dirname, 'dist', 'app', 'server', 'server.mjs');

if (existsSync(serverDistPath)) {
  await import('./dist/app/server/server.mjs');
} else {
  console.log('Production build not found at', serverDistPath, '- running ng build...');
  const build = spawn('npx', ['ng', 'build'], { stdio: 'inherit' });
  build.on('close', async (code) => {
    if (code === 0) {
      await import('./dist/app/server/server.mjs');
    } else {
      process.exit(code || 1);
    }
  });
}
