"use client"

import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/stats-card"
import { ClipboardList, CheckCircle2, Plus, MapPin } from "lucide-react"
import { Empty } from "@/components/ui/empty"

interface CustomerHomeProps {
  onPostTask: () => void
  activeTasks: number
  completedTasks: number
}

export function CustomerHome({ onPostTask, activeTasks, completedTasks }: CustomerHomeProps) {
  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground">What do you need help with today?</p>
      </div>

      {/* Primary CTA */}
      <Button 
        onClick={onPostTask} 
        size="lg" 
        className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25"
      >
        <Plus className="h-5 w-5 mr-2" />
        Post a New Task
      </Button>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard 
          label="Active Tasks" 
          value={activeTasks} 
          icon={ClipboardList}
        />
        <StatsCard 
          label="Completed" 
          value={completedTasks} 
          icon={CheckCircle2}
        />
      </div>

      {/* Active Tasks or Empty State */}
      {activeTasks === 0 ? (
        <div className="pt-8">
          <Empty 
            title="No Active Tasks"
            description="Post your first task and find nearby helpers"
          />
          <div className="flex justify-center mt-6">
            <Button onClick={onPostTask} variant="outline" className="rounded-xl">
              Post Task Now
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-foreground">Your Active Tasks</h2>
          {/* Active task card */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">Move boxes</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  Downtown - 2 km away
                </p>
              </div>
              <span className="text-lg font-bold text-primary">₹500</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/20 text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                Finding helpers
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
