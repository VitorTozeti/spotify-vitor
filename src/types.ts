export type TrackSource = 'audius' | 'local'

export interface Track {
  id: string
  source: TrackSource
  title: string
  artist: string
  artworkUrl?: string
  durationSeconds?: number
  streamUrl?: string
}

export interface DownloadedTrack extends Track {
  blob: Blob
  downloadedAt: number
}

export interface Playlist {
  id: string
  name: string
  trackIds: string[]
  createdAt: number
}
