'use client'

import { useRouter } from 'next/navigation'

interface Props {
  dates: string[]
  currentDate: string
}

export default function DateSelector({ dates, currentDate }: Props) {
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const date = event.target.value
    if (date === dates[0]) {
      router.push('/')
    } else {
      router.push(`/day/${date}/`)
    }
  }

  return (
    <label className="group relative flex items-center">
      <span className="sr-only">View desk date</span>
      <select
        value={currentDate}
        onChange={handleChange}
        className="tabular min-h-9 appearance-none rounded-lg border border-desk-line bg-desk-surface py-1.5 pr-8 pl-3 font-mono text-xs text-desk-text transition-colors hover:border-desk-line-strong focus-visible:border-desk-flat sm:text-sm"
      >
        {dates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="pointer-events-none absolute right-3 size-2.5 text-desk-muted transition-colors group-hover:text-desk-dim"
      >
        <path
          d="M2 4.5 6 8.5 10 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  )
}
