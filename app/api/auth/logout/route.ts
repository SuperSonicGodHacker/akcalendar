import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get("session")?.value

  if (sessionId) {
    await sql`DELETE FROM sessions WHERE id = ${sessionId}`.catch(() => {})
  }

  const response = NextResponse.json({ message: "Logged out" })
  response.cookies.delete("session")
  return response
}
