import { DayData } from '@/lib/types'

interface Props {
  data: DayData
}

export default function DeskStatusStrip({ data }: Props) {
  const isFlat = data.desk_status === 'FLAT'
  const statusClass = isFlat ? 'status-flat' : 'status-risk'
  
  return (
    <div className="panel p-3 sm:p-4">
      {/* Mobile: stacked layout */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-dim text-xs">STATUS</span>
            <span className={`${statusClass} font-bold text-sm px-2 py-0.5 border rounded`}>
              {data.desk_status === 'FLAT' ? 'FLAT' : 'IN RISK'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-dim text-xs">DATE</span>
            <span className="font-mono text-white text-sm">{data.date}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-dim">NAV</span>
            <span className="font-mono text-white">{data.nav ?? '—'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-dim">CASH</span>
            <span className="font-mono text-white">{data.cash ?? '—'}</span>
          </div>
        </div>
      </div>
      
      {/* Desktop: horizontal layout */}
      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-dim text-sm">DESK STATUS</span>
            <span className={`${statusClass} font-bold text-lg px-3 py-1 border rounded`}>
              {data.desk_status === 'FLAT' ? 'FLAT' : 'IN RISK'}
            </span>
          </div>
          
          <div className="text-dim text-sm">|</div>
          
          <div className="flex items-center gap-2">
            <span className="text-dim text-sm">DATE</span>
            <span className="font-mono text-white">{data.date}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-dim text-sm">NAV</span>
            <span className="font-mono text-white">{data.nav ?? '—'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-dim text-sm">CASH</span>
            <span className="font-mono text-white">{data.cash ?? '—'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
