export interface RankedTicket {
  rank: number
  ticket: string
  max_loss: string
  note: string
}

export interface ThesisLevels {
  entry: string
  invalidation: string
  targets: string[]
}

export interface Thesis {
  author: string
  title: string
  thesis: string
  support_statements: string[]
  levels: ThesisLevels
  ranked_ticket: string
  max_loss: string
}

export interface DayData {
  date: string
  desk_status: 'FLAT' | 'IN_RISK'
  nav: string | null
  cash: string | null
  ranked_book: RankedTicket[]
  theses: Thesis[]
}
