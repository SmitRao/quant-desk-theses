'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

/**
 * In View — reveals its children the first time they scroll into the viewport.
 * Adapted for this desk from the Motion Primitives pattern
 * (https://motion-primitives.com).
 */

interface Props {
  children: React.ReactNode
  className?: string
  /** Seconds of delay, used to stagger siblings. */
  delay?: number
  /** Pixels of upward travel on reveal. */
  distance?: number
}

export default function InView({
  children,
  className,
  delay = 0,
  distance = 16,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  // Fire slightly before the element is fully on screen so the reveal is not
  // something the reader has to wait for.
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      data-desk-reveal=""
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
