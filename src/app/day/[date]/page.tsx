import { getAvailableDates, getDayData } from '@/lib/data'
import Dashboard from '@/components/Dashboard'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  const dates = getAvailableDates()
  return dates.map(date => ({ date }))
}

interface Props {
  params: Promise<{ date: string }>
}

export default async function DayPage({ params }: Props) {
  const { date } = await params
  const data = getDayData(date)
  const availableDates = getAvailableDates()
  
  if (!data) {
    notFound()
  }
  
  return (
    <Dashboard 
      data={data} 
      currentDate={date}
      availableDates={availableDates}
    />
  )
}
