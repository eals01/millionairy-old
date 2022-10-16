import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Player } from '../../../../types/Player'
import socket from '../../socket'

import Chat from '../../components/Chat'

export default function Lobby() {
  const navigate = useNavigate()

  const [loaded, setLoaded] = useState(false)
  const [code, setCode] = useState('')
  const [adminID, setAdminID] = useState('')
  const [players, setPlayers] = useState<Player[]>([])

  function startGame() {
    socket.emit('startGame')
  }

  useEffect(() => {
    socket.emit('lobbyPageEntered')

    socket.on('updateLobby', (lobby) => {
      setLoaded(true)
      setCode(lobby.code)
      setAdminID(lobby.adminID)
      setPlayers(lobby.players)
    })

    socket.on('gameStarted', () => {
      navigate('/game')
    })

    return () => {
      socket.off('updateLobby')
      socket.off('gameStarted')
    }
  }, [])

  const userCircleRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!userCircleRef.current) return
    if (userCircleRef.current !== null) {
      let userList = Array.from(userCircleRef.current.children) as HTMLElement[]
      let corners = userList.length
      let degrees = 360 / corners
      let radius = 100

      let currentDegree = 0
      for (let user of userList) {
        user.style.transform = `translate(
          ${
            Math.floor(Math.cos(currentDegree * (Math.PI / 180)) * radius) -
            user.offsetWidth / 2 +
            'px'
          }, 
          ${
            Math.floor(Math.sin(currentDegree * (Math.PI / 180)) * radius) -
            user.offsetHeight / 2 +
            'px'
          }
        )`
        currentDegree += degrees
      }
    }
  }, [players])

  if (!loaded) return null
  return (
    <LobbyContainer>
      <UserCircleContainer>
        <LobbyCode>{code}</LobbyCode>
        <UserCircle ref={userCircleRef}>
          {players.map((player, key) => {
            return (
              <span key={key} style={{ color: player.color }}>
                {(adminID === player.id ? '★' : '') +
                  player.id.substring(0, 3) +
                  (player.id === socket.id ? ' (you)' : '')}
              </span>
            )
          })}
        </UserCircle>
      </UserCircleContainer>
      {adminID === socket.id && (
        <AdminPanel>
          <button onClick={startGame}>Start game</button>
        </AdminPanel>
      )}
      <Chat />
    </LobbyContainer>
  )
}

const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const LobbyCode = styled.span`
  position: absolute;
`

const UserCircleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
`

const UserCircle = styled.div`
  position: relative;

  > span {
    position: absolute;
    transition: 0.5s;
    width: 100px;
    text-align: center;
  }
`

const AdminPanel = styled.div``
