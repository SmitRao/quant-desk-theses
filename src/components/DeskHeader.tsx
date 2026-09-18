import DateSelector from './DateSelector'
import TextEffect from './motion/TextEffect'
import TextShimmer from './motion/TextShimmer'
import { formatDeskDate } from '@/lib/format'

interface Props {
  currentDate: string
  availableDates: string[]
}

/** Desk mark: a 2×2 tile grid, drawn rather than shipped as an asset. */
function DeskMark() {
  return (
    <span
      aria-hidden
      className="grid size-7 shrink-0 grid-cols-2 gap-[3px] rounded-md border border-desk-line-strong bg-desk-surface p-[5px] sm:size-8"
    >
      <span className="rounded-[1px] bg-desk-flat/80" />
      <span className="rounded-[1px] bg-desk-line-strong" />
      <span className="rounded-[1px] bg-desk-line-strong" />
      <span className="rounded-[1px] bg-desk-flat/40" />
    </span>
  )
}

export default function DeskHeader({ currentDate, availableDates }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-desk-line bg-desk-base/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <DeskMark />
          <div className="min-w-0">
            <TextEffect
              as="h1"
              per="char"
              preset="lift"
              stagger={0.022}
              className="font-mono text-[13px] leading-none font-semibold tracking-[0.2em] text-white uppercase sm:text-[15px]"
            >
              Quant Desk
            </TextEffect>
            <p className="mt-1.5 font-mono text-[10px] leading-none tracking-[0.22em] uppercase sm:text-[11px]">
              <TextShimmer base="var(--color-desk-muted)" peak="var(--color-desk-dim)">
                Daily theses
              </TextShimmer>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <span className="tabular hidden font-mono text-xs text-desk-dim lg:inline">
            {formatDeskDate(currentDate)}
          </span>
          <DateSelector dates={availableDates} currentDate={currentDate} />
        </div>
      </div>
    </header>
  )
}
