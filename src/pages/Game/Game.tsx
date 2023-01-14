import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Physics } from '@react-three/cannon'
import { Html, OrbitControls } from '@react-three/drei'
import { LayoutCamera, MotionCanvas } from 'framer-motion-3d'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import socket from '../../socket'
import { Player } from '../../types/Player'
import { Space } from '../../types/Space'

import Piece from './components/Piece/Piece'
import Dice from './components/Dice/Dice'
import ChanceCard from './components/Chance/ChanceCard'
import Board from './components/Board/Board'
import Table from './components/Scene/components/Table/Table'
import Camera from './components/Camera/Camera'
import Scene from './components/Scene/Scene'
import DebugMenu from './components/DebugMenu/DebugMenu'
import Chat, { Container } from '../../components/Chat'
import PropertyCards from './components/PropertyCards/PropertyCards'
import ChancePrompt from './components/Chance/ChancePrompt'
import CurrencyBills from './components/CurrencyBills/CurrencyBills'
import ActionButtons from './components/ActionButtons/ActionButtons'

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
      console.log(lobby)
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
      if (players.length > 0) {
        setDisplayedCardId(players[currentPlayerIndex].currentSpace)
      }
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
      <DebugMenu
        players={players}
        spaces={spaces}
        isCurrentPlayer={isCurrentPlayer}
        turnEndable={turnEndable}
        propertyCardDisplayed={propertyCardDisplayed}
        buyProperty={buyProperty}
        dontBuyProperty={dontBuyProperty}
        endTurn={endTurn}
      />
      <ChancePrompt yourTurn={isCurrentPlayer} />
      <ActionButtons />
      <MotionCanvas shadows camera={{ position: [30, 30, 0] }}>
        <Scene />
        {/*<Camera view={cameraView} />*/}
        <OrbitControls />
        <Physics gravity={[0, -12, 0]} allowSleep={true}>
          <Dice offset={0} active={isCurrentPlayer && !turnEndable} />
          <Dice offset={2} active={isCurrentPlayer && !turnEndable} />
          {[...Array(chanceCardCount)].map((_, index) => (
            <ChanceCard height={index / 4} key={`chance${index}`} />
          ))}
          <Board />
          <Table />
        </Physics>
        {players.map((player) => {
          return (
            <>
              <Piece
                key={'piece' + player.id}
                player={player}
                spaces={spaces}
              />
              <CurrencyBills
                key={'moneyCollection' + player.id}
                position={[31, -0.15, 4.5]}
                rotation={playerRotations[players.indexOf(player)]}
                money={player.money}
              />
            </>
          )
        })}
        <PropertyCards
          spaces={spaces}
          players={players}
          displayedCardId={displayedCardId}
          propertyCardDisplayed={propertyCardDisplayed}
          bank={bank}
        />
      </MotionCanvas>
    </GameContainer>
  )
}

const GameContainer = styled.div`
  width: 100%;
  height: 100%;

  > ${Container} {
    z-index: 1;
    position: absolute;
    right: 20px;
    top: 20px;
  }
`
