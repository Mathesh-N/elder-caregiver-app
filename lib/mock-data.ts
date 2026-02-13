export interface Medicine {
  id: string
  name: string
  dosage: string
  time: string
  taken: boolean
  days: string[]
}

export interface MoodEntry {
  date: string
  mood: number
  label: string
}

export interface SOSEvent {
  id: string
  date: string
  time: string
  contactNotified: string
  status: string
}

export interface Caregiver {
  id: string
  name: string
  role: string
  phone: string
  email: string
  rating: number
  available: boolean
  initials: string
}

export interface Alert {
  id: string
  type: "sos" | "missed" | "mood" | "info"
  message: string
  time: string
  read: boolean
}

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: "1",
    name: "Metformin",
    dosage: "500mg",
    time: "08:00",
    taken: true,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  {
    id: "2",
    name: "Amlodipine",
    dosage: "5mg",
    time: "09:00",
    taken: false,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  {
    id: "3",
    name: "Atorvastatin",
    dosage: "10mg",
    time: "21:00",
    taken: false,
    days: ["Mon", "Wed", "Fri"],
  },
  {
    id: "4",
    name: "Vitamin D",
    dosage: "1000 IU",
    time: "12:00",
    taken: true,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
]

export const MOOD_HISTORY: MoodEntry[] = [
  { date: "2026-02-07", mood: 4, label: "Happy" },
  { date: "2026-02-08", mood: 3, label: "Okay" },
  { date: "2026-02-09", mood: 5, label: "Great" },
  { date: "2026-02-10", mood: 2, label: "Sad" },
  { date: "2026-02-11", mood: 4, label: "Happy" },
  { date: "2026-02-12", mood: 3, label: "Okay" },
  { date: "2026-02-13", mood: 4, label: "Happy" },
]

export const SOS_HISTORY: SOSEvent[] = [
  {
    id: "1",
    date: "2026-02-13",
    time: "14:23",
    contactNotified: "Anita Sharma (Daughter)",
    status: "Resolved",
  },
  {
    id: "2",
    date: "2026-02-10",
    time: "09:15",
    contactNotified: "Dr. Rajesh Gupta",
    status: "Resolved",
  },
  {
    id: "3",
    date: "2026-02-05",
    time: "22:47",
    contactNotified: "Anita Sharma (Daughter)",
    status: "Resolved",
  },
]

export const CAREGIVERS: Caregiver[] = [
  {
    id: "1",
    name: "Dr. Rajesh Gupta",
    role: "Primary Physician",
    phone: "+91 98765 43210",
    email: "dr.rajesh@clinic.in",
    rating: 5,
    available: true,
    initials: "RG",
  },
  {
    id: "2",
    name: "Anita Sharma",
    role: "Daughter",
    phone: "+91 98765 12345",
    email: "anita.sharma@email.com",
    rating: 5,
    available: true,
    initials: "AS",
  },
  {
    id: "3",
    name: "Nurse Priya",
    role: "Home Nurse",
    phone: "+91 99887 76655",
    email: "priya.nurse@care.in",
    rating: 4,
    available: true,
    initials: "NP",
  },
  {
    id: "4",
    name: "Suresh Kumar",
    role: "Son",
    phone: "+91 87654 32109",
    email: "suresh.k@email.com",
    rating: 5,
    available: false,
    initials: "SK",
  },
  {
    id: "5",
    name: "Meera Patel",
    role: "Physiotherapist",
    phone: "+91 77665 54433",
    email: "meera.physio@clinic.in",
    rating: 4,
    available: true,
    initials: "MP",
  },
]

export const FAMILY_ALERTS: Alert[] = [
  {
    id: "1",
    type: "sos",
    message: "SOS triggered by Ramesh. Contact attempted: Anita Sharma.",
    time: "Today, 2:23 PM",
    read: false,
  },
  {
    id: "2",
    type: "missed",
    message: "Ramesh missed Amlodipine (5mg) at 9:00 AM.",
    time: "Today, 9:30 AM",
    read: false,
  },
  {
    id: "3",
    type: "mood",
    message: "Ramesh reported feeling 'Sad' on Feb 10.",
    time: "Feb 10, 6:00 PM",
    read: true,
  },
  {
    id: "4",
    type: "info",
    message: "Weekly adherence: 85%. Slight improvement from last week.",
    time: "Feb 9, 8:00 AM",
    read: true,
  },
  {
    id: "5",
    type: "missed",
    message: "Ramesh missed Atorvastatin (10mg) at 9:00 PM.",
    time: "Feb 8, 9:30 PM",
    read: true,
  },
]

export const ADHERENCE_DATA = [
  { day: "Mon", taken: 4, total: 4 },
  { day: "Tue", taken: 3, total: 4 },
  { day: "Wed", taken: 4, total: 5 },
  { day: "Thu", taken: 2, total: 4 },
  { day: "Fri", taken: 4, total: 5 },
  { day: "Sat", taken: 3, total: 4 },
  { day: "Sun", taken: 4, total: 4 },
]

export const MONTHLY_ADHERENCE = [
  { week: "Week 1", rate: 78 },
  { week: "Week 2", rate: 85 },
  { week: "Week 3", rate: 92 },
  { week: "Week 4", rate: 88 },
]

export const MOOD_LABELS: Record<number, string> = {
  1: "Very Sad",
  2: "Sad",
  3: "Okay",
  4: "Happy",
  5: "Great",
}

export const MOOD_COLORS: Record<number, string> = {
  1: "#ef4444",
  2: "#f97316",
  3: "#eab308",
  4: "#22c55e",
  5: "#6B1FA0",
}
