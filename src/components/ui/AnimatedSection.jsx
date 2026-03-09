import { motion } from 'framer-motion'

const initialByDirection = {
  up:    { opacity: 0, y: 28 },
  left:  { opacity: 0, x: -28 },
  right: { opacity: 0, x: 28 },
  none:  { opacity: 0 },
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) {
  return (
    <motion.div
      className={className}
      initial={initialByDirection[direction] ?? initialByDirection.up}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px', amount: 0.12 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
