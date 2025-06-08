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
    const response = await fetch("/api/events", {
      cache: "no-store", // Ensure fresh data
    })

    if (!response.ok) {
      throw new Error("Failed to fetch events")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

// Create a new event
export async function createEvent(event: Omit<Event, "id">): Promise<Event | null> {
  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })

    if (!response.ok) {
      throw new Error("Failed to create event")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating event:", error)
    return null
  }
}

// Update an event
export async function updateEvent(id: string, event: Partial<Event>): Promise<Event | null> {
  try {
    const response = await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })

    if (!response.ok) {
      throw new Error("Failed to update event")
    }

    return await response.json()
  } catch (error) {
    console.error("Error updating event:", error)
    return null
  }
}

// Delete an event
export async function deleteEvent(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete event")
    }

    return true
  } catch (error) {
    console.error("Error deleting event:", error)
    return false
  }
}
