import { useAgenda } from '../context/AgendaContext'

function AgendaPage() {
  const {
    agenda: { conference, days, sessions, speakers, stages, tracks },
  } = useAgenda()

  return (
    <section
      className="grid gap-6 rounded-[2rem] border border-line bg-surface p-6 shadow-shell sm:p-8"
      aria-labelledby="agenda-title"
    >
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-strong">
          Agenda Route
        </p>
        <h1
          id="agenda-title"
          className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
        >
          Agenda
        </h1>
        <p className="max-w-2xl text-base text-muted sm:text-lg">
          Agenda data is now loaded from <code>/agenda.json</code> through a
          typed provider at startup, ready for the list UI in the next issue.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-2xl bg-brand-soft p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-strong">
            Days
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            {days.length}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {days.map((day) => day.label).join(' and ')}
          </p>
        </article>

        <article className="rounded-2xl border border-dashed border-line bg-surfaceAlt p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-strong">
            Sessions
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            {sessions.length}
          </h2>
          <p className="mt-2 text-sm text-muted">
            Spanning {tracks.length} tracks across {stages.length} stages.
          </p>
        </article>

        <article className="rounded-2xl border border-dashed border-line bg-surfaceAlt p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-strong">
            Speakers
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            {speakers.length}
          </h2>
          <p className="mt-2 text-sm text-muted">
            Representative fixture set for {conference.name} in{' '}
            {conference.city}.
          </p>
        </article>

        <article className="rounded-2xl border border-dashed border-line bg-surfaceAlt p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-strong">
            Loader
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            Ready
          </h2>
          <p className="mt-2 text-sm text-muted">
            Parsed with the agenda schema before route content renders.
          </p>
        </article>
      </div>
    </section>
  )
}

export default AgendaPage
