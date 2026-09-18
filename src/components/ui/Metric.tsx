import { cx } from '@/lib/cx'

type Tone = 'default' | 'dim' | 'flat' | 'risk' | 'long' | 'short'

const TONES: Record<Tone, string> = {
  default: 'text-desk-text',
  dim: 'text-desk-dim',
  flat: 'text-desk-flat',
  risk: 'text-desk-risk',
  long: 'text-desk-long',
  short: 'text-desk-short',
}

interface Props {
  label: string
  value: React.ReactNode
  tone?: Tone
  className?: string
}

/** Label above value, mono numerals, tabular so columns line up. */
export default function Metric({
  label,
  value,
  tone = 'default',
  className,
}: Props) {
  return (
    <div className={cx('min-w-0', className)}>
      <div className="eyebrow">{label}</div>
      <div
        className={cx(
          'tabular mt-1.5 truncate font-mono text-sm sm:text-[15px]',
          TONES[tone]
        )}
      >
        {value}
      </div>
    </div>
  )
}
