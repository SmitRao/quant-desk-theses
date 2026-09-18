import { cx } from '@/lib/cx'
import Spotlight from '@/components/motion/Spotlight'

interface Props {
  children: React.ReactNode
  className?: string
  /** Adds the pointer-tracking glow. Desktop only; ignored for reduced motion. */
  spotlight?: boolean
  as?: 'div' | 'section' | 'article'
}

/** The one surface primitive every section and card is built from. */
export default function Panel({
  children,
  className,
  spotlight = false,
  as: Tag = 'div',
}: Props) {
  return (
    <Tag className={cx('panel', className)}>
      {spotlight ? <Spotlight /> : null}
      <div className="relative z-1 flex h-full flex-col">{children}</div>
    </Tag>
  )
}
