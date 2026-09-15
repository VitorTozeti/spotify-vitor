# spotify-vitor

App pessoal de música, grátis, com escuta offline — PWA local-first (React + Vite + TS),
usando o catálogo aberto do [Audius](https://audius.org) e uma biblioteca local de arquivos
próprios. Detalhes e decisões de arquitetura no vault (`meu-spotify` / `meu-spotify-dados`).

## Rodando

Requer Node.js 18+ instalado.

```bash
npm install
npm run dev
```

## Estrutura

- `src/pages` — Buscar, Biblioteca (import local), Baixadas, Playlist
- `src/audius` — client do Audius SDK (busca + stream)
- `src/db` — persistência em IndexedDB (downloads, playlists, favoritos) via `idb`
- `src/store` — estado do player (Zustand)
- `src/components` — Player global e lista de faixas

## Status

Fase 1 (scaffold) aplicada: navegação, player básico, busca/stream via Audius, download
para IndexedDB, biblioteca local por import de arquivo. Faltam: Service Worker/PWA
installable, playlists persistidas, favoritos na UI, metadados extras (Deezer/Spotify).