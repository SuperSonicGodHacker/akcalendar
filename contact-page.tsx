"use client"

import { useState } from "react"
import { ArrowLeft, Mail, Phone, MapPin, Clock, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { StaffDirectory } from "@/components/staff-directory"

interface ContactPageProps {
  onNavigate: (page: string) => void
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [showStaffDirectory, setShowStaffDirectory] = useState(false)

  const schoolInfo = {
    name: "Ardrey Kell High School",
    address: "10220 Ardrey Kell Rd, Charlotte, NC 28277",
    phone: "(980) 343-6200",
    fax: "(980) 343-6201",
    hours: "7:30 AM - 3:30 PM",
    website: "https://schools.cms.k12.nc.us/ardreykelHS/Pages/default.aspx",
  }

  const quickContacts = [
    {
      title: "Main Office",
      phone: "(980) 343-6200",
      email: "ardreykelHS@cms.k12.nc.us",
      hours: "7:00 AM - 4:00 PM",
    },
    {
      title: "Attendance Office",
      phone: "(980) 343-6205",
      email: "attendance.ardreykelHS@cms.k12.nc.us",
      hours: "7:00 AM - 4:00 PM",
    },
    {
      title: "Guidance Office",
      phone: "(980) 343-6210",
      email: "guidance.ardreykelHS@cms.k12.nc.us",
      hours: "7:30 AM - 3:30 PM",
    },
    {
      title: "Athletics",
      phone: "(980) 343-6215",
      email: "athletics.ardreykelHS@cms.k12.nc.us",
      hours: "8:00 AM - 5:00 PM",
    },
  ]

  const departments = [
    {
      name: "Administration",
      description: "Principal and Assistant Principals",
      contact: "admin.ardreykelHS@cms.k12.nc.us",
      count: 5,
    },
    {
      name: "English Department",
      description: "English Language Arts Teachers",
      contact: "english.ardreykelHS@cms.k12.nc.us",
      count: 25,
    },
    {
      name: "Mathematics Department",
      description: "Math Teachers and Specialists",
      contact: "math.ardreykelHS@cms.k12.nc.us",
      count: 22,
    },
    {
      name: "Science Department",
      description: "Biology, Chemistry, Physics, Earth Science",
      contact: "science.ardreykelHS@cms.k12.nc.us",
      count: 18,
    },
    {
      name: "Social Studies Department",
      description: "History, Government, Geography",
      contact: "socialstudies.ardreykelHS@cms.k12.nc.us",
      count: 20,
    },
    {
      name: "World Languages",
      description: "Spanish, French, and ESL",
      contact: "languages.ardreykelHS@cms.k12.nc.us",
      count: 15,
    },
    {
      name: "Fine Arts",
      description: "Art, Music, Theater",
      contact: "finearts.ardreykelHS@cms.k12.nc.us",
      count: 8,
    },
    {
      name: "Physical Education",
      description: "PE and Health Teachers",
      contact: "pe.ardreykelHS@cms.k12.nc.us",
      count: 12,
    },
    {
      name: "Career & Technical Education",
      description: "CTE and Business Education",
      contact: "cte.ardreykelHS@cms.k12.nc.us",
      count: 15,
    },
    {
      name: "Exceptional Children",
      description: "Special Education Services",
      contact: "ec.ardreykelHS@cms.k12.nc.us",
      count: 10,
    },
  ]

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
                <p className="text-purple-200 text-sm">Contact Information</p>
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
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-purple-200 transition-colors font-medium text-purple-200"
                >
                  Contact
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
            <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* School Information */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>School Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{schoolInfo.name}</h3>
                  <p className="text-gray-600">{schoolInfo.address}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{schoolInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{schoolInfo.hours}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a
                    href="mailto:ardreykelHS@cms.k12.nc.us"
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    ardreykelHS@cms.k12.nc.us
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickContacts.map((contact, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                    <h4 className="font-semibold text-sm">{contact.title}</h4>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                    <p className="text-sm text-gray-600">{contact.hours}</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Staff Directory and Google Doc */}
          <div className="lg:col-span-2">
            {/* Staff Directory Button */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Staff Directory</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Access our complete staff directory with contact information for all faculty and staff members.
                </p>
                <Button onClick={() => setShowStaffDirectory(true)} className="bg-purple-600 hover:bg-purple-700">
                  <Users className="h-4 w-4 mr-2" />
                  View Staff Directory
                </Button>
              </CardContent>
            </Card>

            {/* Google Doc Embed */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Complete Staff Contact List</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  View the complete staff contact list with names and email addresses.
                </p>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    src="https://docs.google.com/document/d/1Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8/edit?usp=sharing"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    title="Staff Contact List"
                    className="w-full"
                  >
                    <p>
                      Your browser does not support iframes. Please{" "}
                      <a
                        href="https://docs.google.com/document/d/1Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800"
                      >
                        click here to view the document
                      </a>
                      .
                    </p>
                  </iframe>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    Can't see the document?{" "}
                    <a
                      href="https://docs.google.com/document/d/1Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800"
                    >
                      Open in new tab
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Departments */}
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {departments.map((dept, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{dept.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {dept.count} staff
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                      <a
                        href={`mailto:${dept.contact}`}
                        className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        {dept.contact}
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Staff Directory Modal */}
      {showStaffDirectory && <StaffDirectory onClose={() => setShowStaffDirectory(false)} />}
    </div>
  )
}
