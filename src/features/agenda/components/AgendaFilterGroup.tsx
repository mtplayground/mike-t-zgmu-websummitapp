type AgendaFilterGroupProps = {
  activeValue: string | null
  label: string
  options: { label: string; value: string }[]
  onChange: (value: string | null) => void
}

function AgendaFilterGroup({
  activeValue,
  label,
  options,
  onChange,
}: AgendaFilterGroupProps) {
  return (
    <section className="space-y-3">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-strong">
          {label}
        </h2>
        {activeValue ? (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-sm font-medium text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            Clear
          </button>
        ) : null}
      </header>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = activeValue === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(isActive ? null : option.value)}
              aria-pressed={isActive}
              className={[
                'rounded-full border px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2',
                isActive
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-white text-ink hover:border-brand/50 hover:bg-brand-soft',
              ].join(' ')}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default AgendaFilterGroup
