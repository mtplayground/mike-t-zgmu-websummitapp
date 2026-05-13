import type { z } from 'zod'
import {
  agendaDaySchema,
  agendaSchema,
  sessionFormatSchema,
  sessionSchema,
  speakerSchema,
  stageSchema,
} from './schema/agenda'

export type Speaker = z.infer<typeof speakerSchema>
export type Stage = z.infer<typeof stageSchema>
export type AgendaDay = z.infer<typeof agendaDaySchema>
export type SessionFormat = z.infer<typeof sessionFormatSchema>
export type Session = z.infer<typeof sessionSchema>
export type Agenda = z.infer<typeof agendaSchema>
