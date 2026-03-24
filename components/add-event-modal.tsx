"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
  onAddEvent: (event: {
    title: string
    description: string
    date: string
    category: string
  }) => void
  categories: Array<{ id: string; label: string }>
}

export function AddEventModal({ isOpen, onClose, onAddEvent, categories }: AddEventModalProps) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
  })

  const handleSubmit = () => {
    if (newEvent.title && newEvent.date && newEvent.category) {
      onAddEvent(newEvent)
      setNewEvent({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
      })
    } else {
      alert("Please fill in all required fields")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-96 max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Add New Calendar Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="event-title">
              Event Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="event-title"
              value={newEvent.title}
              onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter event title"
              required
            />
          </div>
          <div>
            <Label htmlFor="event-date">
              Event Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="event-date"
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="event-category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={newEvent.category}
              onValueChange={(value) => setNewEvent((prev) => ({ ...prev, category: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              rows={4}
              value={newEvent.description}
              onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Enter event description"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSubmit} className="flex-1">
              Add Event
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
