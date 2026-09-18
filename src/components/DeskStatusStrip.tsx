import { DayData } from '@/lib/types'
import Panel from './ui/Panel'
import SectionHeader from './ui/SectionHeader'
import Metric from './ui/Metric'
import StatusPill from './ui/StatusPill'
import { formatDeskDate, totalMaxLoss } from '@/lib/format'

interface Props {
  data: DayData
}

const CELL =
  'lg:border-l lg:border-desk-line lg:pl-5 lg:first:border-l-0 lg:first:pl-0'

export default function DeskStatusStrip({ data }: Props) {
  const isFlat = data.desk_status === 'FLAT'
  const openTickets = data.ranked_book.length

  return (
    <Panel as="section" spotlight>
      <SectionHeader
        index="01"
        label="Desk status"
        title={
          isFlat
            ? 'The desk is flat — no open tickets today'
            : 'The desk is carrying risk today'
        }
        meta={<StatusPill status={data.desk_status} />}
      />

      <div className="grid grid-cols-2 gap-x-6 gap-y-5 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:grid-cols-5">
        <Metric label="Date" value={formatDeskDate(data.date)} className={CELL} />
        <Metric label="NAV" value={data.nav ?? '—'} tone="dim" className={CELL} />
        <Metric label="Cash" value={data.cash ?? '—'} tone="dim" className={CELL} />
        <Metric
          label="Open tickets"
          value={openTickets}
          tone={openTickets > 0 ? 'default' : 'dim'}
          className={CELL}
        />
        <Metric
          label="Max loss at risk"
          value={totalMaxLoss(data.ranked_book)}
          tone={openTickets > 0 ? 'short' : 'dim'}
          className={CELL}
        />
      </div>
    </Panel>
  )
}
