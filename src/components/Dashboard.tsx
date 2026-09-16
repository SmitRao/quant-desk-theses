import { DayData } from '@/lib/types'
import DraftBanner from './DraftBanner'
import DeskStatusStrip from './DeskStatusStrip'
import RankedBook from './RankedBook'
import ThesisCard from './ThesisCard'
import Disclaimer from './Disclaimer'
import DateSelector from './DateSelector'

interface Props {
  data: DayData
  currentDate: string
  availableDates: string[]
}

export default function Dashboard({ data, currentDate, availableDates }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <DraftBanner />
      
      <main className="flex-1 p-4 max-w-[1600px] mx-auto w-full">
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-white tracking-wider">
            QUANT DESK THESES
          </h1>
          <DateSelector dates={availableDates} currentDate={currentDate} />
        </div>
        
        {/* Status strip */}
        <DeskStatusStrip data={data} />
        
        {/* Main content grid */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left column: Ranked Book */}
          <div className="lg:col-span-1">
            <RankedBook tickets={data.ranked_book} deskStatus={data.desk_status} />
          </div>
          
          {/* Right columns: Theses grid */}
          <div className="lg:col-span-2">
            <div className="panel p-4">
              <h2 className="text-dim text-xs uppercase tracking-wider mb-3 border-b border-[#222] pb-2">
                Quant Seat Theses
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.theses.map((thesis, idx) => (
                  <ThesisCard key={idx} thesis={thesis} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <Disclaimer />
      </main>
      
      {/* Footer */}
      <footer className="p-4 text-center text-dim text-xs border-t border-[#222] mt-4">
        Agentic Trading Desk Dashboard — Draft Version — Not For Distribution
      </footer>
    </div>
  )
}
