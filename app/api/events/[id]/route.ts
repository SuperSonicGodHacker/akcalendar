import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Helper to get database URL from various possible env var names
function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.NEON_DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL
  )
}

// PUT - Update an event
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const databaseUrl = getDatabaseUrl()
    
    if (!databaseUrl) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }
    
    const sql = neon(databaseUrl)
    const { id } = await params
    const numericId = Number.parseInt(id, 10)

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 })
    }

    const updatedEvent = await request.json()

    const rows = await sql`
      UPDATE events
      SET
        date = ${updatedEvent.date},
        month = ${updatedEvent.month},
        year = ${updatedEvent.year},
        title = ${updatedEvent.title},
        type = ${updatedEvent.type},
        is_administrative = ${updatedEvent.isAdministrative ?? false},
        description = ${updatedEvent.description || ""},
        updated_at = NOW()
      WHERE id = ${numericId}
      RETURNING *
    `

    if (rows.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    const updated = {
      id: String(rows[0].id),
      date: rows[0].date,
      month: rows[0].month,
      year: rows[0].year,
      title: rows[0].title,
      type: rows[0].type,
      isAdministrative: rows[0].is_administrative,
      description: rows[0].description || "",
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating event:", error)
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
  }
}

// DELETE - Delete an event
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const databaseUrl = getDatabaseUrl()
    
    if (!databaseUrl) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }
    
    const sql = neon(databaseUrl)
    const { id } = await params
    const numericId = Number.parseInt(id, 10)

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 })
    }

    const rows = await sql`
      DELETE FROM events WHERE id = ${numericId} RETURNING *
    `

    if (rows.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    const deleted = {
      id: String(rows[0].id),
      date: rows[0].date,
      month: rows[0].month,
      year: rows[0].year,
      title: rows[0].title,
      type: rows[0].type,
      isAdministrative: rows[0].is_administrative,
      description: rows[0].description || "",
    }

    return NextResponse.json(deleted)
  } catch (error) {
    console.error("Error deleting event:", error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}
