import { useState } from 'react'
import { searchTracks } from '../audius/client'
import { saveDownload } from '../db/db'
import { useStore } from '../store/useStore'
import TrackRow from '../components/TrackRow'
import type { Track } from '../types'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Track[]>([])
  const [loading, setLoading] = useState(false)
  const playTrack = useStore((s) => s.playTrack)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const tracks = await searchTracks(query)
      setResults(tracks)
    } finally {
      setLoading(false)
    }
  }

  async function handleDownload(track: Track) {
    const { getStreamUrl } = await import('../audius/client')
    const url = track.streamUrl ?? (await getStreamUrl(track.id))
    const response = await fetch(url)
    const blob = await response.blob()
    await saveDownload({ ...track, blob, downloadedAt: Date.now() })
    alert(`"${track.title}" baixada para escuta offline.`)
  }

  return (
    <div>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar faixas no Audius..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #444', background: '#1a1a1a', color: '#fff' }}
        />
        <button type="submit" disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
      </form>

      {results.map((track) => (
        <TrackRow
          key={track.id}
          track={track}
          onPlay={(t) => playTrack(t, results)}
          action={<button className="secondary" onClick={() => handleDownload(track)}>Baixar</button>}
        />
      ))}
    </div>
  )
}
