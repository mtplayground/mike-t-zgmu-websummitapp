import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ZodError } from 'zod'
import { AgendaContext } from './AgendaContext'
import { agendaSchema } from '../schema/agenda'
import type { Agenda } from '../types'

function getErrorMessage(error: unknown) {
  if (error instanceof ZodError) {
    return 'Agenda data is invalid. Check the shape of /agenda.json.'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred while loading agenda data.'
}

async function fetchAgenda(signal: AbortSignal) {
  const response = await fetch('/agenda.json', { signal })

  if (!response.ok) {
    throw new Error(`Failed to load agenda data (${response.status}).`)
  }

  const payload: unknown = await response.json()
  return agendaSchema.parse(payload)
}

function AgendaState({
  title,
  message,
  action,
}: {
  title: string
  message: string
  action?: ReactNode
}) {
  return (
    <section
      className="rounded-[2rem] border border-line bg-surface p-6 shadow-shell sm:p-8"
      aria-live="polite"
    >
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-strong">
          Agenda Loader
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base text-muted sm:text-lg">{message}</p>
      </div>

      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  )
}

function AgendaProvider() {
  const [agenda, setAgenda] = useState<Agenda | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadVersion, setLoadVersion] = useState(0)

  useEffect(() => {
    const abortController = new AbortController()

    void (async () => {
      try {
        const nextAgenda = await fetchAgenda(abortController.signal)
        setAgenda(nextAgenda)
      } catch (error) {
        if (abortController.signal.aborted) {
          return
        }

        setAgenda(null)
        setError(getErrorMessage(error))
      }
    })()

    return () => {
      abortController.abort()
    }
  }, [loadVersion])

  if (error) {
    return (
      <AgendaState
        title="Unable to load the agenda"
        message={error}
        action={
          <button
            type="button"
            onClick={() => {
              setAgenda(null)
              setError(null)
              setLoadVersion((currentVersion) => currentVersion + 1)
            }}
            className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            Retry loading agenda
          </button>
        }
      />
    )
  }

  if (!agenda) {
    return (
      <AgendaState
        title="Loading agenda"
        message="SummitNav is fetching the latest agenda fixture and preparing typed session data."
      />
    )
  }

  return (
    <AgendaContext.Provider value={{ agenda }}>
      <Outlet />
    </AgendaContext.Provider>
  )
}

export default AgendaProvider
