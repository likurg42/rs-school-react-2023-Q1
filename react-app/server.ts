import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3001

const app = express()

const viteServer = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

app.use(viteServer.middlewares)

app.use('/assets', express.static(path.resolve(__dirname, './dist/client/assets')))

app.use('*', async (req, res) => {
  let data = await fs.readFile(path.resolve(__dirname, './index.html'), 'utf-8')
  data = await viteServer.transformIndexHtml(req.originalUrl, `${data}`)

  const [startHTML, endOfSSR, endHTML] = data.split('<!--app-html-->')

  const { render } = await viteServer.ssrLoadModule('/src/entry-server.tsx')

  const [stream, initialState] = await render(req.originalUrl, {
    onShellReady() {
      res.write(startHTML)
      stream.pipe(res)
      res.write(endOfSSR)
    },
    onShellError(err: Error) {
      console.error(err)
    },
    onAllReady() {
      res.write(
        `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(initialState).replace(
          /</g,
          '\\u003c'
        )}</script>` +
        endHTML
      )
      res.end()
    },
    onError(err: Error) {
      console.error(err)
    },
  })
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})