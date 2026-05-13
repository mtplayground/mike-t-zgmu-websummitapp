import { useEffect, useState } from 'react'
import AgendaDayTabs from '../components/AgendaDayTabs'
import AgendaFilterGroup from '../components/AgendaFilterGroup'
import AgendaSearch from '../components/AgendaSearch'
import AgendaSessionCard from '../components/AgendaSessionCard'
import { useAgenda } from '../context/AgendaContext'
import type { Speaker } from '../types'

function AgendaPage() {
  const {
    agenda: { conference, days, sessions, speakers, stages, tracks },
  } = useAgenda()
  const [activeDayId, setActiveDayId] = useState(days[0]?.id ?? '')
  const [activeTrack, setActiveTrack] = useState<string | null>(null)
  const [activeStageId, setActiveStageId] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim().toLowerCase())
    }, 250)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [searchValue])

  const speakerById = new Map(speakers.map((speaker) => [speaker.id, speaker]))
  const stageById = new Map(stages.map((stage) => [stage.id, stage]))
  const trackOptions = tracks.map((track) => ({ label: track, value: track }))
  const stageOptions = stages.map((stage) => ({
    label: stage.name,
    value: stage.id,
  }))
  const selectedDay = days.find((day) => day.id === activeDayId) ?? days[0]
  const filteredSessions = sessions
    .filter((session) => session.dayId === selectedDay?.id)
    .filter((session) => !activeTrack || session.track === activeTrack)
    .filter((session) => !activeStageId || session.stageId === activeStageId)
    .filter((session) => {
      if (!debouncedSearchValue) {
        return true
      }

      const speakerText = session.speakerIds
        .map((speakerId) => speakerById.get(speakerId)?.name ?? '')
        .join(' ')
        .toLowerCase()

      const searchableText = [
        session.title,
        session.description,
        speakerText,
      ].join(' ')

      return searchableText.toLowerCase().includes(debouncedSearchValue)
    })
    .sort(
      (leftSession, rightSession) =>
        new Date(leftSession.startsAt).getTime() -
        new Date(rightSession.startsAt).getTime()
    )

  return (
    <div className="grid gap-6">
      <section
        className="grid gap-6 rounded-[2rem] border border-line bg-surface p-6 shadow-shell sm:p-8"
        aria-labelledby="agenda-title"
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-strong">
              {conference.name} · {conference.city}
            </p>
            <h1
              id="agenda-title"
              className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            >
              Agenda
            </h1>
            <p className="max-w-3xl text-base text-muted sm:text-lg">
              Browse the full summit schedule by day, narrow it by track or
              stage, and search sessions or speakers without leaving the main
              list.
            </p>
          </div>

          <div className="rounded-[1.75rem] bg-surfaceAlt p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-strong">
              Summary
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-muted">Days</dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-ink">
                  {days.length}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Sessions</dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-ink">
                  {sessions.length}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Tracks</dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-ink">
                  {tracks.length}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Stages</dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-ink">
                  {stages.length}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <AgendaDayTabs
          activeDayId={selectedDay?.id ?? ''}
          days={days}
          onChange={setActiveDayId}
        />
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-line bg-surface p-6 shadow-shell sm:p-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="space-y-6">
          <AgendaSearch value={searchValue} onChange={setSearchValue} />
          <AgendaFilterGroup
            label="Track"
            options={trackOptions}
            activeValue={activeTrack}
            onChange={setActiveTrack}
          />
          <AgendaFilterGroup
            label="Stage"
            options={stageOptions}
            activeValue={activeStageId}
            onChange={setActiveStageId}
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] bg-surfaceAlt px-4 py-3">
            <p className="text-sm text-muted">
              Showing{' '}
              <span className="font-semibold text-ink">
                {filteredSessions.length}
              </span>{' '}
              session{filteredSessions.length === 1 ? '' : 's'} for{' '}
              <span className="font-semibold text-ink">
                {selectedDay?.label ?? 'Selected day'}
              </span>
              .
            </p>
            {debouncedSearchValue ? (
              <p className="text-sm text-muted">
                Search:{' '}
                <span className="font-semibold text-ink">{searchValue}</span>
              </p>
            ) : null}
          </div>

          {filteredSessions.length > 0 ? (
            <div className="grid gap-4">
              {filteredSessions.map((session) => (
                <AgendaSessionCard
                  key={session.id}
                  session={session}
                  stage={stageById.get(session.stageId)}
                  speakers={session.speakerIds
                    .map((speakerId) => speakerById.get(speakerId))
                    .filter((speaker): speaker is Speaker => Boolean(speaker))}
                />
              ))}
            </div>
          ) : (
            <section className="rounded-[1.75rem] border border-dashed border-line bg-surfaceAlt p-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-strong">
                No sessions found
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
                Adjust the filters
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
                Try another day, clear a filter chip, or broaden your search to
                see more sessions from the agenda fixture.
              </p>
            </section>
          )}
        </div>
      </section>
    </div>
  )
}

export default AgendaPage
