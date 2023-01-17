import { Routes, Route } from 'react-router-dom'

import { LobbyContextProvider } from './context/LobbyContext'
import Home from './pages/Home/Home'
import Lobby from './pages/Lobby/Lobby'
import Game from './pages/Game/Game'

export default function App() {
  return (
    <LobbyContextProvider>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Lobby />} path='/lobby' />
        <Route element={<Game />} path='/game' />
      </Routes>
    </LobbyContextProvider>

  )
}
