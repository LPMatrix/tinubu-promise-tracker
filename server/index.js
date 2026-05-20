import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import { createApiRouter } from './api.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.use('/api', createApiRouter())
app.use(express.static(path.join(__dirname, '../dist')))
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => console.log(`NGScorecard running on http://localhost:${PORT}`))
