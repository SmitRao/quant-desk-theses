import { cx } from '@/lib/cx'

interface Props {
  status: 'FLAT' | 'IN_RISK'
  className?: string
}

/** The desk's headline state. The breathing dot is a CSS loop, so reduced motion stops it. */
export default function StatusPill({ status, className }: Props) {
  const isFlat = status === 'FLAT'

  return (
    <span
      className={cx(
        'inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 font-mono text-xs font-semibold tracking-[0.16em] uppercase sm:px-3.5 sm:text-sm',
        isFlat
          ? 'border-desk-flat/40 bg-desk-flat/8 text-desk-flat'
          : 'border-desk-risk/40 bg-desk-risk/8 text-desk-risk',
        className
      )}
    >
      <span aria-hidden className="relative inline-flex size-2.5 shrink-0">
        <span className="animate-desk-pulse absolute inset-0 rounded-full bg-current opacity-30" />
        <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
      </span>
      {isFlat ? 'Flat' : 'In risk'}
    </span>
  )
}
