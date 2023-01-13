import { Lobby } from '../../types/Lobby'

export default function createLobbyCode(lobbies: Lobby[]) {
  const alphabet = 'ACDEFGHJKLMNPQRSTUVWXYZ2345679'
  let result = ''
  for (let i = 0; i < 3; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  }
  if (
    !(
      lobbies.find(lobby => {
        return lobby.code === result
      }) === undefined
    )
  ) {
    createLobbyCode(lobbies)
  }
  return result
}
