"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState("calendar")
  const [user, setUser] = useState<User | null>(null)
  const [viewAsStudent, setViewAsStudent] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/login")
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data?.user) setUser(data.user)
      })
      .catch(() => router.push("/login"))
  }, [router])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  if (!user) {
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
