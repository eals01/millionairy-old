import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { OrbitControls, PerspectiveCamera, Sky, Stars } from '@react-three/drei'
import socket from '../../socket'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

import Piece from './components/Piece/Piece'
import Dice from './components/Dice/Dice'
import Chance from './components/Chance/Chance'
import Board from './components/Board/Board'
import Table from './components/Table/Table'

import { Player } from '../../../../types/Player'
import { Space } from '../../../../types/Space'
import Chat, { ChatContainer } from '../../components/Chat'
import Property from './components/PropertyCard/Property'
import CardCollection from './components/CardCollection/CardCollection'
import ChanceCard from './components/Chance/ChanceCard'
import MoneyCollection from './components/MoneyCollection.tsx/MoneyCollection'
import Room from './components/Room/Room'
import WheelOfFortune from './components/WheelOfFortune/WheelOfFortune'
import { LayoutCamera, MotionCanvas } from 'framer-motion-3d'
import Box from './components/Box/Box'
import Camera from './components/Camera/Camera'

extend(THREE)
extend({ LayoutCamera })

export default function Game() {
  const [loaded, setLoaded] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [spaces, setSpaces] = useState<Space[]>([])
  const [isCurrentPlayer, setIsCurrentPlayer] = useState(false)
  const [turnEndable, setTurnEndable] = useState(false)
  const [chanceCardCount, setChanceCardCount] = useState(0)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(-2)
  const [displayedCardId, setDisplayedCardId] = useState(-1)
  const [propertyCardDisplayed, setPropertyCardDisplayed] = useState(false)
  const [cameraView, setCameraView] = useState('followPlayer')

  useEffect(() => {
    socket.emit('gamePageEntered')

    socket.on('updateLobby', (lobby) => {
      setLoaded(true)
      setPlayers(lobby.players)
      setSpaces(lobby.spaces)
      setIsCurrentPlayer(
        lobby.players[lobby.currentPlayerIndex].id === socket.id
      )
      setCurrentPlayerIndex(lobby.currentPlayerIndex)
      setChanceCardCount(lobby.chanceCards.length)
    })

    socket.on('turnEndable', () => {
      setTurnEndable(true)
    })

    socket.on('displayPropertyCard', () => {
      setPropertyCardDisplayed(true)
      setCameraView('card')
    })

    socket.on('purchaseDeclined', () => {
      setPropertyCardDisplayed(false)
      setCameraView('followPlayer')
    })

    socket.on('movePiece', (lobby) => {
      setCameraView('followPlayer')
      setPlayers(lobby.players)
    })

    socket.on('turnEnded', (lobby) => {
      setIsCurrentPlayer(
        lobby.players[lobby.currentPlayerIndex].id === socket.id
      )
      setCurrentPlayerIndex(lobby.currentPlayerIndex)
    })

    return () => {
      socket.off('updateLobby')
      socket.off('turnEndable')
      socket.off('displayPropertyCard')
      socket.off('purchaseDeclined')
      socket.off('movePiece')
      socket.off('turnEnded')
    }
  }, [])

  useEffect(() => {
    if (players.length > 0) {
      setDisplayedCardId(players[currentPlayerIndex].currentSpace)
    }
  }, [players])

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

  function buyProperty() {
    if (!player) return
    socket.emit('buyProperty', spaces[player.currentSpace])
    setPropertyCardDisplayed(false)
    setCameraView('followPlayer')
  }

  function dontBuyProperty() {
    socket.emit('declinePurchase')
  }

  function endTurn() {
    setTurnEndable(false)
    socket.emit('endTurn')
  }

  const player = players.find((player) => {
    return player.id === socket.id
  })

  const playerRotations =
    players.length === 2
      ? [0, Math.PI]
      : [0, Math.PI, Math.PI / 2, -Math.PI / 2]

  function calculateBillCounts(money: number) {
    const fiveHundreds = Math.floor(money / 500)
    const hundreds = Math.floor((money % 500) / 100)
    const tens = Math.floor((money % 100) / 10)
    const ones = Math.floor(money % 10)
    return [ones, tens, hundreds, fiveHundreds]
  }

  let bank = [40, 40, 20, 30]
  for (const player of players) {
    let index = 0
    for (const billCount of calculateBillCounts(player.money)) {
      bank[index] -= billCount
      index += 1
    }
  }

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
            <button onClick={moveTwo}>Move 2</button>
          </>
        )}

        {turnEndable && (
          <>
            {turnEndable &&
              ['property', 'transport', 'utility'].includes(
                spaces[player.currentSpace].type
              ) &&
              spaces[player.currentSpace].ownerID === '' &&
              propertyCardDisplayed && (
                <>
                  <button onClick={buyProperty}>Buy</button>
                  <button onClick={dontBuyProperty}>Don't buy</button>
                </>
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
      <ChanceCard currentPlayer={isCurrentPlayer} />
      <MotionCanvas shadows>
        <Camera view={cameraView} />
        {/*<Sky
          distance={450000}
          sunPosition={[0, -0.1, -1]}
          inclination={0}
          azimuth={0.25}
        />
        <Stars radius={300} />
        <pointLight
          position={[-150, 200, -400]}
          color='#c5d9ff'
          intensity={0.3}
          castShadow
          shadow-mapSize-height={32768}
          shadow-mapSize-width={32768}
          shadow-radius={4}
        />
        <spotLight
          position={[0, 150, 0]}
          color='#ffbb73'
          intensity={0.2}
          castShadow
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
          shadow-radius={1}
          shadow-bias={-0.0001}
        />*/}
        <ambientLight intensity={0.5} />
        <WheelOfFortune />
        <Box />
        {/*<Room />*/}
        <Physics gravity={[0, -12, 0]} allowSleep={true}>
          {players.map((player) => {
            return (
              <>
                <Piece
                  key={'piece' + player.id}
                  player={player}
                  players={players}
                  spaces={spaces}
                />
                <MoneyCollection
                  key={'moneyCollection' + player.id}
                  position={[31, -0.15, 4.5]}
                  rotation={playerRotations[players.indexOf(player)]}
                  money={player.money}
                />
              </>
            )
          })}
          <CardCollection
            spaces={spaces}
            players={players}
            displayedCardId={displayedCardId}
            bank={bank}
          />
          <Dice offset={0} active={isCurrentPlayer && !turnEndable} />
          <Dice offset={2} active={isCurrentPlayer && !turnEndable} />
          {[...Array(chanceCardCount)].map((__, index) => (
            <Chance height={index / 4} key={`chance${index}`} />
          ))}
          <Board />
          <Table />
        </Physics>
      </MotionCanvas>
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
