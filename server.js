const http = require('http');
const fs = require('fs');
const path = require('path');

const PUERTO = 3000;
const CARPETA_PUBLICA = path.join(__dirname, 'public');

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const servidor = http.createServer(function (req, res) {
  let ruta = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (ruta === '/') ruta = '/index.html';

  const archivo = path.normalize(path.join(CARPETA_PUBLICA, ruta));
  if (!archivo.startsWith(CARPETA_PUBLICA)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Acceso prohibido');
  }

  fs.readFile(archivo, function (err, contenido) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end('<h1>404</h1><p>Página no encontrada. <a href="/">Volver al inicio</a></p>');
    }
    const tipo = TIPOS[path.extname(archivo).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': tipo });
    res.end(contenido);
  });

  console.log(req.method, ruta);
});

servidor.listen(PUERTO, function () {
  console.log('Servidor del hospedaje en http://127.0.0.1:' + PUERTO + '/');
});
