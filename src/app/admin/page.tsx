"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase, type Course, type College, type Workshop, type Testimonial, type Stat } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, ArrowLeft, GraduationCap, Building2, Presentation, MessageSquare, BarChart3 } from "lucide-react"
import Link from "next/link"
import { toast, Toaster } from "sonner"

type DataType = "courses" | "colleges" | "workshops" | "testimonials" | "stats"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<DataType>("courses")
  const [courses, setCourses] = useState<Course[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [stats, setStats] = useState<Stat[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchAllData()
  }, [])

  async function fetchAllData() {
    const [coursesRes, collegesRes, workshopsRes, testimonialsRes, statsRes] = await Promise.all([
      supabase.from("courses").select("*").order("created_at"),
      supabase.from("colleges").select("*").order("created_at"),
      supabase.from("workshops").select("*").order("created_at"),
      supabase.from("testimonials").select("*").order("created_at"),
      supabase.from("stats").select("*"),
    ])
    if (coursesRes.data) setCourses(coursesRes.data)
    if (collegesRes.data) setColleges(collegesRes.data)
    if (workshopsRes.data) setWorkshops(workshopsRes.data)
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data)
    if (statsRes.data) setStats(statsRes.data)
  }

  function openAddDialog() {
    setEditingItem(null)
    setFormData({})
    setIsDialogOpen(true)
  }

  function openEditDialog(item: any) {
    setEditingItem(item)
    setFormData(item)
    setIsDialogOpen(true)
  }

  async function handleSave() {
    try {
      if (editingItem) {
        const { error } = await supabase
          .from(activeTab)
          .update(formData)
          .eq("id", editingItem.id)
        if (error) throw error
        toast.success("Updated successfully!")
      } else {
        const { error } = await supabase.from(activeTab).insert([formData])
        if (error) throw error
        toast.success("Added successfully!")
      }
      setIsDialogOpen(false)
      fetchAllData()
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return
    try {
      const { error } = await supabase.from(activeTab).delete().eq("id", id)
      if (error) throw error
      toast.success("Deleted successfully!")
      fetchAllData()
    } catch (error: any) {
      toast.error(error.message || "An error occurred")
    }
  }

  const getFields = () => {
    switch (activeTab) {
      case "courses":
        return [
          { key: "title", label: "Title", type: "text" },
          { key: "icon", label: "Icon (python/java/cpp/algorithm/ai/quantum)", type: "text" },
          { key: "duration", label: "Duration", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "tag", label: "Tag", type: "text" },
        ]
      case "colleges":
        return [
          { key: "name", label: "Name", type: "text" },
          { key: "logo_url", label: "Logo URL", type: "text" },
        ]
      case "workshops":
        return [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image_url", label: "Image URL", type: "text" },
        ]
      case "testimonials":
        return [
          { key: "name", label: "Name", type: "text" },
          { key: "college", label: "College", type: "text" },
          { key: "feedback", label: "Feedback", type: "textarea" },
          { key: "avatar_url", label: "Avatar URL", type: "text" },
        ]
      case "stats":
        return [
          { key: "key", label: "Key (students/colleges/projects/workshops)", type: "text" },
          { key: "value", label: "Value (number)", type: "number" },
          { key: "label", label: "Label", type: "text" },
        ]
      default:
        return []
    }
  }

  const getData = () => {
    switch (activeTab) {
      case "courses": return courses
      case "colleges": return colleges
      case "workshops": return workshops
      case "testimonials": return testimonials
      case "stats": return stats
      default: return []
    }
  }

  const tabIcons: Record<DataType, any> = {
    courses: GraduationCap,
    colleges: Building2,
    workshops: Presentation,
    testimonials: MessageSquare,
    stats: BarChart3,
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <Toaster position="top-center" richColors />
      
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[#6B7280] hover:text-[#00B3C6] transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-[#1F242B]">Admin Panel</h1>
          </div>
          <img
            src="/logo.svg"
            alt="TRIAD Academy"
            className="h-10"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as DataType)}>
            <TabsList className="grid grid-cols-5 w-full bg-white border border-[#E5E7EB] h-auto p-1 mb-8">
              {(["courses", "colleges", "workshops", "testimonials", "stats"] as DataType[]).map((tab) => {
                const Icon = tabIcons[tab]
                return (
                  <TabsTrigger 
                    key={tab} 
                    value={tab}
                    className="flex items-center gap-2 py-3 data-[state=active]:bg-[#00B3C6] data-[state=active]:text-white capitalize"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#1F242B] capitalize">
                Manage {activeTab}
              </h2>
              <Button 
                onClick={openAddDialog}
                className="bg-[#00B3C6] hover:bg-[#009DAD] text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Add New
              </Button>
            </div>

            <div className="grid gap-4">
              {getData().map((item: any) => (
                <Card key={item.id} className="bg-white border-[#E5E7EB] hover:border-[#00B3C6] transition-colors">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1F242B]">
                        {item.title || item.name || item.label}
                      </h3>
                      <p className="text-sm text-[#6B7280] mt-1 line-clamp-1">
                        {item.description || item.feedback || item.college || `Value: ${item.value}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(item)}
                        className="border-[#00B3C6] text-[#00B3C6] hover:bg-[#00B3C6]/10"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="border-red-500 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {getData().length === 0 && (
                <Card className="bg-white border-[#E5E7EB]">
                  <CardContent className="p-12 text-center">
                    <p className="text-[#6B7280]">No {activeTab} found. Add your first one!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </Tabs>
        </motion.div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#1F242B]">
                {editingItem ? "Edit" : "Add"} {activeTab.slice(0, -1)}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {getFields().map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key} className="text-[#1F242B]">
                    {field.label}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.key}
                      value={formData[field.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="border-[#E5E7EB] focus:border-[#00B3C6] focus:ring-[#00B3C6]"
                    />
                  ) : (
                    <Input
                      id={field.key}
                      type={field.type}
                      value={formData[field.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: field.type === "number" ? parseInt(e.target.value) : e.target.value })}
                      className="border-[#E5E7EB] focus:border-[#00B3C6] focus:ring-[#00B3C6]"
                    />
                  )}
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="border-[#E5E7EB]"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-[#00B3C6] hover:bg-[#009DAD] text-white"
              >
                {editingItem ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
