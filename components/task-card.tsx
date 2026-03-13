"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  title: string
  description?: string
  location: string
  distance: string
  price: number
  urgency?: "high" | "medium" | "normal"
  onAccept?: () => void
  onCounterOffer?: () => void
  showActions?: boolean
}

export function TaskCard({ 
  title, 
  description, 
  location, 
  distance, 
  price, 
  urgency = "normal",
  onAccept,
  onCounterOffer,
  showActions = true
}: TaskCardProps) {
  const urgencyConfig = {
    high: { bg: "bg-destructive", text: "text-white", label: "Urgent" },
    medium: { bg: "bg-secondary", text: "text-secondary-foreground", label: "Medium" },
    normal: { bg: "bg-muted", text: "text-muted-foreground", label: "Normal" }
  }

  return (
    <Card className="p-4 rounded-xl border border-border overflow-hidden relative">
      {/* Urgency badge - prominent positioning for high urgency */}
      {urgency === "high" && (
        <div className="absolute top-0 right-0">
          <span className={cn(
            "text-xs font-semibold px-3 py-1 rounded-bl-xl",
            urgencyConfig[urgency].bg,
            urgencyConfig[urgency].text
          )}>
            {urgencyConfig[urgency].label}
          </span>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          )}
        </div>
        <span className="text-lg font-bold text-primary whitespace-nowrap">₹{price}</span>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        <span className="text-border">|</span>
        <span className="whitespace-nowrap">{distance}</span>
      </div>

      {showActions && (
        <div className="flex gap-3">
          <Button 
            onClick={onAccept} 
            className="flex-1 rounded-xl"
          >
            Accept
          </Button>
          <Button 
            onClick={onCounterOffer} 
            variant="outline" 
            className="flex-1 rounded-xl"
          >
            Counter Offer
          </Button>
        </div>
      )}
    </Card>
  )
}
