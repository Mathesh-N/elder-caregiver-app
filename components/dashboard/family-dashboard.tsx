"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bell,
  ShieldAlert,
  Pill,
  Heart,
  Info,
  TrendingUp,
  Calendar,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  FAMILY_ALERTS,
  ADHERENCE_DATA,
  MONTHLY_ADHERENCE,
  MOOD_HISTORY,
  SOS_HISTORY,
  MOOD_LABELS,
  MOOD_COLORS,
  type Alert,
} from "@/lib/mock-data"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
} from "recharts"

function AlertIcon({ type }: { type: Alert["type"] }) {
  switch (type) {
    case "sos":
      return <ShieldAlert className="h-5 w-5 text-destructive" />
    case "missed":
      return <Pill className="h-5 w-5 text-warning" />
    case "mood":
      return <Heart className="h-5 w-5 text-accent" />
    case "info":
      return <Info className="h-5 w-5 text-primary" />
  }
}

function AlertBadge({ type }: { type: Alert["type"] }) {
  const styles: Record<Alert["type"], string> = {
    sos: "bg-destructive/10 text-destructive border-destructive/20",
    missed: "bg-warning/10 text-warning-foreground border-warning/20",
    mood: "bg-accent/10 text-accent border-accent/20",
    info: "bg-primary/10 text-primary border-primary/20",
  }
  const labels: Record<Alert["type"], string> = {
    sos: "SOS",
    missed: "Missed",
    mood: "Mood",
    info: "Info",
  }
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 border ${styles[type]}`}>
      {labels[type]}
    </span>
  )
}

export function FamilyDashboard({
  onSwitchToElder,
  username,
  onLogout,
}: {
  onSwitchToElder: () => void
  username: string
  onLogout: () => void
}) {
  const [alerts, setAlerts] = useState<Alert[]>(FAMILY_ALERTS)
  const unreadCount = alerts.filter((a) => !a.read).length

  function markAllRead() {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })))
  }

  const weeklyAdherence = ADHERENCE_DATA.map((d) => ({
    ...d,
    rate: Math.round((d.taken / d.total) * 100),
  }))

  const overallRate = Math.round(
    (ADHERENCE_DATA.reduce((s, d) => s + d.taken, 0) /
      ADHERENCE_DATA.reduce((s, d) => s + d.total, 0)) *
      100
  )

  const moodChartData = MOOD_HISTORY.slice(-7).map((e) => ({
    day: new Date(e.date).toLocaleDateString("en-US", { weekday: "short" }),
    mood: e.mood,
    label: e.label,
    color: MOOD_COLORS[e.mood],
  }))

  const avgMood =
    MOOD_HISTORY.reduce((s, e) => s + e.mood, 0) / MOOD_HISTORY.length

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-5 pt-6 pb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={onSwitchToElder}
                aria-label="Back to elder app"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <span className="text-sm font-medium opacity-80">
                CareCompanion
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="h-5 w-5 text-primary-foreground/80" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
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
          <h1 className="text-2xl font-bold">Family Dashboard</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">
            Monitoring {username || "Elder"}{"'"}s well-being
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-3xl font-bold text-primary">{overallRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                Med Adherence
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-3xl font-bold text-success">
                {avgMood.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Avg Mood (5)
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-3xl font-bold text-destructive">
                {SOS_HISTORY.length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                SOS Events
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-11">
            <TabsTrigger value="alerts" className="text-sm">
              Alerts
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-1.5 h-5 w-5 p-0 text-[10px] justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="adherence" className="text-sm">
              Adherence
            </TabsTrigger>
            <TabsTrigger value="mood" className="text-sm">
              Mood
            </TabsTrigger>
            <TabsTrigger value="sos" className="text-sm">
              SOS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Recent Alerts</h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary text-sm"
                  onClick={markAllRead}
                >
                  Mark all read
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`transition-colors ${
                    !alert.read ? "border-primary/20 bg-primary/[0.03]" : ""
                  }`}
                >
                  <CardContent className="flex items-start gap-3 p-4">
                    <div className="mt-0.5">
                      <AlertIcon type={alert.type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertBadge type={alert.type} />
                        {!alert.read && (
                          <span className="h-2 w-2 bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.time}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="adherence" className="mt-4">
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  This Week{"'"}s Adherence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={weeklyAdherence} barSize={28}>
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "hsl(270, 10%, 46%)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "hsl(270, 10%, 46%)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `${v}%`}
                      width={45}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Adherence"]}
                      contentStyle={{
                        borderRadius: "0",
                        border: "1px solid hsl(270, 15%, 88%)",
                        fontSize: "13px",
                      }}
                    />
                    <Bar dataKey="rate" radius={[0, 0, 0, 0]}>
                      {weeklyAdherence.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            entry.rate >= 80
                              ? "hsl(145, 55%, 42%)"
                              : entry.rate >= 60
                              ? "hsl(38, 90%, 55%)"
                              : "hsl(0, 72%, 51%)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Monthly Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={MONTHLY_ADHERENCE}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(270, 15%, 90%)"
                    />
                    <XAxis
                      dataKey="week"
                      tick={{ fill: "hsl(270, 10%, 46%)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[60, 100]}
                      tick={{ fill: "hsl(270, 10%, 46%)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `${v}%`}
                      width={45}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Rate"]}
                      contentStyle={{
                        borderRadius: "0",
                        border: "1px solid hsl(270, 15%, 88%)",
                        fontSize: "13px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="hsl(276, 60%, 38%)"
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: "hsl(276, 60%, 38%)" }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Medicine-wise Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {[
                    { name: "Metformin 500mg", adherence: 100 },
                    { name: "Amlodipine 5mg", adherence: 71 },
                    { name: "Atorvastatin 10mg", adherence: 67 },
                    { name: "Vitamin D 1000 IU", adherence: 100 },
                  ].map((med) => (
                    <div key={med.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-foreground">
                          {med.name}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            med.adherence >= 80
                              ? "text-success"
                              : med.adherence >= 60
                              ? "text-warning"
                              : "text-destructive"
                          }`}
                        >
                          {med.adherence}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            med.adherence >= 80
                              ? "bg-success"
                              : med.adherence >= 60
                              ? "bg-warning"
                              : "bg-destructive"
                          }`}
                          style={{ width: `${med.adherence}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mood" className="mt-4">
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  7-Day Mood Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={moodChartData} barSize={28}>
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "hsl(270, 10%, 46%)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 5]}
                      tick={{ fill: "hsl(270, 10%, 46%)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      ticks={[1, 2, 3, 4, 5]}
                      tickFormatter={(v) => MOOD_LABELS[v] || ""}
                      width={55}
                    />
                    <Tooltip
                      formatter={(value: number) => [
                        MOOD_LABELS[value],
                        "Mood",
                      ]}
                      contentStyle={{
                        borderRadius: "0",
                        border: "1px solid hsl(270, 15%, 88%)",
                        fontSize: "13px",
                      }}
                    />
                    <Bar dataKey="mood" radius={[0, 0, 0, 0]}>
                      {moodChartData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Daily Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {MOOD_HISTORY.slice()
                    .reverse()
                    .map((entry) => (
                      <div
                        key={entry.date}
                        className="flex items-center justify-between py-2 border-b border-border last:border-0"
                      >
                        <span className="text-sm text-foreground">
                          {new Date(entry.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-semibold text-sm"
                            style={{ color: MOOD_COLORS[entry.mood] }}
                          >
                            {entry.label}
                          </span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-2 ${
                                  i < entry.mood ? "" : "bg-muted"
                                }`}
                                style={
                                  i < entry.mood
                                    ? { backgroundColor: MOOD_COLORS[entry.mood] }
                                    : {}
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sos" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">SOS Event History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 font-semibold text-muted-foreground">
                          Date
                        </th>
                        <th className="text-left py-3 pr-4 font-semibold text-muted-foreground">
                          Time
                        </th>
                        <th className="text-left py-3 pr-4 font-semibold text-muted-foreground">
                          Contact Notified
                        </th>
                        <th className="text-left py-3 font-semibold text-muted-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SOS_HISTORY.map((event) => (
                        <tr
                          key={event.id}
                          className="border-b border-border last:border-0"
                        >
                          <td className="py-3 pr-4 text-foreground">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="py-3 pr-4 text-foreground">
                            {event.time}
                          </td>
                          <td className="py-3 pr-4 text-foreground">
                            {event.contactNotified}
                          </td>
                          <td className="py-3">
                            <span
                              className={`text-xs font-semibold px-2.5 py-1 ${
                                event.status === "Active"
                                  ? "bg-destructive/10 text-destructive"
                                  : "bg-success/10 text-success"
                              }`}
                            >
                              {event.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {SOS_HISTORY.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <ShieldAlert className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No SOS events recorded.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <p className="text-center text-muted-foreground text-xs mt-8 pb-8">
          This dashboard shows sample data for demonstration purposes.
        </p>
      </main>
    </div>
  )
}
