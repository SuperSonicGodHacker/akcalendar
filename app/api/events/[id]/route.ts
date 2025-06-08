import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const eventsFilePath = path.join(process.cwd(), "data", "events.json")

// Read events from file
async function readEvents() {
  try {
    const data = await fs.readFile(eventsFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Write events to file
async function writeEvents(events: any[]) {
  const dataDir = path.join(process.cwd(), "data")
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
  await fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2))
}

// PUT - Update an event
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updatedEvent = await request.json()

    const events = await readEvents()
    const eventIndex = events.findIndex((event: any) => event.id === id)

    if (eventIndex === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Update the event while preserving the ID
    events[eventIndex] = { ...updatedEvent, id }
    await writeEvents(events)

    return NextResponse.json(events[eventIndex])
  } catch (error) {
    console.error("Error updating event:", error)
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
  }
}

// DELETE - Delete an event
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const events = await readEvents()
    const eventIndex = events.findIndex((event: any) => event.id === id)

    if (eventIndex === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    const deletedEvent = events.splice(eventIndex, 1)[0]
    await writeEvents(events)

    return NextResponse.json(deletedEvent)
  } catch (error) {
    console.error("Error deleting event:", error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}
