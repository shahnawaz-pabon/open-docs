'use client'

import { motion, useReducedMotion } from 'motion/react'

/**
 * Animated brand backdrop for the hero: two soft teal blobs that slowly drift
 * and pulse, giving the headline a living glow. Honors
 * `prefers-reduced-motion` by falling back to the original static radial
 * gradient. Purely decorative — sits behind content and ignores pointer events.
 */
export function HeroGlow() {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-brand-500)/12%,transparent_70%)]"
      />
    )
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-24 left-1/2 size-[36rem] rounded-full bg-[radial-gradient(circle,var(--color-brand-500)/16%,transparent_65%)] blur-2xl"
        style={{ x: '-50%' }}
        animate={{ x: ['-58%', '-42%', '-58%'], y: [0, 22, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute -top-32 left-1/2 size-[28rem] rounded-full bg-[radial-gradient(circle,var(--color-brand-300)/14%,transparent_60%)] blur-2xl"
        style={{ x: '-50%' }}
        animate={{ x: ['-40%', '-60%', '-40%'], y: [10, -14, 10], scale: [1.05, 0.95, 1.05] }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
      />
    </div>
  )
}
