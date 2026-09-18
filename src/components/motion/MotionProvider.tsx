'use client'

import { MotionConfig } from 'motion/react'

/**
 * `reducedMotion="user"` makes Motion resolve transform animations instantly for
 * visitors who ask for reduced motion, while leaving opacity alone. It pairs with
 * the `[data-desk-reveal]` override in globals.css, which handles the first paint.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
