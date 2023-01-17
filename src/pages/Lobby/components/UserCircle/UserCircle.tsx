import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useLobby } from '../../../../context/LobbyContext'
import socket from '../../../../socket'

export default function UserCircle() {
  const { players, code } = useLobby()

  const userCircleRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (userCircleRef.current) {
      const users = Array.from(userCircleRef.current.children) as HTMLElement[]
      const polygonCornerCount = users.length
      const degreesPerCorner = 360 / polygonCornerCount
      const radius = 100

      let offsetDegrees = 0
      for (let user of users) {
        user.style.transform = `translate(
          ${Math.floor(Math.cos(offsetDegrees * (Math.PI / 180)) * radius) -
          user.offsetWidth / 2 +
          'px'
          }, 
          ${Math.floor(Math.sin(offsetDegrees * (Math.PI / 180)) * radius) -
          user.offsetHeight / 2 +
          'px'
          }
        )`
        offsetDegrees += degreesPerCorner
      }
    }
  }, [players])

  return (
    <Container>
      <LobbyCode>{code}</LobbyCode>
      <Circle ref={userCircleRef}>
        {players.list.map((player, key) => {
          return (
            <span key={key} style={{ color: player.color }}>
              {(player === players.admin ? '★' : '') +
                player.id.substring(0, 3) +
                (player.id === socket.id ? ' (you)' : '')}
            </span>
          )
        })}
      </Circle>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
`

const Circle = styled.div`
  position: relative;

  > span {
    position: absolute;
    transition: 0.5s;
    width: 100px;
    text-align: center;
  }
`

const LobbyCode = styled.span`
  position: absolute;
`
