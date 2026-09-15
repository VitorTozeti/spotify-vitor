import { useEffect, useState } from 'react'
import { listDownloads, removeDownload } from '../db/db'
import { useStore } from '../store/useStore'
import TrackRow from '../components/TrackRow'
import type { DownloadedTrack } from '../types'

export default function Downloads() {
  const [downloads, setDownloads] = useState<DownloadedTrack[]>([])
  const playTrack = useStore((s) => s.playTrack)

  useEffect(() => {
    listDownloads().then(setDownloads)
  }, [])

  function play(track: DownloadedTrack) {
    const url = URL.createObjectURL(track.blob)
    playTrack({ ...track, streamUrl: url }, downloads.map((d) => ({ ...d, streamUrl: URL.createObjectURL(d.blob) })))
  }

  async function remove(id: string) {
    await removeDownload(id)
    setDownloads((prev) => prev.filter((t) => t.id !== id))
  }

  if (downloads.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>Nenhuma faixa baixada ainda. Busque e baixe faixas para ouvir offline.</p>
  }

  return (
    <div>
      {downloads.map((track) => (
        <TrackRow
          key={track.id}
          track={track}
          onPlay={play}
          action={<button className="secondary" onClick={() => remove(track.id)}>Remover</button>}
        />
      ))}
    </div>
  )
}
