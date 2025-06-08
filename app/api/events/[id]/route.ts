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
    console.error("Error reading events:", error)
    return []
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

// PUT - Update an event
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updatedEvent = await request.json()
    console.log(`Updating event with ID: ${id}`, updatedEvent)

    const events = await readEvents()
    const eventIndex = events.findIndex((event: any) => event.id === id)

    if (eventIndex === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Update the event while preserving the ID
    events[eventIndex] = { ...updatedEvent, id }
    await writeEvents(events)

    console.log(`Successfully updated event with ID: ${id}`)
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
    console.log(`Deleting event with ID: ${id}`)

    const events = await readEvents()
    const eventIndex = events.findIndex((event: any) => event.id === id)

    if (eventIndex === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    const deletedEvent = events.splice(eventIndex, 1)[0]
    await writeEvents(events)

    console.log(`Successfully deleted event with ID: ${id}`)
    return NextResponse.json(deletedEvent)
  } catch (error) {
    console.error("Error deleting event:", error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}
