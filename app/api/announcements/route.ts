import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || "postgresql://neondb_owner:npg_BfZb1v2WrdCD@ep-tiny-breeze-aipsug7f-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"

const sql = neon(DATABASE_URL)

export async function GET() {
  try {
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
