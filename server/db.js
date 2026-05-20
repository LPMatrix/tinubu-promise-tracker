import * as schema from './schema.js'

async function createDb() {
  if (process.env.TURSO_DATABASE_URL) {
    const { createClient } = await import('@libsql/client')
    const { drizzle } = await import('drizzle-orm/libsql')
    const client = createClient({
      url:       process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
    return drizzle(client, { schema })
  }

  // Local dev: better-sqlite3
  const { default: Database } = await import('better-sqlite3')
  const { drizzle } = await import('drizzle-orm/better-sqlite3')
  const { mkdirSync } = await import('fs')
  const { fileURLToPath } = await import('url')
  const { default: path } = await import('path')
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const dbPath = path.join(__dirname, '../data/ngscorecard.db')
  mkdirSync(path.dirname(dbPath), { recursive: true })
  const client = new Database(dbPath)
  client.pragma('journal_mode = WAL')
  client.pragma('foreign_keys = ON')
  return drizzle(client, { schema })
}

export const db = await createDb()
