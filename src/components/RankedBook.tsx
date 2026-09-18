import { RankedTicket } from '@/lib/types'
import Panel from './ui/Panel'
import SectionHeader from './ui/SectionHeader'
import { cx } from '@/lib/cx'
import { totalMaxLoss } from '@/lib/format'

interface Props {
  tickets: RankedTicket[]
  deskStatus: 'FLAT' | 'IN_RISK'
}

const COLUMNS = 'grid grid-cols-[2.5rem_5.5rem_6.5rem_1fr] items-center gap-4'

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className={cx(
        'tabular inline-flex size-7 items-center justify-center rounded-md border font-mono text-xs',
        rank === 1
          ? 'border-desk-flat/35 bg-desk-flat/8 text-desk-flat'
          : 'border-desk-line bg-desk-raised text-desk-dim'
      )}
    >
      {rank}
    </span>
  )
}

export default function RankedBook({ tickets, deskStatus }: Props) {
  const isFlat = deskStatus === 'FLAT' || tickets.length === 0

  return (
    <Panel as="section" spotlight>
      <SectionHeader
        index="02"
        label="Ranked book"
        title="Today's ticket ladder"
        meta={
          <span className="tabular font-mono text-xs text-desk-dim">
            {isFlat
              ? 'No tickets'
              : `${tickets.length} ${tickets.length === 1 ? 'ticket' : 'tickets'} · ${totalMaxLoss(tickets)} max loss`}
          </span>
        }
      />

      {isFlat ? (
        <div className="px-4 py-10 text-center sm:px-6 sm:py-12">
          <div className="font-mono text-sm tracking-[0.16em] text-desk-flat uppercase sm:text-base">
            No positions — flat
          </div>
          <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-desk-dim sm:text-sm">
            Nothing clears the edge bar today, so the book stays in cash.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop: a proper ladder with column headers. */}
          <div
            className={cx(
              COLUMNS,
              'eyebrow hidden border-b border-desk-line px-6 py-3 sm:grid'
            )}
          >
            <span>Rank</span>
            <span>Ticket</span>
            <span>Max loss</span>
            <span>Note</span>
          </div>

          <ul className="divide-y divide-desk-line">
            {tickets.map((ticket) => (
              <li key={ticket.rank}>
                {/* Mobile: stacked so the note never gets squeezed. */}
                <div className="flex flex-col gap-2 px-4 py-4 sm:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <RankBadge rank={ticket.rank} />
                      <span className="truncate font-mono text-sm font-semibold tracking-wide text-white">
                        {ticket.ticket}
                      </span>
                    </div>
                    <span className="tabular shrink-0 font-mono text-sm text-desk-short">
                      {ticket.max_loss}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-desk-dim">
                    {ticket.note}
                  </p>
                </div>

                <div
                  className={cx(
                    COLUMNS,
                    'hidden px-6 py-4 transition-colors hover:bg-desk-raised/60 sm:grid'
                  )}
                >
                  <RankBadge rank={ticket.rank} />
                  <span className="truncate font-mono text-sm font-semibold tracking-wide text-white">
                    {ticket.ticket}
                  </span>
                  <span className="tabular font-mono text-sm text-desk-short">
                    {ticket.max_loss}
                  </span>
                  <span className="min-w-0 text-[13px] leading-relaxed text-desk-dim">
                    {ticket.note}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </Panel>
  )
}
