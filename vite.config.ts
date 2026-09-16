import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

function photoUploadPlugin() {
  return {
    name: 'photo-upload-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/upload-photo', (req: any, res: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const { fileName, base64Data } = data;
              if (fileName && base64Data) {
                const cleanName = path.basename(fileName);
                const buffer = Buffer.from(base64Data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const publicDir = path.resolve(process.cwd(), 'public');
                const assetsDir = path.resolve(process.cwd(), 'src/assets/images');
                if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
                if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
                
                fs.writeFileSync(path.join(publicDir, cleanName), buffer);
                fs.writeFileSync(path.join(assetsDir, cleanName), buffer);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, url: `/${cleanName}` }));
                return;
              }
            } catch (err) {
              console.error('Upload error:', err);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid payload' }));
          });
        } else {
          res.writeHead(405);
          res.end();
        }
      });

      server.middlewares.use('/api/upload-audio', (req: any, res: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const { fileName, base64Data } = data;
              if (base64Data) {
                const cleanName = fileName ? path.basename(fileName) : 'wedding_audio.mp3';
                const buffer = Buffer.from(base64Data.replace(/^data:audio\/\w+;base64,/, '').replace(/^data:application\/octet-stream;base64,/, ''), 'base64');
                const publicDir = path.resolve(process.cwd(), 'public');
                if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
                
                fs.writeFileSync(path.join(publicDir, 'wedding_audio.mp3'), buffer);
                if (cleanName !== 'wedding_audio.mp3') {
                  fs.writeFileSync(path.join(publicDir, cleanName), buffer);
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, url: '/wedding_audio.mp3' }));
                return;
              }
            } catch (err) {
              console.error('Audio upload error:', err);
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid payload' }));
          });
        } else {
          res.writeHead(405);
          res.end();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), photoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
