"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppHeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  showAvatar?: boolean
}

export function AppHeader({ title = "InstaTask", showBack = false, onBack, showAvatar = true }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          {showBack ? (
            <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">IT</span>
              </div>
              <span className="font-semibold text-lg text-foreground">{title}</span>
            </div>
          )}
          {showBack && <span className="font-semibold text-lg text-foreground">{title}</span>}
        </div>
        {showAvatar && (
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback className="bg-muted text-muted-foreground">U</AvatarFallback>
          </Avatar>
        )}
      </div>
    </header>
  )
}
