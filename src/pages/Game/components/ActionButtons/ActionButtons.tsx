import styled from 'styled-components'
import socket from '../../../../socket'
import { useLobby } from '../../../../context/LobbyContext'

export default function ActionButtons() {
  const { players, dice } = useLobby()

  function throwDice() {
    socket.emit('throwDice')
  }

  function purchaseProperty() {
    socket.emit('purchaseProperty')
  }

  function endTurn() {
    socket.emit('endTurn')
  }

  const currentSpace = players.current.currentSpace
  const spacePurchasable =
    ['property', 'transport', 'utility'].includes(currentSpace.type) &&
    currentSpace.ownerID === null
  if (socket.id !== players.current.id) return null
  return (
    <Container>
      <button onClick={throwDice} disabled={!(dice.throwable)}>
        Throw Dice
      </button>
      <button onClick={purchaseProperty} disabled={!(players.currentFinishedMoving && spacePurchasable)}>
        Purchase property
      </button>
      <button disabled={!players.currentFinishedMoving || true}>
        Manage Properties
      </button>
      <button disabled={!players.currentFinishedMoving || true}>
        Trade
      </button>
      <button onClick={endTurn} disabled={!(players.currentFinishedMoving && !dice.throwable)}>
        End turn
      </button>
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
