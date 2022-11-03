import { Space } from '../../../../../../types/Space'
import PropertyCard from '../PropertyCard/PropertyCard'
import faces from '../PropertyCard/faces/faces'
import { Player } from '../../../../../../types/Player'

export default function CardCollection({
  spaces,
  players,
}: {
  spaces: Space[]
  players: Player[]
}) {
  return (
    <group>
      {spaces.map((space) => {
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
            console.log(space.name, playerPosition)
            return (
              <PropertyCard
                key={'space' + space.id}
                position={[
                  playerPosition.position[0] + playerPosition.offset[0],
                  -0.15 + playerPosition.offset[1],
                  playerPosition.position[2] + playerPosition.offset[2],
                ]}
                rotation={[0, -Math.PI / 2 + playerPosition.rotation[1], 0]}
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
                  -space.column * 1.5 + 50 - space.streetNumber / 4,
                ]}
                rotation={[Math.PI / 1.3, Math.PI, 0]}
                face={faces[space.propertyNumber]}
              />
            )
          }
        }
      })}
    </group>
  )
}
