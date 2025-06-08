// API utility functions for events

export interface Event {
  id: string
  date: number
  month: number
  year: number
  title: string
  type: string
  isAdministrative: boolean
  description?: string
}

// Fetch all events
export async function fetchEvents(): Promise<Event[]> {
  try {
    console.log("Fetching events from API...")
    const response = await fetch("/api/events", {
      cache: "no-store", // Ensure fresh data
      headers: {
        "Cache-Control": "no-cache",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`)
    }

    const events = await response.json()
    console.log(`Successfully fetched ${events.length} events`)
    return events
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

// Create a new event
export async function createEvent(event: Omit<Event, "id">): Promise<Event | null> {
  try {
    console.log("Creating event:", event)
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Failed to create event: ${errorData.error || response.status}`)
    }

    const createdEvent = await response.json()
    console.log("Successfully created event:", createdEvent)
    return createdEvent
  } catch (error) {
    console.error("Error creating event:", error)
    return null
  }
}

// Update an event
export async function updateEvent(id: string, event: Partial<Event>): Promise<Event | null> {
  try {
    console.log(`Updating event ${id}:`, event)
    const response = await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Failed to update event: ${errorData.error || response.status}`)
    }

    const updatedEvent = await response.json()
    console.log("Successfully updated event:", updatedEvent)
    return updatedEvent
  } catch (error) {
    console.error("Error updating event:", error)
    return null
  }
}

// Delete an event
export async function deleteEvent(id: string): Promise<boolean> {
  try {
    console.log(`Deleting event ${id}`)
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Failed to delete event: ${errorData.error || response.status}`)
    }

    console.log(`Successfully deleted event ${id}`)
    return true
  } catch (error) {
    console.error("Error deleting event:", error)
    return false
  }
}
