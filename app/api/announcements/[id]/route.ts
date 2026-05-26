import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sessionId = request.cookies.get("session")?.value
  if (!sessionId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const sessions = await sql`SELECT id FROM sessions WHERE id = ${sessionId} AND expires_at > NOW()`
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()
    const { title, content, category, posted_by } = body

    if (!title || !content || !category || !posted_by) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await sql`
      UPDATE announcements 
      SET title = ${title}, content = ${content}, category = ${category}, posted_by = ${posted_by}, updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Announcement not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating announcement:", error)
    return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sessionId = request.cookies.get("session")?.value
  if (!sessionId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const sessions = await sql`SELECT id FROM sessions WHERE id = ${sessionId} AND expires_at > NOW()`
  if (sessions.length === 0) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id } = await params

    const result = await sql`
      DELETE FROM announcements WHERE id = ${parseInt(id)} RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Announcement not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting announcement:", error)
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 })
  }
}
