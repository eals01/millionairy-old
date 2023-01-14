import { Player } from '../../../../types/Player'
import { Space } from '../../../../types/Space'
import socket from '../../../../socket'

export default function DebugMenu({
  players,
  spaces,
  isCurrentPlayer,
  turnEndable,
  propertyCardDisplayed,
  buyProperty,
  dontBuyProperty,
  endTurn,
}: {
  players: Player[]
  spaces: Space[]
  isCurrentPlayer: boolean
  turnEndable: boolean
  propertyCardDisplayed: boolean
  buyProperty: () => void
  dontBuyProperty: () => void
  endTurn: () => void
}) {
  function throwDice() {
    socket.emit('throwDice')
  }

  function moveOne() {
    socket.emit('emitDiceResult', 0)
    socket.emit('emitDiceResult', 1)
  }

  function moveTwo() {
    socket.emit('emitDiceResult', 1)
    socket.emit('emitDiceResult', 1)
  }

  const player = players.find((player) => {
    return player.id === socket.id
  })

  if (!player) return null

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        top: 20,
        left: 20,
        width: 400,
        height: 200,
        background: 'white',
        border: '1px solid black',
      }}
    >
      {isCurrentPlayer && !turnEndable && (
        <>
          <button onClick={throwDice}>Throw dice</button>
          <button onClick={moveOne}>Move 1</button>
          <button onClick={moveTwo}>Move 2</button>
        </>
      )}

      {['property', 'utility', 'transportation'].includes(
        spaces[player.currentSpace].type
      ) &&
        spaces[player.currentSpace].ownerID === '' &&
        propertyCardDisplayed && (
          <>
            <button onClick={buyProperty}>Buy</button>
            <button onClick={dontBuyProperty}>Don't buy</button>
          </>
        )}
      {turnEndable && <button onClick={endTurn}>End turn</button>}

      <div>
        {players.map((player, index) => {
          return (
            <div key={index} style={{ display: 'flex' }}>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  background: player.color,
                }}
              />
              <span>
                <b>{player.id.substring(0, 3)}</b>
                <span style={{ marginLeft: '16px' }}>
                  space: {player.currentSpace},
                </span>
                <span style={{ marginLeft: '16px' }}>
                  money: {player.money}
                </span>
              </span>
              {player.id === socket.id && (
                <span style={{ marginLeft: '16px' }}>(you)</span>
              )}
            </div>
          )
        })}
        <p>Your turn: {isCurrentPlayer.toString()}</p>
      </div>
    </div>
  )
}
