import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import crypto from "crypto"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    const rows = await sql`
      SELECT ao.id, ao.otp_hash, ao.expires_at, u.id AS user_id, u.email, u.name, u.role
      FROM auth_otps ao
      JOIN users u ON ao.user_id = u.id
      WHERE u.email = ${email.toLowerCase()}
    `

    if (rows.length === 0) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 })
    }

    const row = rows[0]

    if (new Date(row.expires_at) < new Date()) {
      await sql`DELETE FROM auth_otps WHERE id = ${row.id}`
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 })
    }

    const match = await bcrypt.compare(String(otp), row.otp_hash)
    if (!match) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 })
    }

    // OTP valid — consume it and create a session
    await sql`DELETE FROM auth_otps WHERE id = ${row.id}`

    const sessionId = crypto.randomUUID()
    await sql`
      INSERT INTO sessions (id, user_id, expires_at)
      VALUES (${sessionId}, ${row.user_id}, NOW() + INTERVAL '7 days')
    `

    const response = NextResponse.json({
      user: { id: row.user_id, email: row.email, name: row.name, role: row.role },
    })

    response.cookies.set("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
