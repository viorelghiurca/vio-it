import { useState } from 'react'

export default function BgImage({ src, opacity = 'opacity-[0.07]', className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) return null

  return (
    <img
      src={src}
      alt=""
      className={`absolute inset-0 w-full h-full object-cover ${opacity} pointer-events-none ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
