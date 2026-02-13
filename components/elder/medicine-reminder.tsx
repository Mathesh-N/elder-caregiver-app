"use client"

import { useState } from "react"
import { Pill, Check, Plus, Clock, X, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { INITIAL_MEDICINES, type Medicine } from "@/lib/mock-data"

export function MedicineReminder() {
  const [medicines, setMedicines] = useState<Medicine[]>(INITIAL_MEDICINES)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newMed, setNewMed] = useState({ name: "", dosage: "", time: "08:00" })

  function markTaken(id: string) {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m))
    )
  }

  function addMedicine() {
    if (!newMed.name.trim() || !newMed.dosage.trim()) return
    const med: Medicine = {
      id: Date.now().toString(),
      name: newMed.name,
      dosage: newMed.dosage,
      time: newMed.time,
      taken: false,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    }
    setMedicines((prev) => [...prev, med])
    setNewMed({ name: "", dosage: "", time: "08:00" })
    setDialogOpen(false)
  }

  function removeMedicine(id: string) {
    setMedicines((prev) => prev.filter((m) => m.id !== id))
  }

  const pending = medicines.filter((m) => !m.taken)
  const completed = medicines.filter((m) => m.taken)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Medicines</h2>
          <p className="text-muted-foreground mt-1">
            {pending.length} pending today
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2 text-base">
              <Plus className="h-5 w-5" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Add New Medicine</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-5 pt-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="med-name" className="text-base font-medium">
                  Medicine Name
                </Label>
                <Input
                  id="med-name"
                  placeholder="e.g. Metformin"
                  className="h-12 text-base"
                  value={newMed.name}
                  onChange={(e) =>
                    setNewMed((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="med-dosage" className="text-base font-medium">
                  Dosage
                </Label>
                <Input
                  id="med-dosage"
                  placeholder="e.g. 500mg"
                  className="h-12 text-base"
                  value={newMed.dosage}
                  onChange={(e) =>
                    setNewMed((p) => ({ ...p, dosage: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="med-time" className="text-base font-medium">
                  Scheduled Time
                </Label>
                <Input
                  id="med-time"
                  type="time"
                  className="h-12 text-base"
                  value={newMed.time}
                  onChange={(e) =>
                    setNewMed((p) => ({ ...p, time: e.target.value }))
                  }
                />
              </div>
              <Button
                size="lg"
                className="w-full h-12 text-base font-semibold mt-2"
                onClick={addMedicine}
              >
                Add Medicine
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {pending.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-foreground">
            Pending
          </h3>
          {pending.map((med) => (
            <MedicineCard
              key={med.id}
              medicine={med}
              onToggle={() => markTaken(med.id)}
              onRemove={() => removeMedicine(med.id)}
            />
          ))}
        </div>
      )}

      {completed.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-muted-foreground">
            Taken
          </h3>
          {completed.map((med) => (
            <MedicineCard
              key={med.id}
              medicine={med}
              onToggle={() => markTaken(med.id)}
              onRemove={() => removeMedicine(med.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function MedicineCard({
  medicine,
  onToggle,
  onRemove,
}: {
  medicine: Medicine
  onToggle: () => void
  onRemove: () => void
}) {
  return (
    <Card
      className={`transition-all ${
        medicine.taken
          ? "border-success/30 bg-success/5"
          : "border-border bg-card"
      }`}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center ${
            medicine.taken
              ? "bg-success text-success-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          {medicine.taken ? (
            <Check className="h-6 w-6" />
          ) : (
            <Pill className="h-6 w-6" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold text-lg ${
              medicine.taken
                ? "text-muted-foreground line-through"
                : "text-foreground"
            }`}
          >
            {medicine.name}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-muted-foreground text-sm">
              {medicine.dosage}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground text-sm">
              <Clock className="h-3.5 w-3.5" />
              {medicine.time}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={medicine.taken ? "outline" : "default"}
            size="lg"
            className={`h-11 px-4 text-base font-semibold ${
              medicine.taken
                ? "border-success text-success hover:bg-success/10"
                : ""
            }`}
            onClick={onToggle}
          >
            {medicine.taken ? "Undo" : "Taken"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="h-5 w-5" />
            <span className="sr-only">Remove medicine</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
