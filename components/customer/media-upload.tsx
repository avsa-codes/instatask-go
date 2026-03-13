"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Video, X, Upload, RefreshCw } from "lucide-react"

interface MediaUploadProps {
  onContinue: (media: string[]) => void
  onSkip: () => void
  onBack: () => void
}

export function MediaUpload({ onContinue, onSkip, onBack }: MediaUploadProps) {
  const [media, setMedia] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"photo" | "video">("photo")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newMedia = Array.from(files).map(file => URL.createObjectURL(file))
      setMedia(prev => [...prev, ...newMedia])
    }
  }

  const removeMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">Show us the task</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Photos or videos help workers understand your task better
        </p>
      </div>

      {/* Tab Selection */}
      <div className="flex rounded-xl bg-muted p-1">
        <button
          onClick={() => setActiveTab("photo")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "photo" 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground"
          }`}
        >
          <Camera className="h-4 w-4" />
          Photo
        </button>
        <button
          onClick={() => setActiveTab("video")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "video" 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground"
          }`}
        >
          <Video className="h-4 w-4" />
          Video
        </button>
      </div>

      {/* Upload Area */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:border-primary transition-colors"
      >
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <p className="text-foreground font-medium">Tap to upload {activeTab}</p>
        <p className="text-sm text-muted-foreground">or drag and drop</p>
        <input
          ref={fileInputRef}
          type="file"
          accept={activeTab === "photo" ? "image/*" : "video/*"}
          multiple={activeTab === "photo"}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Preview Grid */}
      {media.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Uploaded Media</h3>
          <div className="grid grid-cols-3 gap-3">
            {media.map((src, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeMedia(index)}
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-foreground/80 text-background flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="fixed bottom-20 left-0 right-0 px-4 max-w-lg mx-auto space-y-3">
        {media.length > 0 ? (
          <>
            <Button 
              onClick={() => onContinue(media)}
              size="lg"
              className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25"
            >
              Continue
            </Button>
            <Button 
              onClick={() => setMedia([])}
              variant="outline"
              size="lg"
              className="w-full h-14 text-lg font-semibold rounded-xl"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retake
            </Button>
          </>
        ) : (
          <Button 
            onClick={onSkip}
            variant="ghost"
            size="lg"
            className="w-full h-14 text-lg font-semibold rounded-xl"
          >
            Skip for now
          </Button>
        )}
      </div>
    </div>
  )
}
