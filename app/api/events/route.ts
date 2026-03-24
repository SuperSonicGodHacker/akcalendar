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

// GET - Fetch all events
export async function GET() {
  try {
    const databaseUrl = getDatabaseUrl()
    
    if (!databaseUrl) {
      console.error("[v0] DATABASE_URL environment variable is not set")
      console.error("[v0] Available env vars:", Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('POSTGRES') || k.includes('NEON') || k.includes('PG')).join(', '))
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }
    
    const sql = neon(databaseUrl)
    const rows = await sql`SELECT * FROM events ORDER BY year, month, date`
    const events = rows.map((row) => ({
      id: String(row.id),
      date: row.date,
      month: row.month,
      year: row.year,
      title: row.title,
      type: row.type,
      isAdministrative: row.is_administrative,
      description: row.description || "",
    }))
    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

// POST - Create a new event
export async function POST(request: NextRequest) {
  try {
    const databaseUrl = getDatabaseUrl()
    
    if (!databaseUrl) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }
    
    const sql = neon(databaseUrl)
    const newEvent = await request.json()

    if (
      !newEvent.title ||
      !newEvent.type ||
      newEvent.date === undefined ||
      newEvent.month === undefined ||
      newEvent.year === undefined
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const isAdmin = newEvent.isAdministrative ?? false
    const description = newEvent.description || ""

    const rows = await sql`
      INSERT INTO events (date, month, year, title, type, is_administrative, description)
      VALUES (${newEvent.date}, ${newEvent.month}, ${newEvent.year}, ${newEvent.title}, ${newEvent.type}, ${isAdmin}, ${description})
      RETURNING *
    `

    const created = {
      id: String(rows[0].id),
      date: rows[0].date,
      month: rows[0].month,
      year: rows[0].year,
      title: rows[0].title,
      type: rows[0].type,
      isAdministrative: rows[0].is_administrative,
      description: rows[0].description || "",
    }

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
