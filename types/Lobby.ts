import { Player } from './Player'
import { Message } from './Message'

export type Lobby = {
  code: string
  adminID: string
  availableColors: string[]
  players: Player[]
  chat: Message[]
  diceState: number[]
  currentPlayerIndex: number
}
