import { createContext, useContext } from 'react'
import type { Agenda } from '../types'

export type AgendaContextValue = {
  agenda: Agenda
}

export const AgendaContext = createContext<AgendaContextValue | null>(null)

export function useAgenda() {
  const context = useContext(AgendaContext)

  if (!context) {
    throw new Error('useAgenda must be used within an AgendaProvider.')
  }

  return context
}
