import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Lobby } from '../../../../types/Lobby'
import socket from '../../../../socket'

export default function ActionButtons() {
  const [lobby, setLobby] = useState<Lobby | undefined>()
  const [diceThrowable, setDiceThrowable] = useState(true)
  const [diceReThrowable, setDiceReThrowable] = useState(false)

  useEffect(() => {
    socket.emit('gamePageEntered')

    socket.on('updateLobby', (lobby) => {
      setLobby(lobby)
    })

    socket.on('diceThrown', () => {
      setDiceThrowable(false)
    })

    return () => {
      socket.off('updateLobby')
      socket.off('diceThrown')
    }
  }, [])

  function throwDice() {
    socket.emit('throwDice')
  }

  if (!lobby) return null
  const player = lobby.players[lobby.currentPlayerIndex]
  const currentSpace = lobby.spaces[player.currentSpace]

  const yourTurn = socket.id === player.id
  const spacePurchasable =
    ['property', 'transport', 'utility'].includes(currentSpace.type) &&
    currentSpace.ownerID === ''

  return (
    <Container>
      <button onClick={throwDice} disabled={!diceThrowable}>
        Throw Dice
      </button>
      <button disabled={diceThrowable && !spacePurchasable}>
        Purchase property
      </button>
      <button disabled={diceThrowable}>Manage Properties</button>
      <button disabled={diceThrowable}>Trade</button>
      <button disabled={diceThrowable}>End turn</button>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;
  height: 100px;

  > button {
    height: 50px;
    width: 200px;
  }
`
