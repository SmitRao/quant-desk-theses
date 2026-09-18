'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'

/**
 * Spotlight — a soft glow that trails the pointer across the nearest positioned
 * ancestor. Adapted for this desk from the Motion Primitives pattern
 * (https://motion-primitives.com).
 *
 * Desktop only, and only for visitors who have not asked for reduced motion. It
 * stays invisible until the pointer enters, so enabling it from an effect costs
 * nothing visually.
 */

interface Props {
  /** Diameter of the glow, in pixels. */
  size?: number
}

export default function Spotlight({ size = 360 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 240, damping: 28, mass: 0.4 })
  const y = useSpring(pointerY, { stiffness: 240, damping: 28, mass: 0.4 })

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgba(99, 164, 255, 0.1), transparent 70%)`

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return

    const isDesktopPointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (!isDesktopPointer || prefersReducedMotion) return

    const track = (event: PointerEvent) => {
      const bounds = parent.getBoundingClientRect()
      pointerX.set(event.clientX - bounds.left)
      pointerY.set(event.clientY - bounds.top)
    }

    const handleEnter = (event: PointerEvent) => {
      track(event)
      // Land the glow under the pointer rather than springing in from the corner.
      x.jump(pointerX.get())
      y.jump(pointerY.get())
      setIsVisible(true)
    }

    const handleLeave = () => setIsVisible(false)

    parent.addEventListener('pointerenter', handleEnter)
    parent.addEventListener('pointermove', track)
    parent.addEventListener('pointerleave', handleLeave)

    return () => {
      parent.removeEventListener('pointerenter', handleEnter)
      parent.removeEventListener('pointermove', track)
      parent.removeEventListener('pointerleave', handleLeave)
    }
  }, [pointerX, pointerY, x, y])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
    >
      <motion.div
        className="absolute inset-0"
        style={{ background }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  )
}
