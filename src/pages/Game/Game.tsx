import styled from 'styled-components'
import { Physics } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import { LayoutCamera, MotionCanvas } from 'framer-motion-3d'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import socket from '../../socket'

import Piece from './components/Piece/Piece'
import Dice from './components/Dice/Dice'
import ChanceCard from './components/Chance/ChanceCard'
import Board from './components/Board/Board'
import Table from './components/Scene/components/Table/Table'
import Scene from './components/Scene/Scene'
import PropertyCards from './components/PropertyCards/PropertyCards'
import ChancePrompt from './components/Chance/ChancePrompt'
import CurrencyBills from './components/CurrencyBills/CurrencyBills'
import ActionButtons from './components/ActionButtons/ActionButtons'
import { useLobby } from '../../context/LobbyContext'

extend(THREE)
extend({ LayoutCamera })

export default function Game() {
  const { players, spaces, chanceCards } = useLobby()

  const playerRotations =
    players.list.length === 2
      ? [0, Math.PI]
      : [0, Math.PI, Math.PI / 2, -Math.PI / 2]

  const yourTurn = players.current.id === socket.id
  return (
    <GameContainer>
      <ChancePrompt yourTurn={yourTurn} />
      <ActionButtons />
      <MotionCanvas shadows camera={{ position: [30, 30, 0] }}>
        <Scene />
        <OrbitControls />
        <Physics gravity={[0, -12, 0]} allowSleep={true}>
          <Dice offset={0} />
          <Dice offset={2} />
          {[...Array(chanceCards.length)].map((_, index) => (
            <ChanceCard key={`chance${index}`} height={index / 4} />
          ))}
          <Board />
          <Table />
        </Physics>
        {players.list.map((player) => {
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
                rotation={playerRotations[players.list.indexOf(player)]}
                money={player.money}
              />
            </>
          )
        })}
        <PropertyCards spaces={spaces} players={players.list} />
      </MotionCanvas>
    </GameContainer>
  )
}

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
`
