"use client"

import { Card } from "@/components/ui/card"
import { StatsCard } from "@/components/stats-card"
import { DollarSign, CheckCircle2, Clock } from "lucide-react"

interface EarningEntry {
  id: string
  task: string
  date: string
  amount: number
}

interface WorkerEarningsProps {
  totalEarnings: number
  completedJobs: number
  pendingPayouts: number
}

const mockEarnings: EarningEntry[] = [
  { id: "1", task: "Move boxes", date: "Today", amount: 500 },
  { id: "2", task: "Fix tap", date: "Yesterday", amount: 350 },
  { id: "3", task: "Assemble furniture", date: "Mar 10", amount: 800 },
  { id: "4", task: "Install curtain rods", date: "Mar 9", amount: 250 },
  { id: "5", task: "Help with shifting", date: "Mar 8", amount: 1200 },
]

export function WorkerEarnings({ totalEarnings, completedJobs, pendingPayouts }: WorkerEarningsProps) {
  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4">
        <StatsCard 
          label="Total Earnings" 
          value={`₹${totalEarnings.toLocaleString()}`}
          icon={DollarSign}
          variant="primary"
        />
        <div className="grid grid-cols-2 gap-4">
          <StatsCard 
            label="Jobs Completed" 
            value={completedJobs}
            icon={CheckCircle2}
          />
          <StatsCard 
            label="Pending Payout" 
            value={`₹${pendingPayouts}`}
            icon={Clock}
          />
        </div>
      </div>

      {/* Earnings History */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Earnings History</h2>
        
        <div className="space-y-3">
          {mockEarnings.map((entry) => (
            <Card key={entry.id} className="p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{entry.task}</h3>
                  <p className="text-sm text-muted-foreground">{entry.date}</p>
                </div>
                <span className="text-lg font-bold text-primary">+₹{entry.amount}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
