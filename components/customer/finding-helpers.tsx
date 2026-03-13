"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Spinner } from "@/components/ui/spinner"
import { Star, MapPin } from "lucide-react"

interface Worker {
  id: string
  name: string
  avatar?: string
  rating: number
  reviews: number
  distance: string
  priceOffered: number
}

interface FindingHelpersProps {
  taskTitle: string
  originalPrice: number
  onAcceptWorker: (worker: Worker) => void
  onViewProfile: (worker: Worker) => void
}

const mockWorkers: Worker[] = [
  { id: "1", name: "Rajesh Kumar", rating: 4.8, reviews: 124, distance: "0.5 km", priceOffered: 500 },
  { id: "2", name: "Amit Singh", rating: 4.5, reviews: 89, distance: "1.2 km", priceOffered: 450 },
  { id: "3", name: "Suresh Patel", rating: 4.9, reviews: 256, distance: "0.8 km", priceOffered: 550 },
  { id: "4", name: "Vikram Yadav", rating: 4.6, reviews: 78, distance: "1.5 km", priceOffered: 480 },
  { id: "5", name: "Mohan Sharma", rating: 4.7, reviews: 192, distance: "0.9 km", priceOffered: 520 },
]

export function FindingHelpers({ taskTitle, originalPrice, onAcceptWorker, onViewProfile }: FindingHelpersProps) {
  const [isSearching, setIsSearching] = useState(true)
  const [workers, setWorkers] = useState<Worker[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false)
      setWorkers(mockWorkers)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="relative">
          <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
              <Spinner className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
        </div>
        <h2 className="text-xl font-bold text-foreground mt-8">Finding helpers near you</h2>
        <p className="text-muted-foreground text-center mt-2">
          Notifying workers in your area...
        </p>
        <div className="mt-6 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 space-y-4 pb-24">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-foreground">Helpers Available</h2>
        <p className="text-sm text-muted-foreground">
          {workers.length} workers responded to your task
        </p>
      </div>

      <Card className="p-4 rounded-xl bg-muted/50 mb-4">
        <p className="text-sm text-muted-foreground">Task: <span className="font-medium text-foreground">{taskTitle}</span></p>
        <p className="text-sm text-muted-foreground">Your budget: <span className="font-medium text-primary">₹{originalPrice}</span></p>
      </Card>

      <div className="space-y-4">
        {workers.map((worker) => (
          <Card key={worker.id} className="p-4 rounded-xl">
            <div className="flex items-start gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={worker.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {worker.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{worker.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{worker.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({worker.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">₹{worker.priceOffered}</p>
                    {worker.priceOffered !== originalPrice && (
                      <span className="text-xs text-muted-foreground">
                        {worker.priceOffered < originalPrice ? "Lower" : "Higher"} offer
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{worker.distance} away</span>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button 
                    onClick={() => onAcceptWorker(worker)}
                    className="flex-1 rounded-xl"
                  >
                    Accept
                  </Button>
                  <Button 
                    onClick={() => onViewProfile(worker)}
                    variant="outline"
                    className="flex-1 rounded-xl"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground pt-2">
        Showing top 5 helpers nearby
      </p>
    </div>
  )
}
