'use client'

import { useRouter } from 'next/navigation'

interface Props {
  dates: string[]
  currentDate: string
}

export default function DateSelector({ dates, currentDate }: Props) {
  const router = useRouter()
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const date = e.target.value
    if (date === dates[0]) {
      router.push('/')
    } else {
      router.push(`/day/${date}`)
    }
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-dim text-xs uppercase tracking-wider">View Date:</span>
      <select 
        value={currentDate}
        onChange={handleChange}
        className="bg-[#111] border border-[#333] rounded px-2 py-1 text-sm font-mono text-white focus:outline-none focus:border-[#555]"
      >
        {dates.map(date => (
          <option key={date} value={date}>{date}</option>
        ))}
      </select>
    </div>
  )
}
