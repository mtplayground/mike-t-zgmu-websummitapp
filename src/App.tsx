import Layout from './components/layout/Layout'

function App() {
  return (
    <Layout>
      <section
        id="agenda"
        className="grid gap-6 rounded-[2rem] border border-line bg-surface p-6 shadow-shell sm:p-8"
        aria-labelledby="app-title"
      >
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-strong">
            Base Layout
          </p>
          <h1
            id="app-title"
            className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            Hello SummitNav
          </h1>
          <p className="max-w-2xl text-base text-muted sm:text-lg">
            Tailwind CSS is installed, theme tokens are in place, and the app
            now has a reusable mobile-first shell with a header and bottom
            navigation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl bg-brand-soft p-5">
            <h2 className="font-display text-xl font-semibold text-ink">
              Header shell
            </h2>
            <p className="mt-2 text-sm text-muted">
              Brand, context copy, and room for route-level actions later.
            </p>
          </article>

          <article className="rounded-2xl border border-dashed border-line bg-surfaceAlt p-5">
            <h2 className="font-display text-xl font-semibold text-ink">
              Bottom nav
            </h2>
            <p className="mt-2 text-sm text-muted">
              Agenda is the only visible tab for now, with the component shaped
              to accept more routes in future issues.
            </p>
          </article>
        </div>
      </section>
    </Layout>
  )
}

export default App
