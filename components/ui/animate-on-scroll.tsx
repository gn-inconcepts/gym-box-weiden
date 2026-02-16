'use client'

import { useRef, useEffect, type ReactNode } from 'react'

type AnimationClass =
  | 'animate-on-scroll'
  | 'animate-on-scroll-right'
  | 'animate-scale-on-scroll'
  | 'animate-fade-on-scroll'
  | 'stagger-children'
  | 'stagger-children-scale'

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  threshold?: number
  delay?: number
  animation?: AnimationClass
  once?: boolean
  as?: 'div' | 'section' | 'span'
}

export function AnimateOnScroll({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
  animation = 'animate-on-scroll',
  once = true,
  as: Tag = 'div',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => el.classList.add('visible'), delay)
          } else {
            el.classList.add('visible')
          }
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove('visible')
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, delay, once])

  return (
    <Tag ref={ref as any} className={`${animation} ${className}`}>
      {children}
    </Tag>
  )
}
