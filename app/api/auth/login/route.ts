import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { sendOtpEmail } from "@/lib/email"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const users = await sql`SELECT id, password_hash FROM users WHERE email = ${email.toLowerCase()}`
    const user = users[0]

    // Use a constant-time comparison path regardless of whether the user exists
    const hashToCheck = user?.password_hash ?? "$2a$12$invalidhashfortimingprotection000000000000000000000000"
    const match = await bcrypt.compare(password, hashToCheck)

    if (!user || !match) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Clear any existing OTP for this user
    await sql`DELETE FROM auth_otps WHERE user_id = ${user.id}`

    // Generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000))
    const otpHash = await bcrypt.hash(otp, 10)

    await sql`
      INSERT INTO auth_otps (user_id, otp_hash, expires_at)
      VALUES (${user.id}, ${otpHash}, NOW() + INTERVAL '10 minutes')
    `

    await sendOtpEmail(email, otp)

    return NextResponse.json({ message: "OTP sent to your email" })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
