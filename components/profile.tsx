"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Phone, Edit2, LogOut, ChevronRight, Bell, Shield, HelpCircle } from "lucide-react"

interface ProfileProps {
  user: {
    name: string
    phone: string
    avatar?: string
    rating?: number
    reviewCount?: number
  }
  userType: "customer" | "worker"
  onEditProfile: () => void
  onLogout: () => void
}

export function Profile({ user, userType, onEditProfile, onLogout }: ProfileProps) {
  const menuItems = [
    { icon: Bell, label: "Notifications", action: () => {} },
    { icon: Shield, label: "Privacy & Security", action: () => {} },
    { icon: HelpCircle, label: "Help & Support", action: () => {} },
  ]

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      {/* Profile Card */}
      <Card className="p-6 rounded-2xl">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span className="text-sm">{user.phone}</span>
          </div>
          {userType === "worker" && user.rating && (
            <div className="flex items-center gap-2 mt-3">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="font-semibold text-foreground">{user.rating}</span>
              <span className="text-sm text-muted-foreground">({user.reviewCount} reviews)</span>
            </div>
          )}
          <Button 
            onClick={onEditProfile}
            variant="outline"
            className="mt-4 rounded-xl"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-muted transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          )
        })}
      </div>

      {/* Logout */}
      <Button 
        onClick={onLogout}
        variant="outline"
        className="w-full h-14 rounded-xl text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>

      {/* App Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>InstaTask v1.0.0</p>
        <p className="mt-1">Made with care in India</p>
      </div>
    </div>
  )
}
