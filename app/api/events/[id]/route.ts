import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || "postgresql://neondb_owner:npg_BfZb1v2WrdCD@ep-tiny-breeze-aipsug7f-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"

const sql = neon(DATABASE_URL)

// PUT - Update an event
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
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
