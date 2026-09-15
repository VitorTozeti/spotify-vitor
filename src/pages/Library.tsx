import { useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import TrackRow from '../components/TrackRow'
import type { Track } from '../types'

export default function Library() {
  const [localTracks, setLocalTracks] = useState<Track[]>([])
  const playTrack = useStore((s) => s.playTrack)
  const fileInput = useRef<HTMLInputElement>(null)

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    const tracks: Track[] = files.map((file, i) => ({
      id: `local-${Date.now()}-${i}`,
      source: 'local',
      title: file.name.replace(/\.[^/.]+$/, ''),
      artist: 'Biblioteca local',
      streamUrl: URL.createObjectURL(file),
    }))
    setLocalTracks((prev) => [...prev, ...tracks])
  }

  return (
    <div>
      <p style={{ color: 'var(--text-muted)' }}>
        Importe arquivos de áudio que você já possui — tocam 100% offline, sem depender de nenhuma API.
      </p>
      <input ref={fileInput} type="file" accept="audio/*" multiple onChange={handleFiles} style={{ marginBottom: '1rem' }} />

      {localTracks.map((track) => (
        <TrackRow key={track.id} track={track} onPlay={(t) => playTrack(t, localTracks)} />
      ))}
    </div>
  )
}
