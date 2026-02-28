"use client"

import { useState } from "react"
import SchoolCalendar from "../school-calendar"
import AnnouncementsPage from "../announcements-page"
import ContactPage from "../contact-page"

interface StaffMember {
  name: string
  email: string
  department: string
  role: string
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState("calendar")
  
  // Shared auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentStaffMember, setCurrentStaffMember] = useState<StaffMember | null>(null)
  const [viewAsStudent, setViewAsStudent] = useState(false)

  const authProps = {
    isLoggedIn,
    setIsLoggedIn,
    currentStaffMember,
    setCurrentStaffMember,
    viewAsStudent,
    setViewAsStudent,
  }

  return (
    <div>
      {currentPage === "calendar" && <SchoolCalendar onNavigate={setCurrentPage} {...authProps} />}
      {currentPage === "announcements" && <AnnouncementsPage onNavigate={setCurrentPage} {...authProps} />}
      {currentPage === "contact" && <ContactPage onNavigate={setCurrentPage} {...authProps} />}
    </div>
  )
}
