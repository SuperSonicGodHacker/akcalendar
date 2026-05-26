/**
 * Usage: npx tsx scripts/seed-admin.ts
 *
 * Creates (or updates) an admin user in the database.
 * Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_NAME via env or edit the defaults below.
 */
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import * as dotenv from "dotenv"

dotenv.config()

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@ardreykelll.com"
  const password = process.env.ADMIN_PASSWORD ?? ""
  const name = process.env.ADMIN_NAME ?? "Administrator"

  if (!password) {
    console.error("Error: ADMIN_PASSWORD env var is required")
    process.exit(1)
  }

  const sql = neon(process.env.DATABASE_URL!)
  const hash = await bcrypt.hash(password, 12)

  await sql`
    INSERT INTO users (email, password_hash, name, role)
    VALUES (${email}, ${hash}, ${name}, 'admin')
    ON CONFLICT (email)
    DO UPDATE SET password_hash = EXCLUDED.password_hash, name = EXCLUDED.name, updated_at = NOW()
  `

  console.log(`Admin user upserted: ${email}`)
}

main().catch((err) => { console.error(err); process.exit(1) })
