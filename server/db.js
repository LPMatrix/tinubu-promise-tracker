import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import * as schema from './schema.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../data/ngscorecard.db')

mkdirSync(path.dirname(dbPath), { recursive: true })

const client = new Database(dbPath)
client.pragma('journal_mode = WAL')
client.pragma('foreign_keys = ON')

export const db = drizzle(client, { schema })
