"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, ChevronRight, Search, Navigation, X } from "lucide-react"

interface CreateTaskProps {
  onContinue: (data: { title: string; description: string; category?: string; location: string }) => void
  onBack: () => void
}

const categories = [
  "Moving", "Repairs", "Cleaning", "Assembly", "Installation", "Other"
]

const taskPlaceholders = [
  "Move boxes",
  "Fix leaking tap",
  "Help assemble furniture"
]

export function CreateTask({ onContinue, onBack }: CreateTaskProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const [location, setLocation] = useState("")
  const [isDetecting, setIsDetecting] = useState(true)
  const [showMapSelector, setShowMapSelector] = useState(false)
  const [searchAddress, setSearchAddress] = useState("")
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  // Simulate location detection
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDetecting(false)
      setLocation("Downtown, Sector 15")
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Rotate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % taskPlaceholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleUseCurrentLocation = () => {
    setIsDetecting(true)
    setTimeout(() => {
      setIsDetecting(false)
      setLocation("Downtown, Sector 15")
      setShowMapSelector(false)
    }, 1500)
  }

  const handleSelectAddress = () => {
    if (searchAddress.trim()) {
      setLocation(searchAddress)
      setShowMapSelector(false)
      setSearchAddress("")
    }
  }

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      {/* Task Title - First as per spec */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">What do you need help with?</label>
        <Input
          placeholder={taskPlaceholders[placeholderIndex]}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-14 text-lg rounded-xl"
        />
      </div>

      {/* Category Selection - Optional */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Category <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(category === cat ? null : cat)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                category === cat 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Location</label>
        <button
          onClick={() => setShowMapSelector(true)}
          className="w-full flex items-center gap-3 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-left"
        >
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            {isDetecting ? (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Detecting location...</span>
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-foreground truncate">{location}</p>
                <p className="text-xs text-muted-foreground">Tap to change</p>
              </>
            )}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </button>
      </div>

      {/* Description - Optional */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Description <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Textarea
          placeholder="Add more details if needed."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] rounded-xl resize-none"
        />
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-20 left-0 right-0 px-4 max-w-lg mx-auto">
        <Button 
          onClick={() => onContinue({ title, description, category: category || undefined, location })}
          disabled={!title.trim() || !location}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25"
        >
          Continue
        </Button>
      </div>

      {/* Map Selector Dialog */}
      <Dialog open={showMapSelector} onOpenChange={setShowMapSelector}>
        <DialogContent className="max-w-md mx-4 rounded-2xl p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle>Select Location</DialogTitle>
              <button 
                onClick={() => setShowMapSelector(false)}
                className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>
          
          {/* Search Field */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search address..."
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="pl-10 h-12 rounded-xl"
              />
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-64 bg-muted relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Drag pin to adjust location</p>
              </div>
            </div>
            {/* Grid pattern for map feel */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 space-y-3">
            <Button 
              onClick={handleUseCurrentLocation}
              variant="outline"
              className="w-full h-12 rounded-xl"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>
            {searchAddress.trim() && (
              <Button 
                onClick={handleSelectAddress}
                className="w-full h-12 rounded-xl"
              >
                Use This Address
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
