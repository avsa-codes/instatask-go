"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, MessageCircle, Navigation, CheckCircle2, Star, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActiveTaskProps {
  worker: {
    name: string
    phone: string
    avatar?: string
    rating: number
  }
  task: {
    title: string
    location: string
    price: number
  }
  status: "accepted" | "on_the_way" | "work_started" | "completed"
  onOpenMaps: () => void
  onMessage: () => void
  onCall: () => void
  onPay: () => void
}

const statusSteps = [
  { key: "accepted", label: "Accepted" },
  { key: "on_the_way", label: "On the way" },
  { key: "work_started", label: "Work started" },
  { key: "completed", label: "Completed" },
]

export function ActiveTask({ 
  worker, 
  task, 
  status, 
  onOpenMaps, 
  onMessage, 
  onCall,
  onPay
}: ActiveTaskProps) {
  const currentStepIndex = statusSteps.findIndex(s => s.key === status)

  return (
    <div className="px-4 py-6 space-y-4 pb-32">
      {/* Status Header */}
      <div className="text-center py-2">
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
          status === "on_the_way" ? "bg-primary/10 text-primary" : 
          status === "work_started" ? "bg-secondary/30 text-secondary-foreground" :
          status === "completed" ? "bg-green-100 text-green-700" : 
          "bg-muted text-muted-foreground"
        )}>
          <span className={cn(
            "h-2 w-2 rounded-full",
            status === "completed" ? "bg-green-500" : "bg-primary animate-pulse"
          )}></span>
          {status === "on_the_way" ? "Worker On The Way" : 
           status === "work_started" ? "Work In Progress" :
           status === "completed" ? "Task Completed" : "Worker Assigned"}
        </div>
      </div>

      {/* Worker Card */}
      <Card className="p-4 rounded-xl">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={worker.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
              {worker.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">{worker.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="font-medium">{worker.rating}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={onCall}
              className="h-11 w-11 rounded-full"
              aria-label="Call worker"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={onMessage}
              className="h-11 w-11 rounded-full"
              aria-label="Message worker"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Map Area */}
      <div className="rounded-xl overflow-hidden bg-muted relative h-52">
        {/* Map visualization */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted to-muted/80">
          {/* Grid pattern */}
          <svg className="w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mapgrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapgrid)" />
          </svg>
        </div>
        
        {/* Location marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping"></div>
            <div className="relative h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <MapPin className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Worker indicator when on the way */}
        {status === "on_the_way" && (
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur rounded-lg px-3 py-2 shadow-md flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Navigation className="h-3 w-3 text-primary" />
            </div>
            <span className="text-xs font-medium">Arriving in ~5 min</span>
          </div>
        )}
      </div>

      {/* Open in Maps Button */}
      <Button 
        onClick={onOpenMaps}
        variant="outline"
        className="w-full h-12 rounded-xl"
      >
        <Navigation className="h-4 w-4 mr-2" />
        Open in Google Maps
      </Button>

      {/* Status Timeline */}
      <Card className="p-4 rounded-xl">
        <h3 className="font-semibold text-foreground mb-4">Status</h3>
        <div className="space-y-4">
          {statusSteps.map((step, index) => {
            const isCompleted = index < currentStepIndex
            const isCurrent = index === currentStepIndex

            return (
              <div key={step.key} className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                  isCompleted ? "bg-primary" : isCurrent ? "bg-primary" : "bg-muted"
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <span className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-primary-foreground" : "text-muted-foreground"
                    )}>{index + 1}</span>
                  )}
                </div>
                <span className={cn(
                  "text-sm font-medium flex-1",
                  isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>{step.label}</span>
                {isCurrent && (
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    Current
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Payment Button - Only show when completed */}
      {status === "completed" && (
        <div className="fixed bottom-20 left-0 right-0 px-4 max-w-lg mx-auto">
          <Button 
            onClick={onPay}
            size="lg"
            className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25"
          >
            Pay ₹{task.price}
          </Button>
        </div>
      )}
    </div>
  )
}
