import { useParams } from 'react-router-dom'

export default function Playlist() {
  const { id } = useParams()

  return (
    <div>
      <p style={{ color: 'var(--text-muted)' }}>
        Playlist "{id}" — gerenciamento de playlists locais entra na Fase 4 do plano.
      </p>
    </div>
  )
}
