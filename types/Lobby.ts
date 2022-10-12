import { Player } from './Player'
import { Message } from './Message'

export type Lobby = {
  code: string
  adminID: string
  players: Player[]
  chat: Message[]
}
