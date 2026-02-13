"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, LogIn, ChevronRight } from "lucide-react"
import { loginUser } from "@/lib/auth-store"

interface LoginPageProps {
  onLogin: (username: string) => void
  onGoToRegister: () => void
}

export function LoginPage({ onLogin, onGoToRegister }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isValid = email.trim().length > 0 && password.length >= 6

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setError("")
    setLoading(true)

    setTimeout(() => {
      const result = loginUser(email.trim(), password)
      if (result.ok && result.session) {
        setSuccess(true)
        setTimeout(() => {
          onLogin(result.session!.username)
        }, 800)
      } else {
        setError(result.error || "Login failed.")
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0014] relative overflow-hidden">
      {/* Background gradient layers */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, hsl(276, 60%, 25%) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, hsl(330, 65%, 30%) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 60% 80%, hsl(260, 50%, 20%) 0%, transparent 50%)",
        }}
      />

      <div
        className={`relative z-10 w-full max-w-md px-5 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-14 w-14 bg-[hsl(276,60%,38%)] mb-4">
            <span className="text-white text-2xl font-bold">C</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            CareCompanion
          </h1>
          <p className="text-[hsl(270,15%,55%)] text-sm mt-2">
            Sign in to access your caregiver dashboard
          </p>
        </div>

        {/* Glass card */}
        <div
          className="p-8 border border-white/10"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {success ? (
            <div className="text-center py-8">
              <div className="h-16 w-16 bg-[hsl(145,55%,42%)] flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-white text-lg font-semibold">Login Successful</p>
              <p className="text-[hsl(270,15%,55%)] text-sm mt-1">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-[hsl(270,15%,65%)] mb-2"
                >
                  Email or Username
                </label>
                <input
                  id="login-email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter your email or username"
                  className="w-full h-12 px-4 bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[hsl(276,60%,50%)] focus:bg-white/[0.07]"
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-[hsl(270,15%,65%)] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError("")
                    }}
                    placeholder="Enter your password"
                    className="w-full h-12 px-4 pr-12 bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[hsl(276,60%,50%)] focus:bg-white/[0.07]"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-[hsl(276,60%,38%)]"
                  />
                  <span className="text-sm text-[hsl(270,15%,55%)]">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-[hsl(276,60%,55%)] hover:text-[hsl(276,60%,65%)] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <div className="text-sm text-[hsl(0,72%,60%)] bg-[hsl(0,72%,51%)]/10 border border-[hsl(0,72%,51%)]/20 px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!isValid || loading}
                className={`h-12 w-full flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
                  isValid && !loading
                    ? "bg-[hsl(276,60%,38%)] text-white hover:bg-[hsl(276,60%,44%)] active:scale-[0.98]"
                    : "bg-white/5 text-white/30 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-[hsl(270,15%,45%)] text-sm">
            {"Don't have an account?"}
          </p>
          <button
            onClick={onGoToRegister}
            className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[hsl(276,60%,55%)] hover:text-[hsl(276,60%,65%)] transition-colors"
          >
            Create an account
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
