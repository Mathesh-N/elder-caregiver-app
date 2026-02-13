"use client"

import { useState, useEffect, useMemo } from "react"
import { Eye, EyeOff, UserPlus, ChevronLeft } from "lucide-react"
import { registerUser } from "@/lib/auth-store"

interface RegisterPageProps {
  onRegistered: () => void
  onGoToLogin: () => void
}

function getStrength(pw: string) {
  let score = 0
  if (pw.length >= 6) score++
  if (pw.length >= 10) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"]
const STRENGTH_COLORS = [
  "bg-white/10",
  "bg-[hsl(0,72%,51%)]",
  "bg-[hsl(38,90%,55%)]",
  "bg-[hsl(38,90%,55%)]",
  "bg-[hsl(145,55%,42%)]",
  "bg-[hsl(145,55%,42%)]",
]

export function RegisterPage({ onRegistered, onGoToLogin }: RegisterPageProps) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const strength = useMemo(() => getStrength(password), [password])

  const checks = useMemo(
    () => ({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
    }),
    [password]
  )

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValid =
    username.trim().length >= 2 &&
    emailValid &&
    password.length >= 6 &&
    passwordsMatch &&
    acceptTerms

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setError("")
    setLoading(true)

    setTimeout(() => {
      const result = registerUser({
        username: username.trim(),
        email: email.trim(),
        password,
      })
      if (result.ok) {
        setSuccess(true)
        setTimeout(() => {
          onRegistered()
        }, 1500)
      } else {
        setError(result.error || "Registration failed.")
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0014] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, hsl(276, 60%, 25%) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, hsl(330, 65%, 30%) 0%, transparent 50%)",
        }}
      />

      <div
        className={`relative z-10 w-full max-w-md px-5 py-8 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Back button */}
        <button
          onClick={onGoToLogin}
          className="flex items-center gap-1 text-sm text-[hsl(270,15%,55%)] hover:text-white/70 transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to sign in
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h1>
          <p className="text-[hsl(270,15%,55%)] text-sm mt-2">
            Register to start using CareCompanion
          </p>
        </div>

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
              <p className="text-white text-lg font-semibold">
                Account Created
              </p>
              <p className="text-[hsl(270,15%,55%)] text-sm mt-1">
                Redirecting to sign in...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Username */}
              <div>
                <label
                  htmlFor="reg-username"
                  className="block text-sm font-medium text-[hsl(270,15%,65%)] mb-2"
                >
                  Username
                </label>
                <input
                  id="reg-username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setError("")
                  }}
                  placeholder="Choose a username"
                  className="w-full h-12 px-4 bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[hsl(276,60%,50%)] focus:bg-white/[0.07]"
                  autoComplete="username"
                />
                {username.length > 0 && username.trim().length < 2 && (
                  <p className="text-xs text-[hsl(0,72%,60%)] mt-1">
                    Minimum 2 characters
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="reg-email"
                  className="block text-sm font-medium text-[hsl(270,15%,65%)] mb-2"
                >
                  Email
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  placeholder="your@email.com"
                  className="w-full h-12 px-4 bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[hsl(276,60%,50%)] focus:bg-white/[0.07]"
                  autoComplete="email"
                />
                {email.length > 3 && !emailValid && (
                  <p className="text-xs text-[hsl(0,72%,60%)] mt-1">
                    Please enter a valid email
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="reg-password"
                  className="block text-sm font-medium text-[hsl(270,15%,65%)] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError("")
                    }}
                    placeholder="Create a password"
                    className="w-full h-12 px-4 pr-12 bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[hsl(276,60%,50%)] focus:bg-white/[0.07]"
                    autoComplete="new-password"
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

                {/* Strength meter */}
                {password.length > 0 && (
                  <div className="mt-3">
                    <div className="flex gap-1 mb-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 transition-colors ${
                            i < strength
                              ? STRENGTH_COLORS[strength]
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[hsl(270,15%,55%)]">
                      {STRENGTH_LABELS[strength]}
                    </p>
                  </div>
                )}

                {/* Real-time checks */}
                {password.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 gap-1">
                    {[
                      { key: "length", label: "6+ characters" },
                      { key: "uppercase", label: "Uppercase" },
                      { key: "number", label: "Number" },
                      { key: "symbol", label: "Symbol" },
                    ].map((rule) => (
                      <span
                        key={rule.key}
                        className={`text-xs ${
                          checks[rule.key as keyof typeof checks]
                            ? "text-[hsl(145,55%,50%)]"
                            : "text-white/30"
                        }`}
                      >
                        {checks[rule.key as keyof typeof checks] ? "+" : "-"}{" "}
                        {rule.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="reg-confirm"
                  className="block text-sm font-medium text-[hsl(270,15%,65%)] mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="reg-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setError("")
                  }}
                  placeholder="Re-enter your password"
                  className={`w-full h-12 px-4 bg-white/5 border text-white placeholder-white/25 text-sm outline-none transition-colors focus:border-[hsl(276,60%,50%)] focus:bg-white/[0.07] ${
                    confirmPassword.length > 0 && !passwordsMatch
                      ? "border-[hsl(0,72%,51%)]/50"
                      : "border-white/10"
                  }`}
                  autoComplete="new-password"
                />
                {confirmPassword.length > 0 && !passwordsMatch && (
                  <p className="text-xs text-[hsl(0,72%,60%)] mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 mt-0.5 accent-[hsl(276,60%,38%)]"
                />
                <span className="text-sm text-[hsl(270,15%,55%)] leading-relaxed">
                  I agree to the{" "}
                  <span className="text-[hsl(276,60%,55%)] underline">
                    Terms and Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-[hsl(276,60%,55%)] underline">
                    Privacy Policy
                  </span>
                </span>
              </label>

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
                    Creating account...
                  </span>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
