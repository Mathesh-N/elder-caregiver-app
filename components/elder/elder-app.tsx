"use client"

import { useState } from "react"
import {
  Pill,
  Heart,
  ShieldAlert,
  Users,
  ArrowLeft,
  LayoutDashboard,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MedicineReminder } from "./medicine-reminder"
import { MoodCheckin } from "./mood-checkin"
import { SOSButton } from "./sos-button"
import { CaregiverList } from "./caregiver-list"

type Screen = "home" | "medicine" | "mood" | "sos" | "caregivers"

const NAV_ITEMS = [
  {
    id: "medicine" as Screen,
    label: "Medicines",
    icon: Pill,
    color: "bg-primary text-primary-foreground",
    description: "View and manage your daily medicines",
  },
  {
    id: "mood" as Screen,
    label: "Daily Mood",
    icon: Heart,
    color: "bg-accent text-accent-foreground",
    description: "How are you feeling today?",
  },
  {
    id: "sos" as Screen,
    label: "SOS Help",
    icon: ShieldAlert,
    color: "bg-destructive text-destructive-foreground",
    description: "Get emergency help immediately",
  },
  {
    id: "caregivers" as Screen,
    label: "Caregivers",
    icon: Users,
    color: "bg-success text-success-foreground",
    description: "Contact your care team",
  },
]

export function ElderApp({
  onSwitchToDashboard,
  username,
  onLogout,
}: {
  onSwitchToDashboard: () => void
  username: string
  onLogout: () => void
}) {
  const [screen, setScreen] = useState<Screen>("home")

  if (screen !== "home") {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-card border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11"
              onClick={() => setScreen("home")}
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">
              {NAV_ITEMS.find((n) => n.id === screen)?.label}
            </h1>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-4 py-6">
          {screen === "medicine" && <MedicineReminder />}
          {screen === "mood" && <MoodCheckin />}
          {screen === "sos" && <SOSButton />}
          {screen === "caregivers" && <CaregiverList />}
        </main>
      </div>
    )
  }

  const today = new Date()
  const greeting = today.getHours() < 12 ? "Good Morning" : today.getHours() < 17 ? "Good Afternoon" : "Good Evening"

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-lg mx-auto px-5 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium opacity-80">
              CareCompanion
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-1.5 text-sm"
                onClick={onSwitchToDashboard}
              >
                <LayoutDashboard className="h-4 w-4" />
                Family View
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={onLogout}
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <h1 className="text-3xl font-bold">{greeting},</h1>
          <p className="text-xl text-primary-foreground/80 mt-1">
            {username || "there"}
          </p>
          <p className="text-sm text-primary-foreground/60 mt-3">
            {today.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                className="flex flex-col items-center gap-3 bg-card border border-border p-6 text-center transition-all hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label={item.label}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center ${item.color}`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-semibold text-lg text-foreground">
                    {item.label}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-6 bg-primary/5 border border-primary/15 p-5">
          <h3 className="font-semibold text-foreground mb-2">Quick Status</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Medicines today</span>
              <span className="font-semibold text-foreground">2 of 4 taken</span>
            </div>
            <div className="h-2 bg-muted overflow-hidden">
              <div className="h-full w-1/2 bg-primary transition-all" />
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Today{"'"}s mood</span>
              <span className="font-semibold text-primary">Not recorded yet</span>
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-8 pb-8">
          Need help? Tap <strong>SOS Help</strong> above or call your caregiver.
        </p>
      </main>
    </div>
  )
}
