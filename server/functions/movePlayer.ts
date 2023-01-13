import { Lobby } from '../../types/Lobby'
import { Player } from '../../types/Player'

const spaceCount = 40

export default function movePlayer(lobby: Lobby, player: Player, amount: number) {
  const playersOnSpace = lobby.spaces[player.currentSpace].playersOnSpace

  let indexOnPreviousSpace = -1
  playersOnSpace.find((space, index) => {
    indexOnPreviousSpace = index
    return space !== null && space.id === player.id
  })
  playersOnSpace[indexOnPreviousSpace] = null

  player.previousSpace = player.currentSpace
  player.currentSpace = (player.currentSpace + amount) % spaceCount

  const playersOnNewSpace = lobby.spaces[player.currentSpace].playersOnSpace

  let indexOfFirstAvailableSpace = -1
  playersOnNewSpace.find((space, index) => {
    indexOfFirstAvailableSpace = index
    return space === null
  })
  playersOnNewSpace[indexOfFirstAvailableSpace] = player

  const passedStart = player.currentSpace < player.previousSpace
  if (passedStart) {
    player.money += 200
  }
}
