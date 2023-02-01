import styled from 'styled-components'
import { Physics } from '@react-three/cannon'
import { Environment, OrbitControls } from '@react-three/drei'
import { LayoutCamera, MotionCanvas } from 'framer-motion-3d'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import socket from '../../socket'

import Piece from './components/Piece/Piece'
import Dice from './components/Dice/Dice'
import ChanceCard from './components/Chance/ChanceCard'
import Board from './components/Board/Board'
import Table from './components/Scene/components/Table/Table'
import Scene from './components/Scene/Scene'
import TradeWindow from './components/TradeWindow/TradeWindow'
import ManagePropertiesWindow from './components/ManagePropertiesWindow/ManagePropertiesWindow'
import PropertyCards from './components/PropertyCards/PropertyCards'
import ChancePrompt from './components/Chance/ChancePrompt'
import CurrencyBills from './components/CurrencyBills/CurrencyBills'
import ActionButtons from './components/ActionButtons/ActionButtons'
import { useLobby } from '../../context/LobbyContext'
import House from './components/House/House'
import Hotel from './components/Hotel/Hotel'

extend(THREE)
extend({ LayoutCamera })

export default function Game() {
  const { players, spaces, chanceCards, trade } = useLobby()

  const playerRotations =
    players.list.length === 2 ? [0, Math.PI] : [0, Math.PI, Math.PI / 2, -Math.PI / 2]

  const yourTurn = players.current.id === socket.id
  return (
    <GameContainer>
      <ChancePrompt yourTurn={yourTurn} />
      <ActionButtons />
      {trade.active && <TradeWindow />}
      {players.currentManagingProperties && <ManagePropertiesWindow />}
      <MotionCanvas shadows camera={{ position: [30, 30, 0] }}>
        <OrbitControls />
        {/*<Perf />*/}
        <Scene />
        <Physics gravity={[0, -12, 0]} allowSleep={true}>
          <Dice offset={0} />
          <Dice offset={2} />
          {[...Array(chanceCards.length)].map((_, index) => (
            <ChanceCard key={`chance${index}`} height={index / 4} />
          ))}
          <Board spaces={spaces} />
          {spaces.map((space) => {
            if (space.houseCount > 0 && space.houseCount !== 5) {
              return (
                <group>
                  {[...Array(space.houseCount)].map((_, index) => {
                    return (
                      <House
                        position={
                          space.id <= 10
                            ? [
                                space.boundaries.end[0] - 0.8,
                                0.5,
                                space.boundaries.start[2] - 0.4 - index * 1.05,
                              ]
                            : space.id > 10 && space.id <= 20
                            ? [
                                space.boundaries.end[0] + 0.4 + index * 1.05,
                                0.5,
                                space.boundaries.end[2] - 0.7,
                              ]
                            : space.id > 20 && space.id <= 30
                            ? [
                                space.boundaries.end[0] + 0.7,
                                0.5,
                                space.boundaries.end[2] + 0.5 + index * 1.05,
                              ]
                            : [
                                space.boundaries.end[0] - 0.5 - index * 1.05,
                                0.5,
                                space.boundaries.start[2] + 0.7,
                              ]
                        }
                        rotation={
                          space.id <= 10 || (space.id > 20 && space.id <= 30)
                            ? [0, 0, 0]
                            : [0, Math.PI / 2, 0]
                        }
                      />
                    )
                  })}
                </group>
              )
            } else if (space.houseCount === 5) {
              return (
                <Hotel
                  position={
                    space.id <= 10
                      ? [space.boundaries.end[0] - 0.8, 0.5, space.boundaries.start[2] - 2]
                      : space.id > 10 && space.id <= 20
                      ? [space.boundaries.end[0] + 2, 0.5, space.boundaries.end[2] - 0.7]
                      : space.id > 20 && space.id <= 30
                      ? [space.boundaries.end[0] + 0.7, 0.5, space.boundaries.end[2] + 2]
                      : [space.boundaries.end[0] - 2, 0.5, space.boundaries.start[2] + 0.7]
                  }
                  rotation={
                    space.id <= 10 || (space.id > 20 && space.id <= 30)
                      ? [0, 0, 0]
                      : [0, Math.PI / 2, 0]
                  }
                />
              )
            }
          })}
          <Table />
        </Physics>
        {players.list.map((player) => {
          return (
            <>
              <Piece key={'piece' + player.id} player={player} spaces={spaces} />
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
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`
