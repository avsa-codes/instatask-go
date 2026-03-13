"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface HistoryEntry {
  id: string
  title: string
  date: string
  price: number
  status: "completed" | "cancelled" | "in_progress"
  worker?: string
}

const mockHistory: HistoryEntry[] = [
  { id: "1", title: "Move boxes", date: "Today", price: 500, status: "completed", worker: "Rajesh Kumar" },
  { id: "2", title: "Fix leaking tap", date: "Yesterday", price: 350, status: "completed", worker: "Amit Singh" },
  { id: "3", title: "Assemble furniture", date: "Mar 10", price: 800, status: "in_progress", worker: "Suresh Patel" },
  { id: "4", title: "Install AC", date: "Mar 8", price: 1500, status: "cancelled" },
  { id: "5", title: "Paint room", date: "Mar 5", price: 3000, status: "completed", worker: "Vikram Sharma" },
]

export function History() {
  const statusConfig = {
    completed: { icon: CheckCircle2, label: "Completed", color: "text-primary", bg: "bg-primary/10" },
    cancelled: { icon: XCircle, label: "Cancelled", color: "text-destructive", bg: "bg-destructive/10" },
    in_progress: { icon: Clock, label: "In Progress", color: "text-secondary-foreground", bg: "bg-secondary/30" },
  }

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Task History</h1>
        <p className="text-muted-foreground">Your past and ongoing tasks</p>
      </div>

      <div className="space-y-4">
        {mockHistory.map((entry) => {
          const status = statusConfig[entry.status]
          const StatusIcon = status.icon

          return (
            <Card key={entry.id} className="p-4 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{entry.title}</h3>
                  <p className="text-sm text-muted-foreground">{entry.date}</p>
                  {entry.worker && (
                    <p className="text-sm text-muted-foreground mt-1">By {entry.worker}</p>
                  )}
                </div>
                <span className="text-lg font-bold text-foreground">₹{entry.price}</span>
              </div>
              <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium", status.bg, status.color)}>
                <StatusIcon className="h-3 w-3" />
                {status.label}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
