import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  label: string
  value: string | number
  icon?: LucideIcon
  variant?: "default" | "primary"
}

export function StatsCard({ label, value, icon: Icon, variant = "default" }: StatsCardProps) {
  return (
    <Card className={cn(
      "p-4 rounded-xl",
      variant === "primary" 
        ? "bg-primary text-primary-foreground" 
        : "bg-card border border-border"
    )}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center",
            variant === "primary" 
              ? "bg-primary-foreground/20" 
              : "bg-muted"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              variant === "primary" ? "text-primary-foreground" : "text-primary"
            )} />
          </div>
        )}
        <div>
          <p className={cn(
            "text-sm",
            variant === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  )
}
