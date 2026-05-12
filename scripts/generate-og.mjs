import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svg = readFileSync(join(__dirname, 'og-image.svg'))

await sharp(svg)
  .png()
  .toFile(join(__dirname, '../public/og-image.png'))

console.log('✓ og-image.png generated (1200×630)')
