"use client"

import { useState } from "react"
import SchoolCalendar from "../school-calendar"
import AnnouncementsPage from "../announcements-page"

export default function Page() {
  const [currentPage, setCurrentPage] = useState("calendar")

  return (
    <div>
      {currentPage === "calendar" && <SchoolCalendar onNavigate={setCurrentPage} />}
      {currentPage === "announcements" && <AnnouncementsPage onNavigate={setCurrentPage} />}
    </div>
  )
}
