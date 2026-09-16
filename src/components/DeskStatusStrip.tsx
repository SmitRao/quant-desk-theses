import { DayData } from '@/lib/types'

interface Props {
  data: DayData
}

export default function DeskStatusStrip({ data }: Props) {
  const isFlat = data.desk_status === 'FLAT'
  const statusClass = isFlat ? 'status-flat' : 'status-risk'
  
  return (
    <div className="panel p-4 flex items-center justify-between">
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
  )
}
