const http = require('http');
const fs = require('fs');
const path = require('path');
const port = Number(process.env.PORT || 3000);
const host = '0.0.0.0';
const root = __dirname;
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8' };
const server = http.createServer((request, response) => {
  const requested = decodeURIComponent(request.url.split('?')[0]);
  const relative = requested === '/' ? '/index.html' : requested;
  const file = path.resolve(root, `.${relative}`);
  if (!file.startsWith(root)) { response.writeHead(403); return response.end('Forbidden'); }
  fs.readFile(file, (error, content) => {
    if (error) { response.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' }); return response.end('Not found'); }
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }); response.end(content);
  });
});
server.listen(port, host, () => console.log(`Cultstore tracker listening on http://${host}:${port}`));
