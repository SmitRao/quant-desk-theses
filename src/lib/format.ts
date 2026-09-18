import { RankedTicket } from './types'

/**
 * Content authors write max loss as free text ("$300", "N/A", "$0 (flat)"), so
 * the desk totals are best-effort: anything unparseable is simply left out.
 */
function parseDollars(value: string): number | null {
  const match = value.replace(/,/g, '').match(/\$\s*(\d+(?:\.\d+)?)/)
  return match ? Number(match[1]) : null
}

export function totalMaxLoss(tickets: RankedTicket[]): string {
  const amounts = tickets
    .map((ticket) => parseDollars(ticket.max_loss))
    .filter((amount): amount is number => amount !== null)

  if (amounts.length === 0) {
    return tickets.length === 0 ? '$0' : '—'
  }

  const total = amounts.reduce((sum, amount) => sum + amount, 0)
  return `$${total.toLocaleString('en-US')}`
}

/** "2026-09-17" -> "Thu 17 Sep 2026", parsed as UTC so the label never shifts. */
export function formatDeskDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed)
}
