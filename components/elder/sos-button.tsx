"use client"

import { useState } from "react"
import { Phone, ShieldAlert, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { SOS_HISTORY, CAREGIVERS, type SOSEvent } from "@/lib/mock-data"

export function SOSButton() {
  const [sosTriggered, setSosTriggered] = useState(false)
  const [history, setHistory] = useState<SOSEvent[]>(SOS_HISTORY)

  function triggerSOS() {
    const event: SOSEvent = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      contactNotified: CAREGIVERS[1].name + " (" + CAREGIVERS[1].role + ")",
      status: "Active",
    }
    setHistory((prev) => [event, ...prev])
    setSosTriggered(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Emergency Help
        </h2>
        <p className="text-muted-foreground mt-1">
          Tap the button below in case of an emergency
        </p>
      </div>

      {!sosTriggered ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="w-full border-4 border-destructive bg-destructive p-8 text-center transition-transform active:scale-95 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-destructive/40"
              aria-label="SOS Emergency Button"
            >
              <div className="flex flex-col items-center gap-4">
                <ShieldAlert className="h-20 w-20 text-destructive-foreground" />
                <span className="text-3xl font-bold text-destructive-foreground tracking-wide">
                  SOS EMERGENCY
                </span>
                <span className="text-destructive-foreground/80 text-lg">
                  Tap to alert your emergency contacts
                </span>
              </div>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl text-destructive">
                Confirm SOS Alert
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                This will immediately notify{" "}
                <strong>{CAREGIVERS[1].name}</strong> and{" "}
                <strong>{CAREGIVERS[0].name}</strong> via SMS and email.
                A phone call will also be attempted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
              <AlertDialogCancel className="h-12 text-base">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-12 text-base bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={triggerSOS}
              >
                Yes, Send SOS Now
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Card className="border-2 border-success/30 bg-success/5">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <CheckCircle2 className="h-16 w-16 text-success" />
              <p className="text-xl font-bold text-foreground">
                Help is on the way!
              </p>
              <p className="text-muted-foreground text-base">
                {CAREGIVERS[1].name} and {CAREGIVERS[0].name} have been
                notified. Stay calm.
              </p>
              <div className="flex gap-3 mt-2">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-base"
                  onClick={() =>
                    (window.location.href = `tel:${CAREGIVERS[1].phone.replace(/\s/g, "")}`)
                  }
                >
                  <Phone className="h-5 w-5" />
                  Call {CAREGIVERS[1].name.split(" ")[0]}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base"
                  onClick={() => setSosTriggered(false)}
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">
          SOS History
        </h3>
        <div className="flex flex-col gap-2">
          {history.map((event) => (
            <Card key={event.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 flex items-center justify-center ${
                      event.status === "Active"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {event.contactNotified}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {event.date} at {event.time}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 ${
                    event.status === "Active"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-success/10 text-success"
                  }`}
                >
                  {event.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
