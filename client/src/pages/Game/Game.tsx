import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { Physics, Debug } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import socket from '../../socket'

import Piece from './components/Piece/Piece'
import Dice from './components/Dice/Dice'
import Chance from './components/Chance/Chance'
import Fortune from './components/Fortune/Fortune'
import Board from './components/Board/Board'
import House from './components/House/House'
import PropertyCard from './components/PropertyCard/PropertyCard'
import Table from './components/Table/Table'
import Money from './components/Money/Money'

import { Player } from '../../../../types/Player'
import Chat, { ChatContainer } from '../../components/Chat'

export default function Game() {
  const [loaded, setLoaded] = useState(false)
  const [factors, setFactors] = useState<number[]>([])
  const [diceThrown, setDiceThrown] = useState(false)
  const [result, setResult] = useState([0, 0])
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    socket.emit('gamePageEntered')

    socket.on('updateLobby', (lobby) => {
      setLoaded(true)
      setPlayers(lobby.players)
    })

    return () => {
      socket.off('updateLobby')
    }
  }, [])

  function throwDice() {}

  if (!loaded) return null
  return (
    <GameContainer>
      <Chat />
      <Canvas camera={{ position: [100, 0, 0], fov: 30 }}>
        <ambientLight intensity={0.3} />
        <spotLight
          intensity={0.6}
          angle={1}
          penumbra={1}
          position={[50, 100, 50]}
        />
        <OrbitControls
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 3}
          enableZoom={false}
          enablePan={false}
        />
        <Physics allowSleep={true}>
          <Debug>
            <Piece currentSpace={players[0].currentSpace} />
            <House color='red' />
            {[...Array(3)].map((number, columnIndex) =>
              [...Array(3)].map((number, index) => (
                <PropertyCard
                  offsetX={index * 2}
                  offsetY={index}
                  offsetZ={columnIndex * -6}
                />
              ))
            )}
            {[...Array(3)].map((_, columnIndex) =>
              [...Array(10)].map((_, index) => (
                <Money height={index} offsetZ={columnIndex * 6} />
              ))
            )}
            <Dice
              offset={2.5}
              factors={factors.slice(0, 2)}
              diceThrown={diceThrown}
              setDiceThrown={setDiceThrown}
              throwDie={throwDice}
              setResult={(individualResult: number) =>
                setResult([individualResult, result[1]])
              }
            />
            <Dice
              offset={-2.5}
              factors={factors.slice(2, 5)}
              diceThrown={diceThrown}
              setDiceThrown={setDiceThrown}
              throwDie={throwDice}
              setResult={(individualResult: number) =>
                setResult([result[0], individualResult])
              }
            />
            {[...Array(20)].map((__, index) => (
              <Chance height={index / 4} key={`chance${index}`} />
            ))}
            {[...Array(20)].map((__, index) => (
              <Fortune height={index / 4} key={`fortune${index}`} />
            ))}
            <Board />
            <Table />
          </Debug>
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
    right: 2em;
    top: 2em;
  }
`
