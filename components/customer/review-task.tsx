"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, AlertCircle, Mic, Image as ImageIcon } from "lucide-react"

interface ReviewTaskProps {
  taskData: {
    title: string
    description?: string
    category?: string
    location: string
    media: string[]
    price: number
    duration: string
    urgency: string
    allowCounterOffer: boolean
    hasAudio?: boolean
  }
  onSubmit: () => void
  onBack: () => void
}

export function ReviewTask({ taskData, onSubmit, onBack }: ReviewTaskProps) {
  const urgencyLabels = {
    high: { label: "High Priority", color: "text-destructive" },
    medium: { label: "Medium Priority", color: "text-secondary-foreground" },
    normal: { label: "Normal", color: "text-muted-foreground" },
  }

  return (
    <div className="px-4 py-6 space-y-4 pb-32">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-foreground">Review Your Task</h2>
        <p className="text-sm text-muted-foreground">Make sure everything looks good</p>
      </div>

      {/* Task Info Card */}
      <Card className="p-4 rounded-xl space-y-4">
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Task</span>
          <h3 className="text-lg font-semibold text-foreground">{taskData.title}</h3>
          {taskData.category && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
              {taskData.category}
            </span>
          )}
        </div>
        
        {taskData.description && (
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Description</span>
            <p className="text-sm text-foreground mt-1">{taskData.description}</p>
          </div>
        )}
      </Card>

      {/* Location Card */}
      <Card className="p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Location</span>
            <p className="text-sm font-medium text-foreground">{taskData.location}</p>
          </div>
        </div>
      </Card>

      {/* Media Card */}
      {taskData.media.length > 0 && (
        <Card className="p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Media</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {taskData.media.map((src, index) => (
              <div key={index} className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Audio Card */}
      {taskData.hasAudio && (
        <Card className="p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mic className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Audio Note</span>
              <p className="text-sm font-medium text-foreground">Recording attached</p>
            </div>
          </div>
        </Card>
      )}

      {/* Price & Details Card */}
      <Card className="p-4 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Your Budget</span>
            <p className="text-2xl font-bold text-primary">₹{taskData.price}</p>
          </div>
          {taskData.allowCounterOffer && (
            <span className="text-xs px-2 py-1 rounded-full bg-secondary/30 text-secondary-foreground">
              Counter offers allowed
            </span>
          )}
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{taskData.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className={`h-4 w-4 ${urgencyLabels[taskData.urgency as keyof typeof urgencyLabels].color}`} />
            <span className={`text-sm ${urgencyLabels[taskData.urgency as keyof typeof urgencyLabels].color}`}>
              {urgencyLabels[taskData.urgency as keyof typeof urgencyLabels].label}
            </span>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <div className="fixed bottom-20 left-0 right-0 px-4 max-w-lg mx-auto">
        <Button 
          onClick={onSubmit}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25"
        >
          Find Help Nearby
        </Button>
      </div>
    </div>
  )
}
