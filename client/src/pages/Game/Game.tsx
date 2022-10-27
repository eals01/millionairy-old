import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import socket from '../../socket'

import Piece from './components/Piece/Piece'
import Dice from './components/Dice/Dice'
import Chance from './components/Chance/Chance'
import Fortune from './components/Fortune/Fortune'
import Board from './components/Board/Board'
import House from './components/House/House'
import Table from './components/Table/Table'

import { Player } from '../../../../types/Player'
import { Space } from '../../../../types/Space'
import Chat, { ChatContainer } from '../../components/Chat'
import Property from './components/PropertyCard/Property'
import CardCollection from './components/CardCollection/CardCollection'

export default function Game() {
  const [loaded, setLoaded] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [spaces, setSpaces] = useState<Space[]>([])
  const [isCurrentPlayer, setIsCurrentPlayer] = useState(false)
  const [turnEndable, setTurnEndable] = useState(false)

  useEffect(() => {
    socket.emit('gamePageEntered')

    socket.on('updateLobby', (lobby) => {
      setLoaded(true)
      setPlayers(lobby.players)
      setSpaces(lobby.spaces)
      setIsCurrentPlayer(
        lobby.players[lobby.currentPlayerIndex].id === socket.id
      )
    })

    socket.on('turnEndable', () => {
      setTurnEndable(true)
    })

    return () => {
      socket.off('updateLobby')
      socket.off('turnEndable')
    }
  }, [])

  function throwDice() {
    socket.emit('throwDice')
  }

  function moveOne() {
    socket.emit('emitDiceResult', 0)
    socket.emit('emitDiceResult', 1)
  }

  function buyProperty() {
    if (!player) return
    socket.emit('buyProperty', spaces[player.currentSpace])
  }

  function endTurn() {
    setTurnEndable(false)
    socket.emit('endTurn')
  }

  function positionPiece(player: Player) {
    let sharesSpaceWith = 0
    for (const otherPlayer of players) {
      if (player.currentSpace == otherPlayer.currentSpace) {
        sharesSpaceWith++
      }
    }

    let playerNumberOnSpace = 0
    for (const otherPlayer of players) {
      if (player === otherPlayer) break
      if (player.currentSpace == otherPlayer.currentSpace) {
        playerNumberOnSpace++
      }
    }

    const boundaries = spaces[player.currentSpace].boundaries
    const boundaryWidth = boundaries.start[0] - boundaries.end[0]
    const boundaryHeight = boundaries.start[2] - boundaries.end[2]

    return [
      boundaries.start[0] -
        (boundaryWidth / (sharesSpaceWith + 1)) * (playerNumberOnSpace + 1),
      1,
      boundaries.start[2] -
        (boundaryHeight / (sharesSpaceWith + 1)) * (playerNumberOnSpace + 1),
    ]
  }

  function calculateCurrencies(money: number) {
    const fiveHundreds = Math.floor(money / 500)
    const hundreds = Math.floor((money % 500) / 100)
    const tens = Math.floor((money % 100) / 10)
    const ones = Math.floor(money % 10)
    return [ones, tens, hundreds, fiveHundreds]
  }

  const player = players.find((player) => {
    return player.id === socket.id
  })

  if (!loaded || !player) return null
  return (
    <GameContainer>
      <Chat />
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 20,
          left: 20,
        }}
      >
        <Property space={spaces[player.currentSpace]} />
      </div>
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: 20,
          right: 20,
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
          </>
        )}

        {turnEndable && (
          <>
            {turnEndable &&
              ['property', 'transport', 'utility'].includes(
                spaces[player.currentSpace].type
              ) &&
              spaces[player.currentSpace].ownerID === '' && (
                <button onClick={buyProperty}>Buy</button>
              )}
            <button onClick={endTurn}>End turn</button>
          </>
        )}
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
      <Canvas shadows camera={{ position: [100, 0, 0], fov: 60 }}>
        <ambientLight intensity={0.25} />
        <spotLight
          intensity={0.6}
          angle={Math.PI / 4}
          penumbra={0.5}
          position={[50, 75, 150]}
          castShadow
          shadow-mapSize-height={2048}
          shadow-mapSize-width={2048}
        />
        <OrbitControls />
        <Physics allowSleep={true}>
          {players.map((player) => {
            return (
              <Piece
                key={player.id}
                player={player}
                position={positionPiece(player)}
              />
            )
          })}
          {players.map((player, index) => {
            const playerCards =
              players.length === 2
                ? [
                    {
                      position: [29, -0.15, 22.5],
                      rotation: [0, Math.PI, 0],
                    },
                    {
                      position: [-29, -0.15, -22.5],
                      rotation: [0, 0, 0],
                    },
                  ]
                : [
                    {
                      position: [29, -0.15, 22.5],
                      rotation: [0, Math.PI, 0],
                    },
                    {
                      position: [-22.5, -0.15, 29],
                      rotation: [0, Math.PI / 2, 0],
                    },
                    {
                      position: [-29, -0.15, -22.5],
                      rotation: [0, 0, 0],
                    },
                    {
                      position: [22.5, -0.15, -29],
                      rotation: [0, -Math.PI / 2, 0],
                    },
                  ]
            return (
              <CardCollection
                spaces={spaces.filter((space) => {
                  return space.ownerID === player.id
                })}
                position={playerCards[index].position}
                rotation={playerCards[index].rotation}
                currencies={calculateCurrencies(player.money)}
              />
            )
          })}
          <House color='limegreen' />

          <CardCollection
            spaces={spaces.filter((space) => {
              return space.ownerID === ''
            })}
            position={[0, -0.15, 80]}
            rotation={[0, Math.PI, 0]}
            currencies={[0, 0, 0, 0]}
          />
          <Dice offset={0} active={isCurrentPlayer && !turnEndable} />
          <Dice offset={2} active={isCurrentPlayer && !turnEndable} />
          {[...Array(20)].map((__, index) => (
            <Chance height={index / 4} key={`chance${index}`} />
          ))}
          {[...Array(20)].map((__, index) => (
            <Fortune height={index / 4} key={`fortune${index}`} />
          ))}
          <Board />
          <Table />
        </Physics>
      </Canvas>
    </GameContainer>
  )
}

const GameContainer = styled.div`
  width: 100%;
  height: 100%;

  > ${ChatContainer} {
    z-index: 1;
    position: absolute;
    right: 20px;
    top: 20px;
  }
`
