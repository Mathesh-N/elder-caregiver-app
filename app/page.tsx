"use client"

import { useState, useEffect } from "react"
import { ElderApp } from "@/components/elder/elder-app"
import { FamilyDashboard } from "@/components/dashboard/family-dashboard"
import { LoginPage } from "@/components/auth/login-page"
import { RegisterPage } from "@/components/auth/register-page"
import { getSession, logout } from "@/lib/auth-store"

type View = "login" | "register" | "elder" | "dashboard"

export default function Page() {
  const [view, setView] = useState<View>("login")
  const [username, setUsername] = useState("")

  useEffect(() => {
    const session = getSession()
    if (session) {
      setUsername(session.username)
      setView("elder")
    }
  }, [])

  function handleLogin(name: string) {
    setUsername(name)
    setView("elder")
  }

  function handleLogout() {
    logout()
    setUsername("")
    setView("login")
  }

  if (view === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoToRegister={() => setView("register")}
      />
    )
  }

  if (view === "register") {
    return (
      <RegisterPage
        onRegistered={() => setView("login")}
        onGoToLogin={() => setView("login")}
      />
    )
  }

  if (view === "dashboard") {
    return (
      <FamilyDashboard
        onSwitchToElder={() => setView("elder")}
        username={username}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <ElderApp
      onSwitchToDashboard={() => setView("dashboard")}
      username={username}
      onLogout={handleLogout}
    />
  )
}
