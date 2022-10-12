import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Lobby from './pages/Lobby/Lobby'
import Game from './pages/Game/Game'
import socket from './socket'

export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('navigateHome', () => {
      navigate('/')
    })

    return () => {
      socket.off('navigateHome')
    }
  }, [])

  return (
    <Routes>
      <Route element={<Home />} path='/' />
      <Route element={<Lobby />} path='/lobby' />
      <Route element={<Game />} path='/game' />
    </Routes>
  )
}
