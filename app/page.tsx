"use client"

import { useState, useEffect } from "react"
import SchoolCalendar from "../school-calendar"
import AnnouncementsPage from "../announcements-page"
import ContactPage from "../contact-page"

interface User {
  id: number
  email: string
  name: string
  role: string
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState("calendar")
  const [user, setUser] = useState<User | null>(null)
  const [viewAsStudent, setViewAsStudent] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user)
      })
      .catch(() => {})
      .finally(() => setAuthChecked(true))
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    setViewAsStudent(false)
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    )
  }

  const sharedProps = {
    user,
    onLogout: handleLogout,
    viewAsStudent,
    setViewAsStudent,
  }

  return (
    <div>
      {currentPage === "calendar" && <SchoolCalendar onNavigate={setCurrentPage} {...sharedProps} />}
      {currentPage === "announcements" && <AnnouncementsPage onNavigate={setCurrentPage} {...sharedProps} />}
      {currentPage === "contact" && <ContactPage onNavigate={setCurrentPage} {...sharedProps} />}
    </div>
  )
}
