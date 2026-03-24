"use client"

import { useState } from "react"
import { Search, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getAllStaffMembers } from "@/lib/staff-directory"

interface StaffDirectoryProps {
  onClose: () => void
}

export function StaffDirectory({ onClose }: StaffDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const allStaff = getAllStaffMembers()
  const departments = Array.from(new Set(allStaff.map((staff) => staff.department))).sort()

  const filteredStaff = allStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || staff.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      Administration: "bg-purple-100 text-purple-800",
      English: "bg-blue-100 text-blue-800",
      Math: "bg-green-100 text-green-800",
      Science: "bg-red-100 text-red-800",
      "Social Studies": "bg-yellow-100 text-yellow-800",
      Spanish: "bg-orange-100 text-orange-800",
      "Physical Education": "bg-teal-100 text-teal-800",
      Art: "bg-pink-100 text-pink-800",
      Music: "bg-indigo-100 text-indigo-800",
    }
    return colors[department] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Staff Directory</CardTitle>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff.map((staff, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <h3 className="font-semibold text-sm">{staff.name}</h3>
                    </div>
                    <Badge className={`text-xs ${getDepartmentColor(staff.department)}`}>{staff.department}</Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{staff.role}</p>

                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Mail className="h-3 w-3" />
                    <a href={`mailto:${staff.email}`} className="hover:text-purple-600 transition-colors truncate">
                      {staff.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-8 text-gray-500">No staff members found matching your search criteria.</div>
          )}

          <div className="mt-6 text-sm text-gray-500 text-center">
            Showing {filteredStaff.length} of {allStaff.length} staff members
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
