'use client'

import { useEffect, useRef, useState } from 'react'

export default function TypewriterText({ text, className = '', startSignal = true, tag: Tag = 'span' }) {
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)
  const rafRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!startSignal || startedRef.current) return
    startedRef.current = true
    indexRef.current = 0
    setDisplayed('')

    const chars = Array.from(text)

    const getDelay = (char, index) => {
      // Natural typing: punctuation pauses, uncommon combos slightly slower
      if (['.', '!', '?'].includes(char)) return 120 + Math.random() * 60
      if ([',', ';', ':'].includes(char)) return 80 + Math.random() * 40
      if (char === ' ') return 60 + Math.random() * 30
      // Slightly slower at word start (index after space)
      const prev = chars[index - 1]
      if (prev === ' ' || index === 0) return 70 + Math.random() * 40
      return 45 + Math.random() * 35
    }

    let timeout
    const type = () => {
      const i = indexRef.current
      if (i >= chars.length) return
      setDisplayed(chars.slice(0, i + 1).join(''))
      indexRef.current++
      timeout = setTimeout(type, getDelay(chars[i], i))
    }

    timeout = setTimeout(type, 0)
    return () => clearTimeout(timeout)
  }, [startSignal, text])

  return (
    <Tag className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-current align-middle ml-[1px] animate-pulse" />
      )}
    </Tag>
  )
}
