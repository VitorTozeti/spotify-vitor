import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Search from './pages/Search'
import Library from './pages/Library'
import Downloads from './pages/Downloads'
import Playlist from './pages/Playlist'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Search /> },
      { path: 'biblioteca', element: <Library /> },
      { path: 'baixadas', element: <Downloads /> },
      { path: 'playlist/:id', element: <Playlist /> },
    ],
  },
])
