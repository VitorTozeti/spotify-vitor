import { create } from 'zustand'
import type { Track } from '../types'

interface PlayerState {
  queue: Track[]
  currentIndex: number
  isPlaying: boolean
  currentTrack: Track | null
  playTrack: (track: Track, queue?: Track[]) => void
  togglePlay: () => void
  next: () => void
  previous: () => void
}

export const useStore = create<PlayerState>((set, get) => ({
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  currentTrack: null,

  playTrack: (track, queue) => {
    const nextQueue = queue ?? [track]
    const index = nextQueue.findIndex((t) => t.id === track.id)
    set({ queue: nextQueue, currentIndex: index, currentTrack: track, isPlaying: true })
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  next: () => {
    const { queue, currentIndex } = get()
    if (currentIndex < queue.length - 1) {
      const index = currentIndex + 1
      set({ currentIndex: index, currentTrack: queue[index], isPlaying: true })
    }
  },

  previous: () => {
    const { queue, currentIndex } = get()
    if (currentIndex > 0) {
      const index = currentIndex - 1
      set({ currentIndex: index, currentTrack: queue[index], isPlaying: true })
    }
  },
}))
