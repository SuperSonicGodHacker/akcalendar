"use client"

import { useState } from "react"
import { ArrowLeft, Mail, Search, Users, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { getAllStaffMembers } from "@/lib/staff-directory"

interface ContactPageProps {
  onNavigate: (page: string) => void
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  currentStaffMember: any
  setCurrentStaffMember: (value: any) => void
  viewAsStudent: boolean
  setViewAsStudent: (value: boolean) => void
}

export default function ContactPage({ 
  onNavigate,
  isLoggedIn,
  setIsLoggedIn,
  currentStaffMember,
  setCurrentStaffMember,
  viewAsStudent,
  setViewAsStudent
}: ContactPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const allStaff = getAllStaffMembers()
  const departments = Array.from(new Set(allStaff.map((staff) => staff.department))).sort()

  const filteredStaff = allStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || staff.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      Administration: "bg-purple-100 text-purple-800 border-purple-200",
      English: "bg-blue-100 text-blue-800 border-blue-200",
      Math: "bg-green-100 text-green-800 border-green-200",
      Science: "bg-red-100 text-red-800 border-red-200",
      "Social Studies": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Spanish: "bg-orange-100 text-orange-800 border-orange-200",
      "Physical Education": "bg-teal-100 text-teal-800 border-teal-200",
      Art: "bg-pink-100 text-pink-800 border-pink-200",
      "Choral Music": "bg-indigo-100 text-indigo-800 border-indigo-200",
      Band: "bg-indigo-100 text-indigo-800 border-indigo-200",
      "English Learner": "bg-cyan-100 text-cyan-800 border-cyan-200",
      "Exceptional Children": "bg-lime-100 text-lime-800 border-lime-200",
      "Health Occupations": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "Theater Arts": "bg-violet-100 text-violet-800 border-violet-200",
      "Business Education": "bg-slate-100 text-slate-800 border-slate-200",
      "Technology Education": "bg-gray-100 text-gray-800 border-gray-200",
      "Marketing Education": "bg-rose-100 text-rose-800 border-rose-200",
      Architecture: "bg-amber-100 text-amber-800 border-amber-200",
      Chemistry: "bg-red-200 text-red-900 border-red-300",
      Biology: "bg-green-200 text-green-900 border-green-300",
      "Earth Science": "bg-brown-100 text-brown-800 border-brown-200",
      History: "bg-yellow-200 text-yellow-900 border-yellow-300",
      French: "bg-blue-200 text-blue-900 border-blue-300",
      ROTC: "bg-gray-200 text-gray-900 border-gray-300",
      Master: "bg-gold-100 text-gold-800 border-gold-200",
    }
    return colors[department] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getDepartmentStats = () => {
    const stats: { [key: string]: number } = {}
    allStaff.forEach((staff) => {
      stats[staff.department] = (stats[staff.department] || 0) + 1
    })
    return stats
  }

  const departmentStats = getDepartmentStats()

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
                <p className="text-purple-200 text-sm">Staff Contacts</p>
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
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-purple-200 transition-colors font-medium text-purple-200"
                >
                  Staff Contacts
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => onNavigate("calendar")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Calendar
            </Button>
            <h2 className="text-3xl font-bold text-gray-900">Staff Directory</h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>
              Showing {filteredStaff.length} of {allStaff.length} staff members
            </span>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, department, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Department Filter */}
              <div className="lg:w-64">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="all">All Departments ({allStaff.length})</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept} ({departmentStats[dept]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        {selectedDepartment === "all" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Departments Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`p-3 rounded-lg border text-left hover:shadow-md transition-all ${getDepartmentColor(dept)}`}
                  >
                    <div className="font-semibold text-sm">{dept}</div>
                    <div className="text-xs opacity-75">{departmentStats[dept]} staff</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((staff, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{staff.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{staff.role}</p>
                  </div>
                </div>

                <Badge className={`mb-3 text-xs ${getDepartmentColor(staff.department)}`}>{staff.department}</Badge>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <a
                      href={`mailto:${staff.email}`}
                      className="text-sm text-purple-600 hover:text-purple-800 transition-colors break-all"
                      title={staff.email}
                    >
                      {staff.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredStaff.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No staff members found</h3>
              <p className="text-gray-600 mb-4">
                No staff members match your current search criteria. Try adjusting your search terms or department
                filter.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedDepartment("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Footer Stats */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Total Staff: {allStaff.length} • Departments: {departments.length} • Administration:{" "}
            {departmentStats.Administration || 0} • Faculty: {allStaff.length - (departmentStats.Administration || 0)}
          </p>
        </div>
      </div>
    </div>
  )
}
