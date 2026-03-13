"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, CreditCard, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaymentProps {
  task: {
    title: string
    price: number
  }
  worker: {
    name: string
  }
  onPaymentComplete: () => void
  onBack: () => void
}

export function Payment({ task, worker, onPaymentComplete, onBack }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handlePay = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
        <p className="text-muted-foreground text-center mb-8">
          Thank you for using InstaTask. Your payment has been received.
        </p>
        <Button 
          onClick={onPaymentComplete}
          size="lg"
          className="w-full max-w-xs h-14 text-lg font-semibold rounded-xl"
        >
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 space-y-6 pb-32">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">Complete Payment</h2>
        <p className="text-sm text-muted-foreground">Pay {worker.name} for the task</p>
      </div>

      {/* Summary */}
      <Card className="p-4 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Task</span>
          <span className="font-medium text-foreground">{task.title}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Worker</span>
          <span className="font-medium text-foreground">{worker.name}</span>
        </div>
        <div className="border-t border-border pt-4 flex items-center justify-between">
          <span className="font-semibold text-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">₹{task.price}</span>
        </div>
      </Card>

      {/* Payment Methods */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Payment Method</h3>
        
        <button
          onClick={() => setPaymentMethod("upi")}
          className={cn(
            "w-full p-4 rounded-xl flex items-center gap-4 transition-all",
            paymentMethod === "upi" 
              ? "bg-primary/10 border-2 border-primary" 
              : "bg-muted border-2 border-transparent"
          )}
        >
          <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-medium text-foreground">UPI</p>
            <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
          </div>
          <div className={cn(
            "ml-auto h-5 w-5 rounded-full border-2",
            paymentMethod === "upi" 
              ? "border-primary bg-primary" 
              : "border-muted-foreground"
          )}>
            {paymentMethod === "upi" && (
              <CheckCircle2 className="h-full w-full text-primary-foreground" />
            )}
          </div>
        </button>

        <button
          onClick={() => setPaymentMethod("card")}
          className={cn(
            "w-full p-4 rounded-xl flex items-center gap-4 transition-all",
            paymentMethod === "card" 
              ? "bg-primary/10 border-2 border-primary" 
              : "bg-muted border-2 border-transparent"
          )}
        >
          <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-medium text-foreground">Card</p>
            <p className="text-sm text-muted-foreground">Credit or Debit Card</p>
          </div>
          <div className={cn(
            "ml-auto h-5 w-5 rounded-full border-2",
            paymentMethod === "card" 
              ? "border-primary bg-primary" 
              : "border-muted-foreground"
          )}>
            {paymentMethod === "card" && (
              <CheckCircle2 className="h-full w-full text-primary-foreground" />
            )}
          </div>
        </button>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-20 left-0 right-0 px-4 max-w-lg mx-auto">
        <Button 
          onClick={handlePay}
          disabled={isProcessing}
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25"
        >
          {isProcessing ? "Processing..." : `Pay ₹${task.price}`}
        </Button>
      </div>
    </div>
  )
}
