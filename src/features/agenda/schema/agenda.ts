import { z } from 'zod'

export const speakerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  company: z.string().min(1),
  avatarUrl: z.string().url(),
})

export const stageSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  venue: z.string().min(1),
  color: z.string().regex(/^#([0-9a-fA-F]{6})$/, 'Expected a hex color value'),
})

export const agendaDaySchema = z.object({
  id: z.string().min(1),
  date: z.iso.date(),
  label: z.string().min(1),
})

export const sessionFormatSchema = z.enum([
  'Keynote',
  'Panel',
  'Talk',
  'Workshop',
])

export const sessionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  dayId: z.string().min(1),
  track: z.string().min(1),
  stageId: z.string().min(1),
  speakerIds: z.array(z.string().min(1)).min(1),
  startsAt: z.iso.datetime({ offset: true }),
  endsAt: z.iso.datetime({ offset: true }),
  format: sessionFormatSchema,
})

export const agendaSchema = z.object({
  conference: z.object({
    name: z.string().min(1),
    city: z.string().min(1),
    venue: z.string().min(1),
    timezone: z.string().min(1),
  }),
  days: z.array(agendaDaySchema).min(1),
  tracks: z.array(z.string().min(1)).min(1),
  stages: z.array(stageSchema).min(1),
  speakers: z.array(speakerSchema).min(1),
  sessions: z.array(sessionSchema).min(1),
})
