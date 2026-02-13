export interface User {
  username: string
  email: string
  password: string
}

export interface Session {
  username: string
  email: string
  loggedInAt: number
}

const USERS_KEY = "carecompanion_users"
const SESSION_KEY = "carecompanion_session"

export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function registerUser(user: User): { ok: boolean; error?: string } {
  const users = getUsers()
  if (users.find((u) => u.email === user.email)) {
    return { ok: false, error: "An account with this email already exists." }
  }
  if (users.find((u) => u.username === user.username)) {
    return { ok: false, error: "This username is already taken." }
  }
  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return { ok: true }
}

export function loginUser(
  emailOrUsername: string,
  password: string
): { ok: boolean; session?: Session; error?: string } {
  const users = getUsers()
  const found = users.find(
    (u) =>
      (u.email === emailOrUsername || u.username === emailOrUsername) &&
      u.password === password
  )
  if (!found) {
    return { ok: false, error: "Invalid credentials. Please try again." }
  }
  const session: Session = {
    username: found.username,
    email: found.email,
    loggedInAt: Date.now(),
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return { ok: true, session }
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY)
}
