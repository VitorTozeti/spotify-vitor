import { NavLink, Outlet } from 'react-router-dom'
import Player from './components/Player'

export default function App() {
  return (
    <div className="app-shell">
      <nav className="app-nav">
        <NavLink to="/" end>Buscar</NavLink>
        <NavLink to="/biblioteca">Biblioteca</NavLink>
        <NavLink to="/baixadas">Baixadas</NavLink>
      </nav>
      <main className="app-content">
        <Outlet />
      </main>
      <Player />
    </div>
  )
}
