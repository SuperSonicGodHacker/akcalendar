"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, LogOut, Plus, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { fetchEvents, createEvent, updateEvent, type Event } from "@/lib/api"
import { isValidStaffEmail, getStaffMemberByEmail } from "@/lib/staff-directory"
import { getABDayForDate } from "@/lib/ab-day-schedule"

const eventCategories = [
  { id: "sports", label: "Sports", checked: true, color: "bg-red-100 text-red-800 border-red-200" },
  { id: "arts", label: "Theatre", checked: true, color: "bg-purple-100 text-purple-800 border-purple-200" },
  { id: "music", label: "Musical Arts", checked: true, color: "bg-green-100 text-green-800 border-green-200" },
  {
    id: "academic-events",
    label: "Academic Events",
    checked: true,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  { id: "clubs", label: "Clubs", checked: true, color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  {
    id: "special-events",
    label: "Special Events",
    checked: true,
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface SchoolCalendarProps {
  onNavigate: (page: string) => void
}

export default function SchoolCalendar({ onNavigate }: SchoolCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)) // June 2025
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showEmailVerification, setShowEmailVerification] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({ username: "", password: "" })
  const [staffEmail, setStaffEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState("")
  const [currentStaffMember, setCurrentStaffMember] = useState<any>(null)
  const [selectedCategories, setSelectedCategories] = useState([
    "sports",
    "arts",
    "music",
    "academic-events",
    "clubs",
    "special-events",
  ])
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
  })
  const [showEditEvent, setShowEditEvent] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [viewAsStudent, setViewAsStudent] = useState(false)
  const [showViewEvent, setShowViewEvent] = useState(false)
  const [viewingEvent, setViewingEvent] = useState<any>(null)
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Load events from backend on component mount
  useEffect(() => {
    console.log("Component mounted, loading events...")
    loadEvents()
  }, [])

  const loadEvents = async () => {
    console.log("Loading events from backend...")
    setIsLoading(true)
    try {
      const events = await fetchEvents()
      console.log("Loaded events:", events)
      setCalendarEvents(events)
    } catch (error) {
      console.error("Failed to load events:", error)
      alert("Failed to load events. Please refresh the page.")
    } finally {
      setIsLoading(false)
    }
  }

  // A/B Day Logic - uses the official 2025-2026 schedule lookup
  const getABDay = (date: Date) => {
    return getABDayForDate(date.getFullYear(), date.getMonth(), date.getDate())
  }

  const handleLogin = () => {
    if (loginCredentials.username === "akadministrator2025" && loginCredentials.password === "akadminpassword2025") {
      setShowLogin(false)
      setShowEmailVerification(true)
      setLoginCredentials({ username: "", password: "" })
    } else {
      alert("Invalid credentials")
    }
  }

  const handleEmailVerification = () => {
    if (!isValidStaffEmail(staffEmail)) {
      alert("Invalid staff email. Please enter a valid Ardrey Kell staff email address.")
      return
    }

    const staffMember = getStaffMemberByEmail(staffEmail)
    if (staffMember) {
      setCurrentStaffMember(staffMember)
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setSentCode(code)
      alert(`Verification code sent to ${staffEmail}: ${code}`)
    }
  }

  const handleVerificationSubmit = () => {
    if (verificationCode === sentCode) {
      setIsLoggedIn(true)
      setShowEmailVerification(false)
      setStaffEmail("")
      setVerificationCode("")
      setSentCode("")
    } else {
      alert("Invalid verification code")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleAddEvent = async () => {
    if (newEvent.title && newEvent.date && newEvent.category) {
      setIsSubmitting(true)
      try {
        console.log("Adding new event:", newEvent)
        const event = {
          date: Number.parseInt(newEvent.date.split("-")[2]),
          month: Number.parseInt(newEvent.date.split("-")[1]) - 1,
          year: Number.parseInt(newEvent.date.split("-")[0]),
          title: newEvent.title,
          type: newEvent.category,
          isAdministrative: false,
          description: newEvent.description,
        }

        const createdEvent = await createEvent(event)
        if (createdEvent) {
          console.log("Event created successfully:", createdEvent)
          // Reload events to get the latest data
          await loadEvents()

          // Reset form and close modal
          setNewEvent({
            title: "",
            description: "",
            date: new Date().toISOString().split("T")[0],
            category: "",
          })
          setShowAddEvent(false)
          alert("Event added successfully!")
        } else {
          alert("Failed to add event. Please try again.")
        }
      } catch (error) {
        console.error("Error adding event:", error)
        alert("Failed to add event. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      alert("Please fill in all required fields")
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const getCurrentMonthYear = () => {
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const calendarDays = []

    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const daysInPrevMonth = getDaysInMonth(prevMonth)

    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPrevMonth: true,
      })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        date: i,
        isCurrentMonth: true,
        isPrevMonth: false,
      })
    }

    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
    const remainingCells = totalCells - (firstDay + daysInMonth)

    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push({
        date: i,
        isCurrentMonth: false,
        isPrevMonth: false,
      })
    }

    return calendarDays
  }

  const getEventsForDate = (date: number) => {
    const allEvents = calendarEvents.filter(
      (event) =>
        event.date === date && event.month === currentDate.getMonth() && event.year === currentDate.getFullYear(),
    )

    return allEvents.filter((event) => {
      if (event.isAdministrative) {
        return true
      }
      return selectedCategories.includes(event.type)
    })
  }

  const handleViewEvent = (event: any) => {
    setViewingEvent(event)
    setShowViewEvent(true)
  }

  const handleEditEvent = (event: any, eventIndex: number) => {
    setEditingEvent({ ...event })
    setShowEditEvent(true)
  }

  const handleUpdateEvent = async () => {
    if (editingEvent && editingEvent.title && editingEvent.type) {
      setIsSubmitting(true)
      try {
        console.log("Updating event:", editingEvent)
        const updatedEvent = await updateEvent(editingEvent.id, editingEvent)
        if (updatedEvent) {
          console.log("Event updated successfully:", updatedEvent)
          // Reload events to get the latest data
          await loadEvents()
          setShowEditEvent(false)
          setEditingEvent(null)
          alert("Event updated successfully!")
        } else {
          alert("Failed to update event. Please try again.")
        }
      } catch (error) {
        console.error("Error updating event:", error)
        alert("Failed to update event. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      alert("Please fill in all required fields")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading calendar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/ardrey-kell-logo.png"
                alt="Ardrey Kell High School Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <div>
                <h1 className="text-2xl font-bold">Ardrey Kell High School</h1>
                <p className="text-purple-200 text-sm">School Events Calendar</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => onNavigate("calendar")}
                  className="hover:text-purple-200 transition-colors font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigate("calendar")}
                  className="hover:text-purple-200 transition-colors font-medium"
                >
                  Calendar
                </button>
                <button
                  onClick={() => onNavigate("announcements")}
                  className="hover:text-purple-200 transition-colors font-medium"
                >
                  Announcements
                </button>
                <button onClick={() => onNavigate("contact")} className="hover:text-purple-200 transition-colors">
                  Staff Contacts
                </button>
              </nav>
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{currentStaffMember?.name || "Admin"}</span>
                  {!viewAsStudent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewAsStudent(true)}
                      className="bg-white text-purple-900 hover:bg-gray-100"
                    >
                      View as Student
                    </Button>
                  )}
                  {viewAsStudent && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewAsStudent(false)}
                      className="bg-white text-purple-900 hover:bg-gray-100"
                    >
                      View as Admin
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="bg-white text-purple-900 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLogin(true)}
                  className="bg-white text-purple-900 hover:bg-gray-100"
                >
                  Admin Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={loginCredentials.username}
                  onChange={(e) => setLoginCredentials((prev) => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginCredentials.password}
                  onChange={(e) => setLoginCredentials((prev) => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleLogin} className="flex-1">
                  Login
                </Button>
                <Button variant="outline" onClick={() => setShowLogin(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Email Verification Modal */}
      {showEmailVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Staff Email Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Staff Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@cms.k12.nc.us"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                />
                <Button onClick={handleEmailVerification} className="mt-2 w-full" disabled={!staffEmail}>
                  Send Verification Code
                </Button>
              </div>
              {sentCode && (
                <div>
                  <Label htmlFor="verification">Verification Code</Label>
                  <Input
                    id="verification"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <div className="flex space-x-2 mt-2">
                    <Button onClick={handleVerificationSubmit} className="flex-1">
                      Verify
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowEmailVerification(false)
                        setStaffEmail("")
                        setVerificationCode("")
                        setSentCode("")
                        setCurrentStaffMember(null)
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Category Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="py-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Show Event Types:</h3>
            <div className="flex flex-wrap gap-4">
              {eventCategories.map((category) => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories((prev) => [...prev, category.id])
                      } else {
                        setSelectedCategories((prev) => prev.filter((id) => id !== category.id))
                      }
                    }}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <div className={`w-3 h-3 rounded border ${category.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{category.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Event Legend */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-4 text-xs">
            <span className="font-medium text-gray-600">Activity Events:</span>
            {eventCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded border ${category.color.split(" ")[0]}-200 border-${category.color.split(" ")[0]}-300`}
                ></div>
                <span>{category.label}</span>
              </div>
            ))}
            <div className="flex items-center space-x-2 ml-4">
              <div className="w-3 h-3 bg-gray-200 border border-gray-300 rounded"></div>
              <span>Administrative Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="container mx-auto px-4 py-8">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{getCurrentMonthYear()}</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            {isLoggedIn && !viewAsStudent && (
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowAddEvent(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Event
              </Button>
            )}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-4 text-center font-medium text-gray-700 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {generateCalendarDays().map((day, index) => {
              const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.date)
              const abDay = day.isCurrentMonth ? getABDay(fullDate) : null

              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border-r border-b last:border-r-0 ${
                    !day.isCurrentMonth ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-sm font-medium ${!day.isCurrentMonth ? "text-gray-400" : "text-gray-900"}`}>
                      {day.date}
                    </div>
                    {abDay && (
                      <div
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          abDay === "A" ? "bg-purple-500 text-white" : "bg-green-500 text-white"
                        }`}
                      >
                        {abDay}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    {day.isCurrentMonth &&
                      getEventsForDate(day.date).map((event, eventIndex) => {
                        const eventCategory = eventCategories.find((cat) => cat.id === event.type)
                        const eventColor = event.isAdministrative
                          ? "bg-gray-100 text-gray-800 border-gray-200"
                          : eventCategory?.color || "bg-gray-100 text-gray-800 border-gray-200"

                        return (
                          <div key={eventIndex} className="relative group">
                            <Badge
                              variant="secondary"
                              className={`text-xs px-2 py-1 block w-full text-left cursor-pointer ${eventColor} border`}
                              onClick={() => {
                                if (isLoggedIn && !viewAsStudent && !event.isAdministrative) {
                                  handleEditEvent(event, eventIndex)
                                } else if (!isLoggedIn || viewAsStudent) {
                                  handleViewEvent(event)
                                }
                              }}
                            >
                              {event.title}
                            </Badge>
                            {isLoggedIn && !viewAsStudent && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  if (!event.isAdministrative) {
                                    handleEditEvent(event, eventIndex)
                                  }
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        )
                      })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New Calendar Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="event-date">Event Date</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="event-category">Category</Label>
                <Select
                  value={newEvent.category}
                  onValueChange={(value) => setNewEvent((prev) => ({ ...prev, category: value }))}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventCategories.map((category) => (
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
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddEvent} className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Event"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddEvent(false)}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Edit Event Modal */}
      {showEditEvent && editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit Calendar Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="edit-event-title">Event Title</Label>
                <Input
                  id="edit-event-title"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent((prev: any) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="edit-event-date">Event Date</Label>
                <Input
                  id="edit-event-date"
                  type="date"
                  value={`${editingEvent.year}-${String(editingEvent.month + 1).padStart(2, "0")}-${String(editingEvent.date).padStart(2, "0")}`}
                  onChange={(e) => {
                    const [year, month, day] = e.target.value.split("-").map(Number)
                    setEditingEvent((prev: any) => ({
                      ...prev,
                      year,
                      month: month - 1,
                      date: day,
                    }))
                  }}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="edit-event-category">Category</Label>
                <Select
                  value={editingEvent.type}
                  onValueChange={(value) => setEditingEvent((prev: any) => ({ ...prev, type: value }))}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-event-description">Description</Label>
                <Textarea
                  id="edit-event-description"
                  rows={4}
                  value={editingEvent.description || ""}
                  onChange={(e) => setEditingEvent((prev: any) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter event description"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleUpdateEvent} className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Event"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowEditEvent(false)
                    setEditingEvent(null)
                  }}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* View Event Modal */}
      {showViewEvent && viewingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{viewingEvent.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Date</Label>
                <p className="text-sm text-gray-900">
                  {monthNames[viewingEvent.month]} {viewingEvent.date}, {viewingEvent.year}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Category</Label>
                <p className="text-sm text-gray-900">
                  {eventCategories.find((cat) => cat.id === viewingEvent.type)?.label || viewingEvent.type}
                </p>
              </div>
              {viewingEvent.description && (
                <div>
                  <Label className="text-sm font-medium text-gray-700">Description</Label>
                  <p className="text-sm text-gray-900">{viewingEvent.description}</p>
                </div>
              )}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowViewEvent(false)
                    setViewingEvent(null)
                  }}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
