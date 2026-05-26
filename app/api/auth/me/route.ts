import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get("session")?.value

  if (!sessionId) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
  }

  const rows = await sql`
    SELECT u.id, u.email, u.name, u.role
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.id = ${sessionId} AND s.expires_at > NOW()
  `

  if (rows.length === 0) {
    const response = NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
    response.cookies.delete("session")
    return response
  }

  return NextResponse.json({ user: rows[0] })
}
