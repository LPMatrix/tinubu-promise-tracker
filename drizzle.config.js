const isTurso = !!process.env.TURSO_DATABASE_URL

export default {
  schema: './server/schema.js',
  dialect: isTurso ? 'turso' : 'sqlite',
  dbCredentials: isTurso
    ? { url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN }
    : { url: './data/ngscorecard.db' },
}
