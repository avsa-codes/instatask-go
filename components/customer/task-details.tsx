"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Mic, Play, Square, Pause } from "lucide-react"

interface TaskDetailsProps {
  onContinue: (data: { 
    price: number
    duration: string
    urgency: string
    allowCounterOffer: boolean
    audioRecording?: string 
  }) => void
  onBack: () => void
}

const suggestedPrices = [300, 500, 1000, 1500, 2000, 3000]
const durations = ["1 hr", "2 hrs", "3 hrs", "4 hrs", "Half day"]
const urgencyLevels = [
  { value: "high", label: "High", color: "bg-destructive text-white" },
  { value: "medium", label: "Medium", color: "bg-secondary text-secondary-foreground" },
  { value: "normal", label: "Normal", color: "bg-muted text-foreground" },
]

export function TaskDetails({ onContinue, onBack }: TaskDetailsProps) {
  const [price, setPrice] = useState<number | "">("")
  const [duration, setDuration] = useState("2 hrs")
  const [urgency, setUrgency] = useState("normal")
  const [allowCounterOffer, setAllowCounterOffer] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePriceChange = (value: string) => {
    const numValue = parseInt(value.replace(/[^\d]/g, ''))
    setPrice(isNaN(numValue) ? "" : numValue)
  }

  const handleRecordToggle = () => {
    if (isRecording) {
      setIsRecording(false)
      setHasRecording(true)
    } else {
      setIsRecording(true)
    }
  }

  return (
    <div className="px-4 py-6 space-y-6 pb-32">
      {/* Audio Recording - Optional */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Voice note <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <div className="p-4 rounded-xl bg-muted">
          {hasRecording ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-12 w-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-primary rounded-full transition-all"></div>
                </div>
                <span className="text-xs text-muted-foreground mt-1 block">0:12</span>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => {
                  setHasRecording(false)
                  setIsPlaying(false)
                }}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Delete
              </Button>
            </div>
          ) : (
            <button
              onClick={handleRecordToggle}
              className="flex items-center gap-3 w-full"
            >
              <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                isRecording ? 'bg-destructive animate-pulse' : 'bg-primary/10'
              }`}>
                {isRecording ? (
                  <Square className="h-5 w-5 text-white" />
                ) : (
                  <Mic className="h-5 w-5 text-primary" />
                )}
              </div>
              <span className={`font-medium ${isRecording ? 'text-destructive' : 'text-muted-foreground'}`}>
                {isRecording ? 'Recording... Tap to stop' : 'Tap to record'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Budget</label>
        <Input
          type="text"
          placeholder="Enter amount"
          value={price ? `₹${price}` : ""}
          onChange={(e) => handlePriceChange(e.target.value)}
          className="h-14 text-lg rounded-xl"
        />
        <div className="flex flex-wrap gap-2">
          {suggestedPrices.map((p) => (
            <button
              key={p}
              onClick={() => setPrice(p)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                price === p 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              ₹{p}
            </button>
          ))}
        </div>
      </div>

      {/* Allow Counter Offer Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
        <div>
          <p className="font-medium text-foreground">Allow counter offers</p>
          <p className="text-sm text-muted-foreground">Let helpers propose a different price</p>
        </div>
        <Switch 
          checked={allowCounterOffer} 
          onCheckedChange={setAllowCounterOffer}
          className="data-[state=checked]:bg-primary"
        />
      </div>

      {/* Duration */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Estimated Duration</label>
        <div className="flex flex-wrap gap-2">
          {durations.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                duration === d 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Urgency */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Urgency</label>
        <div className="grid grid-cols-3 gap-2">
          {urgencyLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => setUrgency(level.value)}
              className={`py-3 rounded-xl text-sm font-medium transition-all ${
                urgency === level.value 
                  ? `${level.color} ring-2 ring-offset-2 ring-primary`
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-20 left-0 right-0 px-4 max-w-lg mx-auto">
        <Button 
          onClick={() => onContinue({ 
            price: price || 0, 
            duration, 
            urgency, 
            allowCounterOffer 
          })}
          disabled={!price}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
