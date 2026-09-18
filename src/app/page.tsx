import { getAvailableDates, getLatestDayData } from '@/lib/data'
import Dashboard from '@/components/Dashboard'

export const dynamic = 'force-static'
export const revalidate = false

export default function Home() {
  const latest = getLatestDayData()
  const availableDates = getAvailableDates()
  
  if (!latest) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="panel max-w-sm p-6 text-center sm:p-8">
          <div className="eyebrow">Quant Desk</div>
          <h1 className="mt-3 text-lg font-semibold text-white">
            No data available
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-desk-dim">
            Add a JSON file to <span className="font-mono">/content/YYYY-MM-DD.json</span>{' '}
            to get started.
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <Dashboard 
      data={latest.data} 
      currentDate={latest.date}
      availableDates={availableDates}
    />
  )
}
