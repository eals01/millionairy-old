import { AnimatePresence } from 'framer-motion'
import { useLobby } from '../../../../context/LobbyContext'
import generatePlayerPositions from './functions/generatePlayerPositions'
import cardRotations from './functions/cardRotations'
import PropertyCard from '../PropertyCard/PropertyCard'
import CurrencyBill from '../CurrencyBill/CurrencyBill'
import faces from '../PropertyCard/faces/faces'
import textures from '../CurrencyBill/faces/faces'
import { Space } from '../../../../types/Space'
import { Player } from '../../../../types/Player'

export default function PropertyCards({ spaces, players }: { spaces: Space[], players: Player[] }) {
  const displayedCardId = 0
  const propertyCardDisplayed = false

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

  return (
    <group>
      {spaces.map((space, spaceIndex) => {
        if (space.column > -1) {
          const playerPositions = generatePlayerPositions(space, players)

          if (space.ownerID !== null) {
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
              space.id === displayedCardId
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
