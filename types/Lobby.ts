import { Player } from './Player'
import { Message } from './Message'
import { Space } from './Space'
import { ChanceCard } from './ChanceCard'

export type Lobby = {
  code: string
  adminID: string
  availableColors: string[]
  players: Player[]
  chat: Message[]
  diceState: number[]
  currentPlayerIndex: number
  spaces: Space[]
  chanceCards: ChanceCard[]
}
