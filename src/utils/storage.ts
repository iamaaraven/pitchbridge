import type { Idea, Interest, Role } from '../types'
import { SEED_IDEAS } from '../data/seed'

const IDEAS_KEY = 'pitchbridge_ideas'
const INTERESTS_KEY = 'pitchbridge_interests'
const ROLE_KEY = 'pitchbridge_role'
const NAME_KEY = 'pitchbridge_display_name'
const SEEDED_KEY = 'pitchbridge_seeded'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function ensureSeeded(): void {
  if (!localStorage.getItem(SEEDED_KEY)) {
    write(IDEAS_KEY, SEED_IDEAS)
    write(INTERESTS_KEY, [] as Interest[])
    localStorage.setItem(SEEDED_KEY, '1')
  }
}

export function getIdeas(): Idea[] {
  ensureSeeded()
  return read<Idea[]>(IDEAS_KEY, SEED_IDEAS)
}

export function saveIdea(idea: Idea): void {
  const ideas = getIdeas()
  write(IDEAS_KEY, [idea, ...ideas])
}

export function getIdeaById(id: string): Idea | undefined {
  return getIdeas().find((i) => i.id === id)
}

export function getInterests(): Interest[] {
  ensureSeeded()
  return read<Interest[]>(INTERESTS_KEY, [])
}

export function getInterestsForIdea(ideaId: string): Interest[] {
  return getInterests().filter((i) => i.ideaId === ideaId)
}

export function addInterest(interest: Interest): void {
  const all = getInterests()
  write(INTERESTS_KEY, [interest, ...all])
}

export function getInterestCount(ideaId: string): number {
  return getInterestsForIdea(ideaId).length
}

export function getRole(): Role {
  return (localStorage.getItem(ROLE_KEY) as Role) || 'funder'
}

export function setRole(role: Role): void {
  localStorage.setItem(ROLE_KEY, role)
}

export function getDisplayName(): string {
  return localStorage.getItem(NAME_KEY) || ''
}

export function setDisplayName(name: string): void {
  localStorage.setItem(NAME_KEY, name.trim())
}

export function formatFunding(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function uid(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
