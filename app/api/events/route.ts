import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const eventsFilePath = path.join(process.cwd(), "data", "events.json")

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read events from file
async function readEvents() {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(eventsFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, return empty array
    return []
  }
}

// Write events to file
async function writeEvents(events: any[]) {
  await ensureDataDirectory()
  await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2))
}

// GET - Fetch all events
export async function GET() {
  try {
    const events = await readEvents()
    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

// POST - Create a new event
export async function POST(request: NextRequest) {
  try {
    const newEvent = await request.json()

    // Validate required fields
    if (
      !newEvent.title ||
      !newEvent.type ||
      newEvent.date === undefined ||
      newEvent.month === undefined ||
      newEvent.year === undefined
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate unique ID if not provided
    if (!newEvent.id) {
      newEvent.id = `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    const events = await readEvents()
    events.push(newEvent)
    await writeEvents(events)

    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
