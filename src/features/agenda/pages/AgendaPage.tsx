function AgendaPage() {
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
          React Router is active and the root path now renders the Agenda
          placeholder inside the shared application layout.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl bg-brand-soft p-5">
          <h2 className="font-display text-xl font-semibold text-ink">
            Route shell
          </h2>
          <p className="mt-2 text-sm text-muted">
            The `/` route is configured and ready for agenda data and page
            interactions in later issues.
          </p>
        </article>

        <article className="rounded-2xl border border-dashed border-line bg-surfaceAlt p-5">
          <h2 className="font-display text-xl font-semibold text-ink">
            Shared layout
          </h2>
          <p className="mt-2 text-sm text-muted">
            Header and bottom navigation stay outside the route content so
            additional pages can plug into the same shell later.
          </p>
        </article>
      </div>
    </section>
  )
}

export default AgendaPage
