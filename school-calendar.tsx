"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, BookOpen, LogIn, LogOut, Plus, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const eventCategories = [
  { id: "all", label: "All Events", active: true },
  { id: "workdays", label: "Teacher Workdays", active: false },
  { id: "holidays", label: "Holidays", active: false },
  { id: "breaks", label: "School Breaks", active: false },
  { id: "academic", label: "Academic", active: false },
  { id: "early-release", label: "Early Release", active: false },
  { id: "milestones", label: "Milestones", active: false },
]

const eventTypeColors = {
  workdays: "bg-blue-100 text-blue-800 border-blue-200",
  holidays: "bg-red-100 text-red-800 border-red-200",
  breaks: "bg-purple-100 text-purple-800 border-purple-200",
  academic: "bg-green-100 text-green-800 border-green-200",
  "early-release": "bg-orange-100 text-orange-800 border-orange-200",
  milestones: "bg-yellow-100 text-yellow-800 border-yellow-200",
}

const events = [
  // July 2025
  {
    date: 4,
    month: 6,
    year: 2025,
    title: "Independence Day Holiday",
    type: "holidays",
  },

  // August 2025
  {
    date: 18,
    month: 7,
    year: 2025,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 19,
    month: 7,
    year: 2025,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 20,
    month: 7,
    year: 2025,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 21,
    month: 7,
    year: 2025,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 22,
    month: 7,
    year: 2025,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 25,
    month: 7,
    year: 2025,
    title: "First Day of School",
    type: "milestones",
  },

  // September 2025
  {
    date: 1,
    month: 8,
    year: 2025,
    title: "Labor Day",
    type: "holidays",
  },
  {
    date: 9,
    month: 8,
    year: 2025,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 23,
    month: 8,
    year: 2025,
    title: "Teacher Workday",
    type: "workdays",
  },

  // October 2025
  {
    date: 2,
    month: 9,
    year: 2025,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 8,
    month: 9,
    year: 2025,
    title: "Early Release Day",
    type: "early-release",
  },
  {
    date: 9,
    month: 9,
    year: 2025,
    title: "Q1 Ends (46 days)",
    type: "academic",
  },
  {
    date: 31,
    month: 9,
    year: 2025,
    title: "Halloween",
    type: "holidays",
  },

  // November 2025
  {
    date: 4,
    month: 10,
    year: 2025,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 11,
    month: 10,
    year: 2025,
    title: "Veterans Day",
    type: "holidays",
  },
  {
    date: 19,
    month: 10,
    year: 2025,
    title: "Early Release Day",
    type: "early-release",
  },
  {
    date: 26,
    month: 10,
    year: 2025,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 27,
    month: 10,
    year: 2025,
    title: "Thanksgiving Break",
    type: "breaks",
  },
  {
    date: 28,
    month: 10,
    year: 2025,
    title: "Thanksgiving Break",
    type: "breaks",
  },

  // December 2025
  {
    date: 22,
    month: 11,
    year: 2025,
    title: "Winter Break Begins",
    type: "breaks",
  },
  {
    date: 23,
    month: 11,
    year: 2025,
    title: "Winter Break",
    type: "breaks",
  },
  {
    date: 24,
    month: 11,
    year: 2025,
    title: "Winter Break",
    type: "breaks",
  },
  {
    date: 25,
    month: 11,
    year: 2025,
    title: "Christmas Day",
    type: "holidays",
  },
  {
    date: 26,
    month: 11,
    year: 2025,
    title: "Winter Break",
    type: "breaks",
  },
  {
    date: 29,
    month: 11,
    year: 2025,
    title: "Winter Break",
    type: "breaks",
  },
  {
    date: 30,
    month: 11,
    year: 2025,
    title: "Winter Break",
    type: "breaks",
  },
  {
    date: 31,
    month: 11,
    year: 2025,
    title: "New Year's Eve",
    type: "breaks",
  },

  // January 2026
  {
    date: 1,
    month: 0,
    year: 2026,
    title: "New Year's Day",
    type: "holidays",
  },
  {
    date: 2,
    month: 0,
    year: 2026,
    title: "Winter Break",
    type: "breaks",
  },
  {
    date: 19,
    month: 0,
    year: 2026,
    title: "MLK Jr. Day",
    type: "holidays",
  },
  {
    date: 21,
    month: 0,
    year: 2026,
    title: "Q2 Ends (42 days)",
    type: "academic",
  },
  {
    date: 23,
    month: 0,
    year: 2026,
    title: "Teacher Workday",
    type: "workdays",
  },

  // February 2026
  {
    date: 11,
    month: 1,
    year: 2026,
    title: "Early Release Day",
    type: "early-release",
  },
  {
    date: 16,
    month: 1,
    year: 2026,
    title: "Teacher Workday",
    type: "workdays",
  },

  // March 2026
  {
    date: 3,
    month: 2,
    year: 2026,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 20,
    month: 2,
    year: 2026,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 27,
    month: 2,
    year: 2026,
    title: "Early Release Day",
    type: "early-release",
  },

  // April 2026
  {
    date: 2,
    month: 3,
    year: 2026,
    title: "Q3 Ends (47 days)",
    type: "academic",
  },
  {
    date: 3,
    month: 3,
    year: 2026,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 6,
    month: 3,
    year: 2026,
    title: "Spring Break Begins",
    type: "breaks",
  },
  {
    date: 7,
    month: 3,
    year: 2026,
    title: "Spring Break",
    type: "breaks",
  },
  {
    date: 8,
    month: 3,
    year: 2026,
    title: "Spring Break",
    type: "breaks",
  },
  {
    date: 9,
    month: 3,
    year: 2026,
    title: "Spring Break",
    type: "breaks",
  },
  {
    date: 10,
    month: 3,
    year: 2026,
    title: "Spring Break",
    type: "breaks",
  },
  {
    date: 29,
    month: 3,
    year: 2026,
    title: "Early Release Day",
    type: "early-release",
  },

  // May 2026
  {
    date: 25,
    month: 4,
    year: 2026,
    title: "Memorial Day",
    type: "holidays",
  },

  // June 2026
  {
    date: 10,
    month: 5,
    year: 2026,
    title: "Last Day of School",
    type: "milestones",
  },
  {
    date: 11,
    month: 5,
    year: 2026,
    title: "Teacher Workday",
    type: "workdays",
  },
  {
    date: 12,
    month: 5,
    year: 2026,
    title: "Teacher Workday",
    type: "workdays",
  },
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function Component() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)) // June 2025
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({ username: "", password: "" })

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

  // A/B Day Logic
  const getABDay = (date: Date) => {
    const firstDayOfSchool = new Date(2025, 7, 25) // August 25, 2025
    const lastDayOfSchool = new Date(2026, 5, 10) // June 10, 2026

    // Check if date is within school year
    if (date < firstDayOfSchool || date > lastDayOfSchool) {
      return null
    }

    // Check if it's a weekend
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return null
    }

    // Check if it's a holiday or break
    const dateEvents = events.filter(
      (event) =>
        event.date === date.getDate() &&
        event.month === date.getMonth() &&
        event.year === date.getFullYear() &&
        (event.type === "holidays" || event.type === "breaks" || event.type === "workdays"),
    )

    if (dateEvents.length > 0) {
      return null
    }

    // Count school days since first day of school
    let schoolDays = 0
    const currentDay = new Date(firstDayOfSchool)

    while (currentDay <= date) {
      const currentDayOfWeek = currentDay.getDay()

      // Skip weekends
      if (currentDayOfWeek !== 0 && currentDayOfWeek !== 6) {
        // Check if it's not a holiday/break/workday
        const currentDayEvents = events.filter(
          (event) =>
            event.date === currentDay.getDate() &&
            event.month === currentDay.getMonth() &&
            event.year === currentDay.getFullYear() &&
            (event.type === "holidays" || event.type === "breaks" || event.type === "workdays"),
        )

        if (currentDayEvents.length === 0) {
          schoolDays++
        }
      }

      currentDay.setDate(currentDay.getDate() + 1)
    }

    return schoolDays % 2 === 1 ? "A" : "B"
  }

  const handleLogin = () => {
    if (loginCredentials.username === "admin" && loginCredentials.password === "password123") {
      setIsLoggedIn(true)
      setShowLogin(false)
      setLoginCredentials({ username: "", password: "" })
    } else {
      alert("Invalid credentials")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
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

    // Previous month days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const daysInPrevMonth = getDaysInMonth(prevMonth)

    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPrevMonth: true,
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        date: i,
        isCurrentMonth: true,
        isPrevMonth: false,
      })
    }

    // Next month days to fill the grid
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
    const filteredEvents = events.filter(
      (event) =>
        event.date === date && event.month === currentDate.getMonth() && event.year === currentDate.getFullYear(),
    )

    if (activeCategory === "all") {
      return filteredEvents
    }

    return filteredEvents.filter((event) => event.type === activeCategory)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Charlotte-Mecklenburg Schools</h1>
                <p className="text-blue-200 text-sm">School Events Calendar</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-blue-200 transition-colors">
                  Home
                </a>
                <a href="#" className="hover:text-blue-200 transition-colors">
                  Calendar
                </a>
                <a href="#" className="hover:text-blue-200 transition-colors">
                  Announcements
                </a>
                <a href="#" className="hover:text-blue-200 transition-colors">
                  About
                </a>
                <a href="#" className="hover:text-blue-200 transition-colors">
                  Contact
                </a>
              </nav>
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Admin</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>
                  <LogIn className="h-4 w-4 mr-1" />
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
              <p className="text-xs text-gray-500">Demo: admin / password123</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Category Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {eventCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeCategory === category.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Color Legend */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-200 border border-blue-300 rounded"></div>
              <span>Teacher Workdays</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-200 border border-red-300 rounded"></div>
              <span>Holidays</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-200 border border-purple-300 rounded"></div>
              <span>School Breaks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-200 border border-green-300 rounded"></div>
              <span>Academic</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-200 border border-orange-300 rounded"></div>
              <span>Early Release</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-200 border border-yellow-300 rounded"></div>
              <span>Milestones</span>
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
            {isLoggedIn && (
              <Button size="sm">
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
                          abDay === "A" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                        }`}
                      >
                        {abDay}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    {day.isCurrentMonth &&
                      getEventsForDate(day.date).map((event, eventIndex) => (
                        <div key={eventIndex} className="relative group">
                          <Badge
                            variant="secondary"
                            className={`text-xs px-2 py-1 block w-full text-left ${eventTypeColors[event.type]} border`}
                          >
                            {event.title}
                          </Badge>
                          {isLoggedIn && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
