"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { CustomerHome } from "@/components/customer/customer-home"
import { CreateTask } from "@/components/customer/create-task"
import { MediaUpload } from "@/components/customer/media-upload"
import { TaskDetails } from "@/components/customer/task-details"
import { ReviewTask } from "@/components/customer/review-task"
import { FindingHelpers } from "@/components/customer/finding-helpers"
import { ActiveTask } from "@/components/customer/active-task"
import { Payment } from "@/components/customer/payment"
import { History } from "@/components/customer/history"
import { WorkerHome } from "@/components/worker/worker-home"
import { WorkerEarnings } from "@/components/worker/worker-earnings"
import { ActiveJob } from "@/components/worker/active-job"
import { Profile } from "@/components/profile"
import { Button } from "@/components/ui/button"

type UserType = "customer" | "worker"
type CustomerScreen = "home" | "create-task" | "media-upload" | "task-details" | "review-task" | "finding-helpers" | "active-task" | "payment" | "history" | "profile"
type WorkerScreen = "home" | "active-job" | "earnings" | "profile"

interface TaskData {
  title: string
  description?: string
  category?: string
  location: string
  media: string[]
  price: number
  duration: string
  urgency: string
  allowCounterOffer: boolean
  hasAudio?: boolean
}

export default function InstaTaskApp() {
  const [userType, setUserType] = useState<UserType | null>(null)
  const [activeTab, setActiveTab] = useState("home")
  const [customerScreen, setCustomerScreen] = useState<CustomerScreen>("home")
  const [workerScreen, setWorkerScreen] = useState<WorkerScreen>("home")
  const [taskData, setTaskData] = useState<Partial<TaskData>>({})
  const [taskStatus, setTaskStatus] = useState<"accepted" | "on_the_way" | "work_started" | "completed">("on_the_way")

  // User type selection screen
  if (!userType) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="text-center mb-12">
          <div className="h-24 w-24 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/30">
            <span className="text-primary-foreground font-bold text-4xl">IT</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3 text-balance">Welcome to InstaTask</h1>
          <p className="text-muted-foreground text-lg">Find nearby helpers or earn by helping others.</p>
        </div>
        
        <div className="w-full max-w-sm space-y-4">
          <Button 
            onClick={() => setUserType("customer")}
            size="lg"
            className="w-full h-16 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25"
          >
            I need help with a task
          </Button>
          <Button 
            onClick={() => setUserType("worker")}
            size="lg"
            variant="outline"
            className="w-full h-16 text-lg font-semibold rounded-2xl border-2"
          >
            I want to help others
          </Button>
        </div>
      </div>
    )
  }

  // Handle tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (userType === "customer") {
      if (tab === "home") setCustomerScreen("home")
      else if (tab === "history") setCustomerScreen("history")
      else if (tab === "profile") setCustomerScreen("profile")
    } else {
      if (tab === "home") setWorkerScreen("home")
      else if (tab === "earnings") setWorkerScreen("earnings")
      else if (tab === "profile") setWorkerScreen("profile")
    }
  }

  // Get header props based on current screen
  const getHeaderProps = () => {
    if (userType === "customer") {
      switch (customerScreen) {
        case "create-task":
          return { title: "Create a Task", showBack: true, onBack: () => setCustomerScreen("home") }
        case "media-upload":
          return { title: "Show Us The Task", showBack: true, onBack: () => setCustomerScreen("create-task") }
        case "task-details":
          return { title: "Task Details", showBack: true, onBack: () => setCustomerScreen("media-upload") }
        case "review-task":
          return { title: "Review Task", showBack: true, onBack: () => setCustomerScreen("task-details") }
        case "finding-helpers":
          return { title: "Helpers Available", showBack: true, onBack: () => setCustomerScreen("home") }
        case "active-task":
          return { title: "Active Task", showBack: true, onBack: () => setCustomerScreen("home") }
        case "payment":
          return { title: "Payment", showBack: true, onBack: () => setCustomerScreen("active-task") }
        default:
          return {}
      }
    } else {
      switch (workerScreen) {
        case "active-job":
          return { title: "Active Job", showBack: true, onBack: () => setWorkerScreen("home") }
        default:
          return {}
      }
    }
  }

  // Render customer screens
  const renderCustomerScreen = () => {
    switch (customerScreen) {
      case "home":
        return (
          <CustomerHome 
            onPostTask={() => setCustomerScreen("create-task")}
            activeTasks={1}
            completedTasks={12}
          />
        )
      case "create-task":
        return (
          <CreateTask 
            onContinue={(data) => {
              setTaskData(prev => ({ ...prev, ...data }))
              setCustomerScreen("media-upload")
            }}
            onBack={() => setCustomerScreen("home")}
          />
        )
      case "media-upload":
        return (
          <MediaUpload 
            onContinue={(media) => {
              setTaskData(prev => ({ ...prev, media }))
              setCustomerScreen("task-details")
            }}
            onSkip={() => {
              setTaskData(prev => ({ ...prev, media: [] }))
              setCustomerScreen("task-details")
            }}
            onBack={() => setCustomerScreen("create-task")}
          />
        )
      case "task-details":
        return (
          <TaskDetails 
            onContinue={(data) => {
              setTaskData(prev => ({ ...prev, ...data }))
              setCustomerScreen("review-task")
            }}
            onBack={() => setCustomerScreen("media-upload")}
          />
        )
      case "review-task":
        return (
          <ReviewTask 
            taskData={taskData as TaskData}
            onSubmit={() => setCustomerScreen("finding-helpers")}
            onBack={() => setCustomerScreen("task-details")}
          />
        )
      case "finding-helpers":
        return (
          <FindingHelpers 
            taskTitle={taskData.title || "Task"}
            originalPrice={taskData.price || 0}
            onAcceptWorker={() => {
              setTaskStatus("on_the_way")
              setCustomerScreen("active-task")
            }}
            onViewProfile={() => {}}
          />
        )
      case "active-task":
        return (
          <ActiveTask 
            worker={{ name: "Rajesh Kumar", phone: "+91 98765 43210", rating: 4.8 }}
            task={{ title: taskData.title || "Task", location: taskData.location || "Downtown", price: taskData.price || 500 }}
            status={taskStatus}
            onOpenMaps={() => window.open("https://maps.google.com", "_blank")}
            onMessage={() => {}}
            onCall={() => {}}
            onPay={() => setCustomerScreen("payment")}
          />
        )
      case "payment":
        return (
          <Payment 
            task={{ title: taskData.title || "Task", price: taskData.price || 500 }}
            worker={{ name: "Rajesh Kumar" }}
            onPaymentComplete={() => {
              setTaskData({})
              setCustomerScreen("home")
              setActiveTab("home")
            }}
            onBack={() => setCustomerScreen("active-task")}
          />
        )
      case "history":
        return <History />
      case "profile":
        return (
          <Profile 
            user={{ name: "Priya Sharma", phone: "+91 98765 43210" }}
            userType="customer"
            onEditProfile={() => {}}
            onLogout={() => setUserType(null)}
          />
        )
    }
  }

  // Render worker screens
  const renderWorkerScreen = () => {
    switch (workerScreen) {
      case "home":
        return (
          <WorkerHome 
            earnings={15600}
            completedJobs={42}
            activeJobs={1}
            onAcceptTask={() => setWorkerScreen("active-job")}
            onCounterOffer={() => {}}
          />
        )
      case "active-job":
        return (
          <ActiveJob 
            customer={{ name: "Priya Sharma", phone: "+91 98765 43210" }}
            task={{ title: "Move 10 boxes", location: "Downtown Sector 15", price: 500 }}
            status={taskStatus}
            onOpenMaps={() => window.open("https://maps.google.com", "_blank")}
            onMessage={() => {}}
            onCall={() => {}}
            onMarkStarted={() => setTaskStatus("work_started")}
            onMarkCompleted={() => {
              setTaskStatus("completed")
              setWorkerScreen("home")
            }}
          />
        )
      case "earnings":
        return (
          <WorkerEarnings 
            totalEarnings={15600}
            completedJobs={42}
            pendingPayouts={2400}
          />
        )
      case "profile":
        return (
          <Profile 
            user={{ name: "Rajesh Kumar", phone: "+91 98765 43210", rating: 4.8, reviewCount: 124 }}
            userType="worker"
            onEditProfile={() => {}}
            onLogout={() => setUserType(null)}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto">
      <AppHeader {...getHeaderProps()} />
      
      <main className="pb-16">
        {userType === "customer" ? renderCustomerScreen() : renderWorkerScreen()}
      </main>
      
      <BottomNav 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userType={userType}
      />
    </div>
  )
}
