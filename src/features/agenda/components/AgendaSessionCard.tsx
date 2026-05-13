import type { Session, Speaker, Stage } from '../types'

type AgendaSessionCardProps = {
  session: Session
  speakers: Speaker[]
  stage: Stage | undefined
}

function AgendaSessionCard({
  session,
  speakers,
  stage,
}: AgendaSessionCardProps) {
  const startTime = new Date(session.startsAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  const endTime = new Date(session.endsAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <article className="rounded-[1.75rem] border border-line bg-white p-5 shadow-sm transition hover:border-brand/40 hover:shadow-shell sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-strong">
              {session.track}
            </span>
            <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {session.format}
            </span>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
              {session.title}
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted sm:text-base">
              {session.description}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-surfaceAlt px-4 py-3 text-sm text-ink">
          <p className="font-semibold">
            {startTime} - {endTime}
          </p>
          <p className="mt-1 text-muted">{stage?.name ?? 'Stage TBA'}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {speakers.map((speaker) => (
          <span
            key={speaker.id}
            className="rounded-full border border-line px-3 py-2 text-sm text-ink"
          >
            {speaker.name}
            <span className="text-muted"> · {speaker.company}</span>
          </span>
        ))}
      </div>
    </article>
  )
}

export default AgendaSessionCard
