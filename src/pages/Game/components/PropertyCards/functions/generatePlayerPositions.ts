import { Player } from '../../../../../types/Player'
import { Space } from '../../../../../types/Space'

export default function generatePlayerPositions(
  space: Space,
  players: Player[]
) {
  if (players.length === 2) {
    return [
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
  } else {
    return [
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
  }
}
