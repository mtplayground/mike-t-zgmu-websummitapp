import type { AgendaDay } from '../types'

type AgendaDayTabsProps = {
  activeDayId: string
  days: AgendaDay[]
  onChange: (dayId: string) => void
}

function AgendaDayTabs({ activeDayId, days, onChange }: AgendaDayTabsProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {days.map((day) => {
        const isActive = day.id === activeDayId

        return (
          <button
            key={day.id}
            type="button"
            onClick={() => onChange(day.id)}
            aria-pressed={isActive}
            className={[
              'min-w-fit rounded-full border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2',
              isActive
                ? 'border-brand bg-brand text-white'
                : 'border-line bg-surfaceAlt text-ink hover:border-brand/50 hover:bg-white',
            ].join(' ')}
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
              {day.label}
            </span>
            <span className="mt-1 block text-sm font-medium">
              {new Date(`${day.date}T00:00:00`).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default AgendaDayTabs
