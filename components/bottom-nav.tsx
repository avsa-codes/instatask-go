"use client"

import { Home, History, User, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userType: "customer" | "worker"
}

export function BottomNav({ activeTab, onTabChange, userType }: BottomNavProps) {
  const customerTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "history", label: "History", icon: History },
    { id: "profile", label: "Profile", icon: User },
  ]

  const workerTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "earnings", label: "Earnings", icon: DollarSign },
    { id: "profile", label: "Profile", icon: User },
  ]

  const tabs = userType === "customer" ? customerTabs : workerTabs

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border safe-area-pb">
      <div className="flex items-center justify-around max-w-lg mx-auto h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
