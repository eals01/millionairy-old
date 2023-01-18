import { useState } from 'react'
import styled from 'styled-components'
import socket from '../../../../socket'
import { useLobby } from '../../../../context/LobbyContext'

export default function ActionButtons() {
  const { players, dice } = useLobby()
  const [tradeOptionsVisible, setTradeOptionsVisible] = useState(false)

  function throwDice() {
    socket.emit('throwDice')
  }

  function purchaseProperty() {
    socket.emit('purchaseProperty')
  }

  function showTradeOptions() {
    setTradeOptionsVisible(true)
  }

  function hideTradeOptions() {
    setTradeOptionsVisible(false)
  }

  function trade(id: string) {
    socket.emit('trade', id)
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
      <button onClick={purchaseProperty} disabled={!(players.currentFinishedMoving && (!dice.throwable || (dice.throwable && dice.throwsInARow >= 1)) && spacePurchasable)}>
        Purchase property
      </button>
      <button disabled={!(players.currentFinishedMoving && (!dice.throwable || (dice.throwable && dice.throwsInARow >= 1)))}>
        Manage Properties
      </button>
      <div className='trade' onMouseEnter={showTradeOptions} onMouseLeave={hideTradeOptions}>
        <button disabled={!(players.currentFinishedMoving && (!dice.throwable || (dice.throwable && dice.throwsInARow >= 1)))}>
          Trade
        </button>
        {tradeOptionsVisible && <div className='tradeOptions'>
          {players.list.map(player => {
            if (!(socket.id === player.id)) {
              return <div onClick={() => { trade(player.id) }}>{player.id.substring(0, 3)}</div>
            }
          })}
        </div>}
      </div>
      <button onClick={endTurn} disabled={!players.currentFinishedMoving || dice.throwable}>
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

  .trade {
    position: relative;
  }

  .tradeOptions {
    position: absolute;
    bottom: 50px;
    width: 100%;
    background: white;

    > div {
      height: 30px;
      width: 100%;
      background: white;
      border-bottom: 1px solid grey;
      line-height: 30px;
      text-align: center;

      &:hover {
        background: #eeeeee;
        cursor: pointer;
      }
    }
  }

  button {
    height: 50px;
    width: 150px;
  }
`
