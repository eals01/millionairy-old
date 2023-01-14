import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import socket from '../../socket'

import Chat from '../../components/Chat'
import UserCircle from './components/UserCircle/UserCircle'

export default function Lobby() {
  const [pageLoaded, setPageLoaded] = useState(false)
  const [adminID, setAdminID] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    socket.emit('lobbyPageEntered')

    socket.on('updateLobby', (lobby) => {
      setPageLoaded(true)
      setAdminID(lobby.adminID)
    })

    socket.on('gameStarted', () => {
      navigate('/game')
    })

    return () => {
      socket.off('updateLobby')
      socket.off('gameStarted')
    }
  }, [])

  function startGame() {
    socket.emit('startGame')
  }

  if (!pageLoaded) return null
  return (
    <Container>
      <UserCircle />
      {adminID === socket.id && (
        <AdminPanel>
          <button onClick={startGame}>Start game</button>
        </AdminPanel>
      )}
      <Chat />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const AdminPanel = styled.div``
