import { useEffect, useState } from 'react'
import { listDownloads, removeDownload } from '../db/db'
import { useStore } from '../store/useStore'
import TrackRow from '../components/TrackRow'
import type { DownloadedTrack, Track } from '../types'

export default function Downloads() {
  const [downloads, setDownloads] = useState<DownloadedTrack[]>([])
  const playTrack = useStore((s) => s.playTrack)

  useEffect(() => {
    listDownloads().then(setDownloads)
  }, [])

  function play(track: Track) {
    const download = downloads.find((d) => d.id === track.id)
    if (!download) return
    const url = URL.createObjectURL(download.blob)
    playTrack({ ...download, streamUrl: url }, downloads.map((d) => ({ ...d, streamUrl: URL.createObjectURL(d.blob) })))
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
