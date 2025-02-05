import { neon } from '@neondatabase/serverless'

export async function getNodes() {
  const sql = neon(process.env.DATABASE_URL)
  const data = await sql`SELECT * FROM nodes;`
  return data
}
