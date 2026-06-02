"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Briefcase, Heart, Users, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"


interface Announcement {
  id: number
  title: string
  content: string
  category: string
  created_at: string
  posted_by: string
}

interface User {
  id: number
  email: string
  name: string
  role: string
}

interface AnnouncementsPageProps {
  onNavigate: (page: string) => void
  user: User | null
  onLogout: () => void
  viewAsStudent: boolean
  setViewAsStudent: (value: boolean) => void
}

export default function AnnouncementsPage({
  onNavigate,
  user,
  onLogout,
  viewAsStudent,
  setViewAsStudent
}: AnnouncementsPageProps) {
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch announcements from database
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("/api/announcements")
      if (response.ok) {
        const data = await response.json()
        setAnnouncements(data)
      }
    } catch (error) {
      console.error("Error fetching announcements:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    category: "",
  })

  const categories = [
    { id: "all", label: "All Announcements", icon: Users },
    { id: "sports", label: "Sports", icon: Users },
    { id: "fine-arts", label: "Fine Arts", icon: Users },
    { id: "academic-events", label: "Academic Events", icon: Users },
    { id: "clubs", label: "Clubs", icon: Users },
    { id: "special-events", label: "Special Events", icon: Users },
    { id: "jobs", label: "Job Opportunities", icon: Briefcase },
    { id: "volunteer", label: "Volunteer Opportunities", icon: Heart },
  ]


  const handleAddAnnouncement = async () => {
    if (newAnnouncement.title && newAnnouncement.content && newAnnouncement.category) {
      try {
        const response = await fetch("/api/announcements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newAnnouncement.title,
            content: newAnnouncement.content,
            category: newAnnouncement.category,
            posted_by: user?.name || user?.email || 'Admin',
          }),
        })
        if (response.ok) {
          await fetchAnnouncements()
          setNewAnnouncement({ title: "", content: "", category: "" })
          setShowAddAnnouncement(false)
        }
      } catch (error) {
        console.error("Error adding announcement:", error)
        alert("Failed to add announcement")
      }
    }
  }

  const handleDeleteAnnouncement = async (id: number) => {
    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        await fetchAnnouncements()
      }
    } catch (error) {
      console.error("Error deleting announcement:", error)
      alert("Failed to delete announcement")
    }
  }

  const filteredAnnouncements =
    selectedCategory === "all" ? announcements : announcements.filter((ann) => ann.category === selectedCategory)

  const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    sports: "bg-red-100 text-red-800",
    "fine-arts": "bg-purple-100 text-purple-800",
    "academic-events": "bg-blue-100 text-blue-800",
    clubs: "bg-yellow-100 text-yellow-800",
      "special-events": "bg-orange-100 text-orange-800",
      internships: "bg-indigo-100 text-indigo-800",
      jobs: "bg-teal-100 text-teal-800",
      volunteer: "bg-pink-100 text-pink-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
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
                <p className="text-purple-200 text-sm">Announcements</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => onNavigate("calendar")}
                  className="hover:text-purple-200 transition-colors font-medium"
                >
                  Calendar
                </button>
                <button
                  onClick={() => onNavigate("announcements")}
                  className="hover:text-purple-200 transition-colors font-medium text-purple-200"
                >
                  Announcements
                </button>
              </nav>
              <div className="flex items-center space-x-2">
                {user ? (
                  <>
                    <span className="text-sm">{user.name || user.email}</span>
                    {!viewAsStudent && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewAsStudent(true)}
                        className="bg-white text-purple-900 hover:bg-gray-100"
                      >
                        View as Student
                      </Button>
                    )}
                    {viewAsStudent && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewAsStudent(false)}
                        className="bg-white text-purple-900 hover:bg-gray-100"
                      >
                        View as Admin
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onLogout}
                      className="bg-white text-purple-900 hover:bg-gray-100"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="text-sm bg-white text-purple-900 hover:bg-gray-100 px-3 py-1 rounded border font-medium"
                  >
                    Admin Sign In
                  </a>
                )}
                </div>
            </div>
          </div>
        </div>
      </header>

      {/* Add Announcement Modal */}
      {showAddAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New Announcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newAnnouncement.category}
                  onValueChange={(value) => setNewAnnouncement((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  rows={4}
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement((prev) => ({ ...prev, content: e.target.value }))}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddAnnouncement} className="flex-1">
                  Add Announcement
                </Button>
                <Button variant="outline" onClick={() => setShowAddAnnouncement(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Announcements</h2>
          {user && !viewAsStudent && (
            <Button onClick={() => setShowAddAnnouncement(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Announcement
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? "bg-purple-100 text-purple-800"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Announcements List */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <span className="ml-2 text-gray-600">Loading announcements...</span>
              </div>
            ) : filteredAnnouncements.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No announcements found in this category.
              </div>
            ) : (
            <div className="space-y-4">
              {filteredAnnouncements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getCategoryColor(announcement.category)}>
                            {categories.find((cat) => cat.id === announcement.category)?.label}
                          </Badge>
                          <span className="text-sm text-gray-500">{new Date(announcement.created_at).toLocaleDateString()}</span>
                        </div>
                        <CardTitle className="text-xl">{announcement.title}</CardTitle>
                      </div>
                      {user && !viewAsStudent && (
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDeleteAnnouncement(announcement.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-2">{announcement.content}</p>
                    <p className="text-sm text-gray-500">Posted by: {announcement.posted_by}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
