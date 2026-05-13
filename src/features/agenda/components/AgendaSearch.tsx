type AgendaSearchProps = {
  onChange: (value: string) => void
  value: string
}

function AgendaSearch({ onChange, value }: AgendaSearchProps) {
  return (
    <label className="block space-y-3">
      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-strong">
        Search
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search titles, abstracts, or speakers"
        className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-ink shadow-sm outline-none transition placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30"
      />
    </label>
  )
}

export default AgendaSearch
