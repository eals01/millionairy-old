import { Space } from '../../../../../../types/Space'
import PropertyCard from '../PropertyCard/PropertyCard'
import faces from '../PropertyCard/faces/faces'
import CurrencyBill from '../CurrencyBill/CurrencyBill'
import textures from '../CurrencyBill/faces/faces'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Player } from '../../../../../../types/Player'
import socket from '../../../../socket'

const cardRotations = [
  -0.0035, -0.0364, -0.0244, -0.0261, 0.0387, -0.0492, -0.0486, -0.0295, 0.0355,
  0.0174, -0.0029, 0.01455, -0.0264, 0.0309, -0.0002, 0.0321, 0.0259, 0.01,
  0.0201, -0.0346, -0.034, 0.0269, -0.0104, -0.0226, 0.0478, 0.0206, -0.0372,
  -0.0231, -0.0176, 0.0328,
]

export default function PropertyCards({
  spaces,
  players,
  displayedCardId,
  propertyCardDisplayed,
  bank,
}: {
  spaces: Space[]
  players: Player[]
  displayedCardId: number
  propertyCardDisplayed: boolean
  bank: number[]
}) {
  const [purchaseDeclined, setPurchaseDeclined] = useState(false)

  useEffect(() => {
    socket.on('displayPropertyCard', () => {
      setPurchaseDeclined(false)
    })

    socket.on('purchaseDeclined', () => {
      setPurchaseDeclined(true)
    })

    return () => {
      socket.off('displayPropertyCard')
      socket.off('purchaseDeclined')
    }
  }, [])

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
                    cardRotations[spaceIndex % 30] / 2,
                  0,
                ]}
                face={faces[space.propertyNumber]}
              />
            )
          } else {
            if (
              propertyCardDisplayed &&
              space.id === displayedCardId &&
              !purchaseDeclined
            ) {
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
              <CurrencyBill
                key={currencyIndex + ' ' + index}
                position={[4, 5 + index / 10, 64 - currencyIndex * 6]}
                face={textures[currencyIndex]}
                rotation={cardRotations[(index + currencyIndex * 3) % 30]}
              />
            )
          })
        })}
      </AnimatePresence>
    </group>
  )
}
