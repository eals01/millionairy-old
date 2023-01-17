import { defaultPlayer, Player } from './Player'
import { Message } from './Message'
import { Space } from './Space'
import { ChanceCard } from './ChanceCard'
import deepClone from 'deep-clone'

export type Lobby = {
  code: string
  players: {
    list: Player[]
    admin: Player
    current: Player
    currentFinishedMoving: boolean
  }
  dice: {
    state: number[]
    throwable: boolean
    throwsInARow: number
  }
  trade: {
    active: boolean
    leftPlayer: Player
    rightPlayer: Player
  }
  chat: Message[]
  spaces: Space[]
  chanceCards: ChanceCard[]
  availableColors: string[]
}

export const defaultLobby: Lobby = {
  code: '',
  players: {
    list: [],
    admin: deepClone(defaultPlayer),
    current: deepClone(defaultPlayer),
    currentFinishedMoving: false,
  },
  dice: {
    state: [],
    throwable: true,
    throwsInARow: 0,
  },
  trade: {
    active: false,
    leftPlayer: deepClone(defaultPlayer),
    rightPlayer: deepClone(defaultPlayer),
  },
  chat: [],
  spaces: [],
  chanceCards: [],
  availableColors: [],
}
