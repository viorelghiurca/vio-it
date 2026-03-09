import { useEffect, useRef, useState } from 'react'

/**
 * Wrapper-Komponente, die Kinder animiert einblendet, wenn sie in den Viewport scrollen.
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'left' | 'right' | 'none'
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':    return 'translateY(28px)'
      case 'left':  return 'translateX(-28px)'
      case 'right': return 'translateX(28px)'
      default:      return 'none'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : getInitialTransform(),
        transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
