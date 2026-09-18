import type { CSSProperties } from 'react'
import { cx } from '@/lib/cx'

/**
 * Text Shimmer — a slow highlight sweep across a label, in the spirit of the
 * Motion Primitives component (https://motion-primitives.com).
 *
 * The sweep itself is a CSS animation rather than a Motion one on purpose: it
 * loops forever, so it has to be silenced by the `prefers-reduced-motion` block
 * in globals.css before the first frame is ever painted.
 */

interface Props {
  children: string
  className?: string
  /** Resting colour of the text; the sweep peaks brighter than this. */
  base?: string
  peak?: string
}

export default function TextShimmer({ children, className, base, peak }: Props) {
  const style = {
    ...(base ? { '--shimmer-base': base } : {}),
    ...(peak ? { '--shimmer-peak': peak } : {}),
  } as CSSProperties

  return (
    <span className={cx('desk-shimmer', className)} style={style}>
      {children}
    </span>
  )
}
