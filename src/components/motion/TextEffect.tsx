'use client'

import { Fragment } from 'react'
import { motion, type TargetAndTransition, type Transition } from 'motion/react'
import { cx } from '@/lib/cx'

/**
 * Text Effect — a staggered reveal over the words or characters of a heading.
 * Adapted for this desk from the Motion Primitives pattern
 * (https://motion-primitives.com), built on `motion` + Tailwind.
 */

type Segmentation = 'word' | 'char'
type Preset = 'fade' | 'blur' | 'lift'

type Variant = { hidden: TargetAndTransition; visible: TargetAndTransition }

const PRESETS: Record<Preset, Variant> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(6px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  lift: {
    hidden: { opacity: 0, y: '0.32em', filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
}

const BASE_TRANSITION: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
}

interface Props {
  children: string
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p'
  per?: Segmentation
  preset?: Preset
  /** Seconds before the first segment starts. */
  delay?: number
  /** Seconds between segments. */
  stagger?: number
  className?: string
  segmentClassName?: string
}

export default function TextEffect({
  children,
  as: Tag = 'span',
  per = 'word',
  preset = 'lift',
  delay = 0,
  stagger = 0.045,
  className,
  segmentClassName,
}: Props) {
  const variant = PRESETS[preset]
  const segments = per === 'word' ? children.split(/\s+/) : Array.from(children)

  return (
    <Tag className={className} aria-label={children}>
      {segments.map((segment, index) => {
        // Whitespace stays an ordinary text node so lines can still break here.
        if (segment === ' ') {
          return (
            <Fragment key={`space-${index}`}> </Fragment>
          )
        }

        return (
          <Fragment key={`${segment}-${index}`}>
            <motion.span
              aria-hidden
              data-desk-reveal=""
              className={cx('inline-block', segmentClassName)}
              initial={variant.hidden}
              animate={variant.visible}
              transition={{ ...BASE_TRANSITION, delay: delay + index * stagger }}
            >
              {segment}
            </motion.span>
            {per === 'word' && index < segments.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
    </Tag>
  )
}
