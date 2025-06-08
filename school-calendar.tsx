"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const eventCategories = [
  { id: "all", label: "All Events", active: true },
  { id: "sports", label: "Sports", active: false },
  { id: "arts", label: "Arts & Theater", active: false },
  { id: "music", label: "Music & Band", active: false },
  { id: "academic", label: "Academic", active: false },
  { id: "clubs", label: "Clubs", active: false },
  { id: "announcements", label: "Announcements", active: false },
]

const events = [
  // June 2025 events
  {
    date: 5,
    month: 5,
    year: 2025,
    title: "Graduation Ceremony",
    category: "announcements",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    date: 10,
    month: 5,
    year: 2025,
    title: "Summer Band Camp",
    category: "music",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    date: 15,
    month: 5,
    year: 2025,
    title: "Baseball Championship",
    category: "sports",
    color: "bg-red-100 text-red-800 border-red-200",
  },

  // July 2025 events
  {
    date: 4,
    month: 6,
    year: 2025,
    title: "Independence Day - No School",
    category: "announcements",
    color: "bg-gray-100 text-gray-800 border-gray-200",
  },
  {
    date: 12,
    month: 6,
    year: 2025,
    title: "Summer Theater Workshop",
    category: "arts",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },

  // August 2025 events
  {
    date: 15,
    month: 7,
    year: 2025,
    title: "Back to School Prep",
    category: "announcements",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    date: 25,
    month: 7,
    year: 2025,
    title: "Fall Sports Tryouts",
    category: "sports",
    color: "bg-red-100 text-red-800 border-red-200",
  },

  // September 2025 events
  {
    date: 1,
    month: 8,
    year: 2025,
    title: "Football vs. West High",
    category: "sports",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    date: 5,
    month: 8,
    year: 2025,
    title: "Science Fair Meeting",
    category: "academic",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    date: 7,
    month: 8,
    year: 2025,
    title: "Band Practice",
    category: "music",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    date: 12,
    month: 8,
    year: 2025,
    title: "Chess Club",
    category: "clubs",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },

  // October 2025 events
  {
    date: 31,
    month: 9,
    year: 2025,
    title: "Halloween Dance",
    category: "announcements",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    date: 15,
    month: 9,
    year: 2025,
    title: "Fall Play Auditions",
    category: "arts",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function Component() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)) // June 2025 (month is 0-indexed)

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
    return events.filter(
      (event) =>
        event.date === date && event.month === currentDate.getMonth() && event.year === currentDate.getFullYear(),
    )
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
                <h1 className="text-2xl font-bold">Ardrey Kell High School</h1>
                <p className="text-blue-200 text-sm">School Events Calendar</p>
              </div>
            </div>
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
          </div>
        </div>
      </header>

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
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b last:border-r-0 ${
                  !day.isCurrentMonth ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className={`text-sm font-medium mb-2 ${!day.isCurrentMonth ? "text-gray-400" : "text-gray-900"}`}>
                  {day.date}
                </div>
                <div className="space-y-1">
                  {day.isCurrentMonth &&
                    getEventsForDate(day.date).map((event, eventIndex) => (
                      <Badge
                        key={eventIndex}
                        variant="secondary"
                        className={`text-xs px-2 py-1 block w-full text-left ${event.color} border`}
                      >
                        {event.title}
                      </Badge>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
