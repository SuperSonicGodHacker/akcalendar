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

// Initialize with default events if file doesn't exist
async function initializeEventsFile() {
  const defaultEvents = [
    {
      id: "admin-1",
      date: 4,
      month: 6,
      year: 2025,
      title: "Independence Day Holiday",
      type: "administrative",
      isAdministrative: true,
    },
    {
      id: "admin-2",
      date: 18,
      month: 7,
      year: 2025,
      title: "Teacher Workday",
      type: "administrative",
      isAdministrative: true,
    },
    {
      id: "admin-3",
      date: 19,
      month: 7,
      year: 2025,
      title: "Teacher Workday",
      type: "administrative",
      isAdministrative: true,
    },
    {
      id: "admin-4",
      date: 20,
      month: 7,
      year: 2025,
      title: "Teacher Workday",
      type: "administrative",
      isAdministrative: true,
    },
    {
      id: "admin-5",
      date: 21,
      month: 7,
      year: 2025,
      title: "Teacher Workday",
      type: "administrative",
      isAdministrative: true,
    },
    {
      id: "admin-6",
      date: 22,
      month: 7,
      year: 2025,
      title: "Teacher Workday",
      type: "administrative",
      isAdministrative: true,
    },
    {
      id: "admin-7",
      date: 25,
      month: 7,
      year: 2025,
      title: "First Day of School",
      type: "milestones",
      isAdministrative: true,
    },
    {
      id: "event-1",
      date: 5,
      month: 8,
      year: 2025,
      title: "Football vs. West High",
      type: "sports",
      isAdministrative: false,
      description:
        "Join us for an exciting football game against West High School. Game starts at 7:00 PM at our home stadium. Wear your purple and gold!",
    },
    {
      id: "event-2",
      date: 12,
      month: 8,
      year: 2025,
      title: "Fall Play Auditions",
      type: "arts",
      isAdministrative: false,
      description:
        "Auditions for our fall theatrical production. All students welcome to try out. Sign up in the drama room.",
    },
    {
      id: "event-3",
      date: 15,
      month: 8,
      year: 2025,
      title: "Band Concert",
      type: "music",
      isAdministrative: false,
      description:
        "Annual fall band concert featuring our marching band and concert band. Free admission for all families.",
    },
    {
      id: "event-4",
      date: 20,
      month: 8,
      year: 2025,
      title: "Science Fair",
      type: "academic-events",
      isAdministrative: false,
      description:
        "Student science fair showcasing innovative projects from all grade levels. Judging begins at 9:00 AM.",
    },
    {
      id: "event-5",
      date: 25,
      month: 8,
      year: 2025,
      title: "Chess Club Meeting",
      type: "clubs",
      isAdministrative: false,
      description: "Weekly chess club meeting in room 204. All skill levels welcome. Snacks provided!",
    },
    {
      id: "event-6",
      date: 30,
      month: 8,
      year: 2025,
      title: "Homecoming Dance",
      type: "special-events",
      isAdministrative: false,
      description:
        "Annual homecoming dance in the gymnasium. Tickets available at the main office. Semi-formal attire required.",
    },
  ]

  await ensureDataDirectory()
  await fs.writeFile(eventsFilePath, JSON.stringify(defaultEvents, null, 2))
  return defaultEvents
}

// Read events from file
async function readEvents() {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(eventsFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.log("Events file not found, creating with default events...")
    return await initializeEventsFile()
  }
}

// Write events to file
async function writeEvents(events: any[]) {
  try {
    await ensureDataDirectory()
    await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2))
    console.log(`Successfully wrote ${events.length} events to file`)
  } catch (error) {
    console.error("Error writing events to file:", error)
    throw error
  }
}

// GET - Fetch all events
export async function GET() {
  try {
    const events = await readEvents()
    console.log(`Fetched ${events.length} events from storage`)
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
    console.log("Creating new event:", newEvent)

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

    console.log(`Successfully created event with ID: ${newEvent.id}`)
    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
