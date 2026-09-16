import { getAvailableDates, getLatestDayData } from '@/lib/data'
import Dashboard from '@/components/Dashboard'

export const dynamic = 'force-static'
export const revalidate = false

export default function Home() {
  const latest = getLatestDayData()
  const availableDates = getAvailableDates()
  
  if (!latest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="panel p-8 text-center">
          <h1 className="text-xl font-bold mb-4">No Data Available</h1>
          <p className="text-dim">
            Add a JSON file to /content/YYYY-MM-DD.json to get started.
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
