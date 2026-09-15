import { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import { getStreamUrl } from '../audius/client'

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { currentTrack, isPlaying, togglePlay, next, previous } = useStore()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    let cancelled = false

    async function updateSrcAndPlay() {
      const src = currentTrack.streamUrl ?? (currentTrack.source === 'audius' ? await getStreamUrl(currentTrack.id) : '')
      if (cancelled || !audio) return
      if (src && audio.src !== src) {
        audio.src = src
      }

      if (isPlaying) {
        audio.play().catch(() => {})
      } else {
        audio.pause()
      }
    }

    updateSrcAndPlay()

    return () => {
      cancelled = true
    }
  }, [currentTrack, isPlaying])

  if (!currentTrack) {
    return null
  }

  return (
    <div className="player-bar">
      <audio ref={audioRef} onEnded={next} />
      <div>
        <strong>{currentTrack.title}</strong>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{currentTrack.artist}</div>
      </div>
      <button className="secondary" onClick={previous}>⏮</button>
      <button onClick={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
      <button className="secondary" onClick={next}>⏭</button>
    </div>
  )
}
