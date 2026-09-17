const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT || 3000);
const host = '0.0.0.0';
const root = __dirname;
const dataDir = path.join(root, 'data');
const dataFile = path.join(dataDir, 'periods.json');
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8' };

fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]\n');

function sendJson(response, status, payload) {
  response.writeHead(status, { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store' });
  response.end(JSON.stringify(payload));
}

function readPeriods() {
  try { return JSON.parse(fs.readFileSync(dataFile, 'utf8')); } catch { return []; }
}

const server = http.createServer((request, response) => {
  const requested = decodeURIComponent(request.url.split('?')[0]);

  if (requested === '/api/periods' && request.method === 'GET') return sendJson(response, 200, readPeriods());

  if (requested === '/api/periods' && request.method === 'PUT') {
    let body = '';
    request.on('data', chunk => { body += chunk; if (body.length > 2_000_000) request.destroy(); });
    request.on('end', () => {
      try {
        const periods = JSON.parse(body);
        if (!Array.isArray(periods)) return sendJson(response, 400, { error:'Expected an array of periods' });
        fs.writeFileSync(dataFile, `${JSON.stringify(periods, null, 2)}\n`);
        sendJson(response, 200, { ok:true, periods });
      } catch { sendJson(response, 400, { error:'Invalid JSON' }); }
    });
    return;
  }

  const relative = requested === '/' ? '/index.html' : requested;
  const file = path.resolve(root, `.${relative}`);
  if (!file.startsWith(root) || file === dataFile) { response.writeHead(403); return response.end('Forbidden'); }
  fs.readFile(file, (error, content) => {
    if (error) { response.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' }); return response.end('Not found'); }
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    response.end(content);
  });
});

server.listen(port, host, () => console.log(`Cultstore tracker listening on http://${host}:${port}`));
