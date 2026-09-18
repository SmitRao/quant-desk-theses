import { cx } from '@/lib/cx'
import TextEffect from '@/components/motion/TextEffect'

interface Props {
  /** Two-digit desk index, e.g. "02". */
  index: string
  /** Machine-side label, e.g. "RANKED BOOK". */
  label: string
  /** Plain-English title, e.g. "Today's ticket ladder". */
  title: string
  /** Right-aligned metadata, typically counts or totals. */
  meta?: React.ReactNode
  className?: string
}

/**
 * Every section opens the same way: an indexed mono label for the desk, a
 * plain-English title for the reader, and optional numbers on the right.
 */
export default function SectionHeader({
  index,
  label,
  title,
  meta,
  className,
}: Props) {
  return (
    <div
      className={cx(
        'flex flex-col gap-3 border-b border-desk-line px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:px-6 sm:py-5',
        className
      )}
    >
      <div className="min-w-0">
        <div className="eyebrow flex items-center gap-2">
          <span className="text-desk-muted/70">{index}</span>
          <span aria-hidden className="h-px w-4 bg-desk-line-strong" />
          <span>{label}</span>
        </div>
        <TextEffect
          as="h2"
          per="word"
          preset="fade"
          stagger={0.035}
          className="mt-2 text-[15px] font-semibold tracking-[-0.01em] text-desk-text sm:text-base"
        >
          {title}
        </TextEffect>
      </div>

      {meta ? (
        <div className="shrink-0 text-left sm:text-right">{meta}</div>
      ) : null}
    </div>
  )
}
