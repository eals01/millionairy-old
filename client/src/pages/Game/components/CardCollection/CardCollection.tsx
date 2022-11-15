import { Space } from '../../../../../../types/Space'
import PropertyCard from '../PropertyCard/PropertyCard'
import faces from '../PropertyCard/faces/faces'
import { Lobby } from '../../../../../../types/Lobby'
import Money from '../Money/Money'
import textures from '../Money/faces/faces'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Player } from '../../../../../../types/Player'
import socket from '../../../../socket'

const moneyRotations = [
  -0.0035542148185325126, -0.03649812891558371, -0.024480735271521527,
  -0.02618536505838063, 0.03877931381088148, -0.0492274538476708,
  -0.048619116786601003, -0.029501423703322052, 0.0355168572214577,
  0.01748988937251446, -0.0029386513720251195, 0.014555042329934209,
  -0.026469756615503905, 0.030955616676023978, -0.00020040811522950563,
  0.03211633425455693, 0.025902097626396572, 0.010045558671036042,
  0.020145820473164905, -0.034688376770824994, -0.034057310389452124,
  0.02693470469993786, -0.010462921434977207, -0.022691227301098363,
  0.04789473834722248, 0.02061132247159911, -0.037225026687600526,
  -0.023119642554974475, -0.01764107687868717, 0.03283278653610845,
]

export default function CardCollection({
  spaces,
  players,
  displayedCardId,
  bank,
}: {
  spaces: Space[]
  players: Player[]
  displayedCardId: number
  bank: number[]
}) {
  const [purchaseDeclined, setPurchaseDeclined] = useState(false)

  useEffect(() => {
    socket.on('purchaseDeclined', () => {
      setPurchaseDeclined(true)
    })
  }, [])

  useEffect(() => {
    setPurchaseDeclined(false)
  }, [displayedCardId])

  return (
    <group>
      {spaces.map((space, spaceIndex) => {
        if (space.column > -1) {
          const playerPositions =
            players.length === 2
              ? [
                  {
                    player: players[0],
                    position: [29, -0.15, 22.5],
                    rotation: [0, Math.PI, 0],
                    offset: [
                      space.streetNumber * 1 + (space.column < 5 ? 0 : 10.5),
                      space.streetNumber / 20,
                      -(space.column % 5) * 5.2,
                    ],
                  },
                  {
                    player: players[1],
                    position: [-29, -0.15, -22.5],
                    rotation: [0, 0, 0],
                    offset: [
                      -space.streetNumber * 1 + (space.column < 5 ? 0 : -10.5),
                      space.streetNumber / 20,
                      (space.column % 5) * 5.2,
                    ],
                  },
                ]
              : [
                  {
                    player: players[0],
                    position: [29, -0.15, 22.5],
                    rotation: [0, Math.PI, 0],
                    offset: [
                      space.streetNumber * 1 + (space.column < 5 ? 0 : 10.5),
                      space.streetNumber / 20,
                      -(space.column % 5) * 5.2,
                    ],
                  },
                  {
                    player: players[1],
                    position: [-22.5, -0.15, 29],
                    rotation: [0, Math.PI / 2, 0],
                    offset: [
                      (space.column % 5) * 5.2,
                      space.streetNumber / 20,
                      space.streetNumber * 1 + (space.column < 5 ? 0 : 10.5),
                    ],
                  },
                  {
                    player: players[2],
                    position: [-29, -0.15, -22.5],
                    rotation: [0, 0, 0],
                    offset: [
                      -space.streetNumber * 1 + (space.column < 5 ? 0 : -10.5),
                      space.streetNumber / 20,
                      (space.column % 5) * 5.2,
                    ],
                  },
                  {
                    player: players[3],
                    position: [22.5, -0.15, -29],
                    rotation: [0, -Math.PI / 2, 0],
                    offset: [
                      -(space.column % 5) * 5.2,
                      space.streetNumber / 20,
                      -space.streetNumber * 1 + (space.column < 5 ? 0 : -10.5),
                    ],
                  },
                ]

          if (space.ownerID !== '') {
            const playerPosition = playerPositions.find(
              (playerPosition) => playerPosition.player.id === space.ownerID
            )
            if (!playerPosition) return

            return (
              <PropertyCard
                key={'space' + space.id}
                position={[
                  playerPosition.position[0] + playerPosition.offset[0],
                  -0.15 + playerPosition.offset[1],
                  playerPosition.position[2] + playerPosition.offset[2],
                ]}
                rotation={[
                  0,
                  -Math.PI / 2 +
                    playerPosition.rotation[1] +
                    moneyRotations[spaceIndex % 30] / 2,
                  0,
                ]}
                face={faces[space.propertyNumber]}
              />
            )
          } else {
            if (space.id === displayedCardId && !purchaseDeclined) {
              return (
                <PropertyCard
                  key={'space' + space.id}
                  position={[0, 20, 0]}
                  rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                  face={faces[space.propertyNumber]}
                />
              )
            } else {
              return (
                <PropertyCard
                  key={'space' + space.id}
                  position={[
                    -5,
                    4,
                    -space.column * 1.5 + 60 - space.streetNumber / 4,
                  ]}
                  rotation={[Math.PI / 1.3, Math.PI, 0]}
                  face={faces[space.propertyNumber]}
                />
              )
            }
          }
        }
      })}
      <AnimatePresence>
        {bank.map((currency, currencyIndex) => {
          return [...Array(currency)].map((__, index) => {
            return (
              <Money
                key={currencyIndex + ' ' + index}
                position={[4, 5 + index / 10, 64 - currencyIndex * 6]}
                face={textures[currencyIndex]}
                rotation={moneyRotations[(index + currencyIndex * 3) % 30]}
              />
            )
          })
        })}
      </AnimatePresence>
    </group>
  )
}
