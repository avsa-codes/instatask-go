"use client"

import { useState } from "react"
import { StatsCard } from "@/components/stats-card"
import { TaskCard } from "@/components/task-card"
import { DollarSign, CheckCircle2, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Task {
  id: string
  title: string
  description?: string
  location: string
  distance: string
  price: number
  urgency: "high" | "medium" | "normal"
}

interface WorkerHomeProps {
  earnings: number
  completedJobs: number
  activeJobs: number
  onAcceptTask: (taskId: string) => void
  onCounterOffer: (taskId: string, price: number) => void
}

const mockTasks: Task[] = [
  { id: "1", title: "Move 10 boxes", description: "Need help moving boxes to new apartment", location: "Downtown", distance: "0.5 km", price: 500, urgency: "high" },
  { id: "2", title: "Fix leaking tap", description: "Kitchen sink tap is leaking", location: "Sector 15", distance: "1.2 km", price: 350, urgency: "medium" },
  { id: "3", title: "Assemble furniture", description: "IKEA wardrobe needs assembly", location: "Green Park", distance: "2.0 km", price: 800, urgency: "normal" },
]

export function WorkerHome({ earnings, completedJobs, activeJobs, onAcceptTask, onCounterOffer }: WorkerHomeProps) {
  const [counterOfferDialog, setCounterOfferDialog] = useState<{ open: boolean; taskId: string | null }>({ open: false, taskId: null })
  const [counterPrice, setCounterPrice] = useState("")

  const handleCounterSubmit = () => {
    if (counterOfferDialog.taskId && counterPrice) {
      onCounterOffer(counterOfferDialog.taskId, parseInt(counterPrice))
      setCounterOfferDialog({ open: false, taskId: null })
      setCounterPrice("")
    }
  }

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatsCard 
          label="Earned" 
          value={`₹${earnings}`}
          icon={DollarSign}
          variant="primary"
        />
        <StatsCard 
          label="Completed" 
          value={completedJobs}
          icon={CheckCircle2}
        />
        <StatsCard 
          label="Active" 
          value={activeJobs}
          icon={Clock}
        />
      </div>

      {/* Available Tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Available Tasks</h2>
          <span className="text-sm text-muted-foreground">{mockTasks.length} nearby</span>
        </div>

        <div className="space-y-4">
          {mockTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              location={task.location}
              distance={task.distance}
              price={task.price}
              urgency={task.urgency}
              onAccept={() => onAcceptTask(task.id)}
              onCounterOffer={() => setCounterOfferDialog({ open: true, taskId: task.id })}
            />
          ))}
        </div>
      </div>

      {/* Counter Offer Dialog */}
      <Dialog open={counterOfferDialog.open} onOpenChange={(open) => setCounterOfferDialog({ ...counterOfferDialog, open })}>
        <DialogContent className="max-w-sm mx-4 rounded-2xl">
          <DialogHeader>
            <DialogTitle>Make a Counter Offer</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium text-foreground mb-2 block">Your Price</label>
            <Input
              type="text"
              placeholder="Enter amount"
              value={counterPrice ? `₹${counterPrice}` : ""}
              onChange={(e) => setCounterPrice(e.target.value.replace(/[^\d]/g, ''))}
              className="h-14 text-lg rounded-xl"
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setCounterOfferDialog({ open: false, taskId: null })}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCounterSubmit}
              disabled={!counterPrice}
              className="rounded-xl"
            >
              Submit Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
