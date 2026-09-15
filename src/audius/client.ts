import { sdk } from '@audius/sdk'
import type { Track } from '../types'

// App registrado sem chave: uso de leitura pública (busca/stream) não exige API key.
// Ver https://docs.audius.org para registrar um app próprio se precisar de limites maiores.
const audius = sdk({ appName: 'meu-spotify' })

export async function searchTracks(query: string): Promise<Track[]> {
  if (!query.trim()) return []

  const { data } = await audius.tracks.searchTracks({ query })

  return (data ?? []).map((track) => ({
    id: track.id,
    source: 'audius' as const,
    title: track.title,
    artist: track.user?.name ?? 'Artista desconhecido',
    artworkUrl: track.artwork?._150x150,
    durationSeconds: track.duration,
  }))
}

export async function getStreamUrl(trackId: string): Promise<string> {
  const { data } = await audius.tracks.streamTrack({ trackId })
  return data
}
