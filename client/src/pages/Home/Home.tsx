import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import socket from '../../socket'

export default function Home() {
  const navigate = useNavigate()

  const [lobbyCode, setLobbyCode] = useState('')

  function createLobby() {
    socket.emit('createLobby')
  }

  function joinLobby(code: string) {
    socket.emit('joinLobby', code)
  }

  useEffect(() => {
    socket.on('lobbyCreated', (code) => {
      joinLobby(code)
    })

    socket.on('lobbyJoined', () => {
      navigate('./lobby')
    })

    return () => {
      socket.off('lobbyCreated')
      socket.off('lobbyJoined')
    }
  }, [])

  return (
    <HomeContainer>
      <h1>Millionairy</h1>
      <button onClick={createLobby}>Create new lobby</button>
      <span>or</span>
      <input
        type='text'
        placeholder='Enter lobby code'
        maxLength={3}
        value={lobbyCode}
        onChange={(event) => setLobbyCode(event.target.value.toUpperCase())}
      />
      <button onClick={() => joinLobby(lobbyCode)}>Join</button>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  > h1 {
    margin: 0 0 0.5em 0;
  }

  > input,
  button {
    width: 200px;
    height: 2em;
    box-sizing: border-box;
    text-align: center;
  }

  > span {
    position: relative;
  }

  > span::before {
    content: ' ';
    display: block;
    position: absolute;
    top: 0.6em;
    right: 1.5em;
    height: 1px;
    width: 60px;
    background: black;
  }

  > span::after {
    content: ' ';
    display: block;
    position: absolute;
    top: 0.6em;
    left: 1.5em;
    height: 1px;
    width: 60px;
    background: black;
  }
`
