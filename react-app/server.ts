import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import express from 'express';
import { ViteDevServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.VITEST;
console.log(isTest);

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort?: number,
)
{
  console.log(hmrPort);
  const resolve = (p: string) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : '';

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite: ViteDevServer;
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(
        resolve('dist/client'),
        { index: false },
      ),
    );
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      let template;
      let
        render;
      if (!isProd) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = indexProd;
        const distEntryServer = await import('./dist/server/entry-server.js');
        render = distEntryServer.render;
      }

      const appHTML = render(url);

      const html = template.replace('<!--app-html-->', appHTML);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (e instanceof Error) {
        !isProd && vite.ssrFixStacktrace(e);
        res.status(500).end(e.stack);
      }
    }
  });

  return { app };
}

if (!isTest) {
  createServer().then(({ app }) => {
    app.listen(5173, () => {
      console.log('http://localhost:5173');
    });
  });
}
