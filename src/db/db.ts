import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { DownloadedTrack, Playlist, Track } from '../types'

interface MeuSpotifyDB extends DBSchema {
  downloads: {
    key: string
    value: DownloadedTrack
  }
  playlists: {
    key: string
    value: Playlist
  }
  favorites: {
    key: string
    value: Track
  }
}

let dbPromise: Promise<IDBPDatabase<MeuSpotifyDB>> | null = null

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<MeuSpotifyDB>('meu-spotify', 1, {
      upgrade(db) {
        db.createObjectStore('downloads', { keyPath: 'id' })
        db.createObjectStore('playlists', { keyPath: 'id' })
        db.createObjectStore('favorites', { keyPath: 'id' })
      },
    })
  }
  return dbPromise
}

export async function saveDownload(track: DownloadedTrack) {
  const db = await getDb()
  await db.put('downloads', track)
}

export async function removeDownload(trackId: string) {
  const db = await getDb()
  await db.delete('downloads', trackId)
}

export async function listDownloads(): Promise<DownloadedTrack[]> {
  const db = await getDb()
  return db.getAll('downloads')
}

export async function savePlaylist(playlist: Playlist) {
  const db = await getDb()
  await db.put('playlists', playlist)
}

export async function listPlaylists(): Promise<Playlist[]> {
  const db = await getDb()
  return db.getAll('playlists')
}

export async function toggleFavorite(track: Track) {
  const db = await getDb()
  const existing = await db.get('favorites', track.id)
  if (existing) {
    await db.delete('favorites', track.id)
    return false
  }
  await db.put('favorites', track)
  return true
}

export async function listFavorites(): Promise<Track[]> {
  const db = await getDb()
  return db.getAll('favorites')
}
