"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, LogOut, Plus, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

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

const events = [
  // Administrative Events (no color coding)
  {
    date: 4,
    month: 6,
    year: 2025,
    title: "Independence Day Holiday",
    type: "administrative",
    isAdministrative: true,
  },
  {
    date: 18,
    month: 7,
    year: 2025,
    title: "Teacher Workday",
    type: "administrative",
    isAdministrative: true,
  },
  {
    date: 19,
    month: 7,
    year: 2025,
    title: "Teacher Workday",
    type: "administrative",
    isAdministrative: true,
  },
  {
    date: 20,
    month: 7,
    year: 2025,
    title: "Teacher Workday",
    type: "administrative",
    isAdministrative: true,
  },
  {
    date: 21,
    month: 7,
    year: 2025,
    title: "Teacher Workday",
    type: "administrative",
    isAdministrative: true,
  },
  {
    date: 22,
    month: 7,
    year: 2025,
    title: "Teacher Workday",
    type: "administrative",
    isAdministrative: true,
  },
  {
    date: 25,
    month: 7,
    year: 2025,
    title: "First Day of School",
    type: "milestones",
    isAdministrative: true,
  },
  // School Activity Events (with colors)
  {
    date: 5,
    month: 8,
    year: 2025,
    title: "Football vs. West High",
    type: "sports",
    isAdministrative: false,
  },
  {
    date: 12,
    month: 8,
    year: 2025,
    title: "Fall Play Auditions",
    type: "arts",
    isAdministrative: false,
  },
  {
    date: 15,
    month: 8,
    year: 2025,
    title: "Band Concert",
    type: "music",
    isAdministrative: false,
  },
  {
    date: 20,
    month: 8,
    year: 2025,
    title: "Science Fair",
    type: "academic-events",
    isAdministrative: false,
  },
  {
    date: 25,
    month: 8,
    year: 2025,
    title: "Chess Club Meeting",
    type: "clubs",
    isAdministrative: false,
  },
  {
    date: 30,
    month: 8,
    year: 2025,
    title: "Homecoming Dance",
    type: "special-events",
    isAdministrative: false,
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
  const [showPhoneVerification, setShowPhoneVerification] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState({ username: "", password: "" })
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([
    "sports",
    "arts",
    "music",
    "academic-events",
    "clubs",
    "special-events",
  ])

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

    if (date < firstDayOfSchool || date > lastDayOfSchool) {
      return null
    }

    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return null
    }

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

    let schoolDays = 0
    const currentDay = new Date(firstDayOfSchool)

    while (currentDay <= date) {
      const currentDayOfWeek = currentDay.getDay()

      if (currentDayOfWeek !== 0 && currentDayOfWeek !== 6) {
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
    if (loginCredentials.username === "akadministrator2025" && loginCredentials.password === "akadminpassword2025") {
      setShowLogin(false)
      setShowPhoneVerification(true)
      setLoginCredentials({ username: "", password: "" })
    } else {
      alert("Invalid credentials")
    }
  }

  const handlePhoneVerification = () => {
    if (phoneNumber.length >= 10) {
      // Generate a random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setSentCode(code)
      alert(`Verification code sent to ${phoneNumber}: ${code}`)
    } else {
      alert("Please enter a valid phone number")
    }
  }

  const handleVerificationSubmit = () => {
    if (verificationCode === sentCode) {
      setIsLoggedIn(true)
      setShowPhoneVerification(false)
      setPhoneNumber("")
      setVerificationCode("")
      setSentCode("")
    } else {
      alert("Invalid verification code")
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
    const allEvents = events.filter(
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
                <a href="#" className="hover:text-purple-200 transition-colors">
                  About
                </a>
                <a href="#" className="hover:text-purple-200 transition-colors">
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

      {/* Phone Verification Modal */}
      {showPhoneVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button onClick={handlePhoneVerification} className="mt-2 w-full" disabled={!phoneNumber}>
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
                        setShowPhoneVerification(false)
                        setPhoneNumber("")
                        setVerificationCode("")
                        setSentCode("")
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
            {isLoggedIn && (
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
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
                              className={`text-xs px-2 py-1 block w-full text-left ${eventColor} border`}
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
                        )
                      })}
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
