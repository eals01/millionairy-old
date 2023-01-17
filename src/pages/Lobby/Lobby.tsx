import styled from 'styled-components'
import socket from '../../socket'
import { useLobby } from '../../context/LobbyContext'

import Chat from '../../components/Chat'
import UserCircle from './components/UserCircle/UserCircle'

export default function Lobby() {
  const { players } = useLobby()

  function startGame() {
    socket.emit('startGame')
  }

  return (
    <Container>
      <UserCircle />
      {socket.id === players.admin.id && (
        <button onClick={startGame}>Start game</button>
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

