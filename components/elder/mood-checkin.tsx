"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOOD_HISTORY, MOOD_LABELS, MOOD_COLORS, type MoodEntry } from "@/lib/mock-data"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"

const MOOD_FACES = [
  { value: 1, face: ":(", label: "Very Sad" },
  { value: 2, face: ":/", label: "Sad" },
  { value: 3, face: ":|", label: "Okay" },
  { value: 4, face: ":)", label: "Happy" },
  { value: 5, face: ":D", label: "Great" },
]

export function MoodCheckin() {
  const [history, setHistory] = useState<MoodEntry[]>(MOOD_HISTORY)
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [todayRecorded, setTodayRecorded] = useState(false)

  function saveMood() {
    if (!selectedMood) return
    const today = new Date().toISOString().split("T")[0]
    const entry: MoodEntry = {
      date: today,
      mood: selectedMood,
      label: MOOD_LABELS[selectedMood],
    }
    setHistory((prev) => {
      const filtered = prev.filter((e) => e.date !== today)
      return [...filtered, entry]
    })
    setTodayRecorded(true)
  }

  const chartData = history.slice(-7).map((entry) => ({
    day: new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" }),
    mood: entry.mood,
    label: entry.label,
    color: MOOD_COLORS[entry.mood],
  }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          How Are You Feeling?
        </h2>
        <p className="text-muted-foreground mt-1">
          Tap your mood below to check in for today
        </p>
      </div>

      {!todayRecorded ? (
        <Card className="border-2 border-primary/20 bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between gap-2 mb-6">
              {MOOD_FACES.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setSelectedMood(item.value)}
                  className={`flex flex-col items-center gap-2 p-3 transition-all flex-1 ${
                    selectedMood === item.value
                      ? "bg-primary text-primary-foreground scale-105 shadow-lg"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  aria-label={item.label}
                >
                  <span className="text-3xl font-bold">{item.face}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold"
              disabled={!selectedMood}
              onClick={saveMood}
            >
              Save My Mood
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-success/30 bg-success/5">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 bg-success flex items-center justify-center text-success-foreground text-3xl font-bold">
                {MOOD_FACES.find((f) => f.value === selectedMood)?.face}
              </div>
              <p className="text-xl font-semibold text-foreground">
                {"You're feeling "}
                <span style={{ color: MOOD_COLORS[selectedMood || 3] }}>
                  {MOOD_LABELS[selectedMood || 3]}
                </span>
                {" today"}
              </p>
              <p className="text-muted-foreground">
                Your mood has been recorded. Take care!
              </p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  setTodayRecorded(false)
                  setSelectedMood(null)
                }}
              >
                Change My Mood
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Your Week at a Glance
        </h3>
        <Card>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} barSize={32}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "hsl(270, 10%, 46%)", fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 5]}
                  tick={{ fill: "hsl(270, 10%, 46%)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(val) => MOOD_LABELS[val] || ""}
                  width={60}
                />
                <Bar dataKey="mood" radius={[0, 0, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
