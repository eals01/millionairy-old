import { Player } from './Player'
import { Message } from './Message'
import { Space } from './Space'

export type Lobby = {
  code: string
  adminID: string
  availableColors: string[]
  players: Player[]
  chat: Message[]
  diceState: number[]
  currentPlayerIndex: number
  spaces: Space[]
}
