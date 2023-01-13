import { Server } from 'socket.io'
import drawChanceCard from './drawChanceCard'
import performChanceAction from './performChanceAction'
import { Lobby } from '../../types/Lobby'
import { Player } from '../../types/Player'

export default function performSpaceAction(io: Server, lobby: Lobby, player: Player) {
  const space = lobby.spaces[player.currentSpace]
  if (space.type === 'chance' || space.type === 'wheel') {
    const card = drawChanceCard(lobby)
    performChanceAction(card, player)
    io.to(lobby.code).emit('drawChanceCard', card)
  } else if (space.type === 'start') {
    player.money += 400
    io.to(lobby.code).emit('updateLobby', lobby)
  } else if (space.type === 'goToJail') {
    player.currentSpace = 10
    io.to(lobby.code).emit('updateLobby', lobby)
  } else if (space.type === 'tax') {
    player.money -= lobby.spaces[player.currentSpace].price.tax
    io.to(lobby.code).emit('updateLobby', lobby)
  } else if (['property', 'transport', 'utility'].includes(space.type)) {
    if (space.ownerID === '') {
      io.to(lobby.code).emit('displayPropertyCard')
    } else if (space.ownerID !== '' && space.ownerID !== player.id) {
      const ownerOfSpace = lobby.players.find(player => player.id === space.ownerID)
      if (!ownerOfSpace) return
      player.money -= space.price.parking[space.houseCount]
      ownerOfSpace.money += space.price.parking[space.houseCount]
      console.log(
        player.id.substring(0, 3) +
          ' paid ' +
          ownerOfSpace.id.substring(0, 3) +
          ' ' +
          space.price.parking[space.houseCount]
      )
    }
    io.to(lobby.code).emit('updateLobby', lobby)
  }
}
