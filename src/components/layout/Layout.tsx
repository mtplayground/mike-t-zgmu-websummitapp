import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

const navItems = [
  {
    href: '#agenda',
    label: 'Agenda',
    description: 'Current tab',
    isActive: true,
  },
] as const

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col">
        <header className="border-b border-line/80 bg-surface/95 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-strong">
                Web Summit Guide
              </p>
              <a
                href="#top"
                className="font-display text-2xl font-semibold tracking-tight text-ink"
              >
                SummitNav
              </a>
            </div>
            <p className="max-w-44 text-right text-sm text-muted sm:max-w-none">
              Mobile-first shell ready for routes and agenda views.
            </p>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 pb-28 sm:px-6 sm:py-10 sm:pb-12">
          {children}
        </main>

        <nav
          aria-label="Primary"
          className="fixed inset-x-0 bottom-0 border-t border-line/80 bg-surface/95 px-4 py-3 backdrop-blur sm:static sm:border-t-0 sm:bg-transparent sm:px-6 sm:pb-6"
        >
          <div className="mx-auto flex w-full max-w-md items-center justify-center rounded-2xl border border-line bg-surfaceAlt/90 p-2 shadow-shell sm:ml-0">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.isActive ? 'page' : undefined}
                className="flex min-w-36 flex-1 flex-col items-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
              >
                <span>{item.label}</span>
                <span className="text-xs font-medium text-white/80">
                  {item.description}
                </span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Layout
