import { RankedTicket } from '@/lib/types'

interface Props {
  tickets: RankedTicket[]
  deskStatus: 'FLAT' | 'IN_RISK'
}

export default function RankedBook({ tickets, deskStatus }: Props) {
  const isFlat = deskStatus === 'FLAT'
  
  return (
    <div className="panel p-4">
      <h2 className="text-dim text-xs uppercase tracking-wider mb-3 border-b border-[#222] pb-2">
        Today&apos;s Ranked Book
      </h2>
      
      {isFlat || tickets.length === 0 ? (
        <div className="text-center py-6">
          <span className="status-flat font-mono text-lg">NO POSITIONS — FLAT</span>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-[40px_80px_100px_1fr] gap-2 text-dim text-xs uppercase tracking-wider pb-2 border-b border-[#222]">
            <span>Rank</span>
            <span>Ticket</span>
            <span>Max Loss</span>
            <span>Note</span>
          </div>
          
          {tickets.map((ticket) => (
            <div 
              key={ticket.rank}
              className="grid grid-cols-[40px_80px_100px_1fr] gap-2 items-center py-2 border-b border-[#1a1a1a]"
            >
              <span className="font-mono text-yellow-400">#{ticket.rank}</span>
              <span className="font-mono font-bold text-white">{ticket.ticket}</span>
              <span className="font-mono text-red">{ticket.max_loss}</span>
              <span className="text-dim text-sm">{ticket.note}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
