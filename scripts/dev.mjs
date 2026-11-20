import { spawn } from 'node:child_process';

console.log('[SpanCraft Dev] Starting API backend (port 8787) and Vite frontend (port 5173)...');

const api = spawn('npm.cmd', ['run', 'dev', '--workspace=@spancraft/api'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: '8787' }
});

const web = spawn('npm.cmd', ['run', 'dev', '--workspace=@spancraft/web'], {
  stdio: 'inherit',
  shell: true
});

api.on('error', (err) => {
  console.error('[API Process Error]', err);
});

web.on('error', (err) => {
  console.error('[Web Process Error]', err);
});

function cleanup() {
  console.log('\n[SpanCraft Dev] Shutting down servers...');
  try { api.kill(); } catch {}
  try { web.kill(); } catch {}
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
