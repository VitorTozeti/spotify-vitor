import type { Track } from '../types'

interface Props {
  track: Track
  onPlay: (track: Track) => void
  action?: React.ReactNode
}

export default function TrackRow({ track, onPlay, action }: Props) {
  return (
    <div className="track-row">
      <div onClick={() => onPlay(track)} style={{ cursor: 'pointer', flex: 1 }}>
        <strong>{track.title}</strong>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{track.artist}</div>
      </div>
      {action}
    </div>
  )
}
