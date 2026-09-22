import { useCallback, useEffect, useState } from 'react'
import type { Idea, Interest, Role } from '../types'
import {
  addInterest,
  ensureSeeded,
  getDisplayName,
  getIdeaById,
  getIdeas,
  getInterestCount,
  getInterestsForIdea,
  getRole,
  saveIdea,
  setDisplayName,
  setRole,
} from '../utils/storage'

export function usePitchBridge() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [role, setRoleState] = useState<Role>('funder')
  const [displayName, setDisplayNameState] = useState('')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    ensureSeeded()
    setIdeas(getIdeas())
    setRoleState(getRole())
    setDisplayNameState(getDisplayName())
  }, [tick])

  const refresh = useCallback(() => setTick((t) => t + 1), [])

  const changeRole = useCallback((r: Role) => {
    setRole(r)
    setRoleState(r)
  }, [])

  const changeDisplayName = useCallback((name: string) => {
    setDisplayName(name)
    setDisplayNameState(name.trim())
  }, [])

  const submitIdea = useCallback(
    (idea: Idea) => {
      saveIdea(idea)
      refresh()
    },
    [refresh],
  )

  const submitInterest = useCallback(
    (interest: Interest) => {
      addInterest(interest)
      refresh()
    },
    [refresh],
  )

  const ideaById = useCallback((id: string) => getIdeaById(id), [tick])
  const interestsFor = useCallback((id: string) => getInterestsForIdea(id), [tick])
  const interestCount = useCallback((id: string) => getInterestCount(id), [tick])

  return {
    ideas,
    role,
    displayName,
    changeRole,
    changeDisplayName,
    submitIdea,
    submitInterest,
    ideaById,
    interestsFor,
    interestCount,
    refresh,
  }
}
