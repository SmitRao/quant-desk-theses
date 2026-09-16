import { DayData } from './types'
import fs from 'fs'
import path from 'path'

export function getAvailableDates(): string[] {
  const contentDir = path.join(process.cwd(), 'content')
  
  if (!fs.existsSync(contentDir)) {
    return []
  }
  
  const files = fs.readdirSync(contentDir)
  return files
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
    .sort()
    .reverse()
}

export function getDayData(date: string): DayData | null {
  const filePath = path.join(process.cwd(), 'content', `${date}.json`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content) as DayData
}

export function getLatestDayData(): { date: string; data: DayData } | null {
  const dates = getAvailableDates()
  
  if (dates.length === 0) {
    return null
  }
  
  const latestDate = dates[0]
  const data = getDayData(latestDate)
  
  if (!data) {
    return null
  }
  
  return { date: latestDate, data }
}
