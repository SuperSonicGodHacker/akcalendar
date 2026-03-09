import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("[v0] DATABASE_URL environment variable is not set")
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }
    
    const sql = neon(process.env.DATABASE_URL)
    const announcements = await sql`
      SELECT * FROM announcements ORDER BY created_at DESC
    `
    return NextResponse.json(announcements)
  } catch (error) {
    console.error("Error fetching announcements:", error)
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }
    
    const sql = neon(process.env.DATABASE_URL)
    const body = await request.json()
    const { title, content, category, posted_by } = body

    if (!title || !content || !category || !posted_by) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO announcements (title, content, category, posted_by)
      VALUES (${title}, ${content}, ${category}, ${posted_by})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating announcement:", error)
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 })
  }
}
