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
    currentManagingProperties: boolean
  }
  dice: {
    state: number[]
    throwable: boolean
    throwsInARow: number
  }
  trade: {
    active: boolean
    left: {
      player: Player
      properties: Space[]
      money: number
      ready: boolean
    }
    right: {
      player: Player
      properties: Space[]
      money: number
      ready: boolean
    }
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
    currentManagingProperties: false,
  },
  dice: {
    state: [],
    throwable: true,
    throwsInARow: 0,
  },
  trade: {
    active: false,
    left: {
      player: deepClone(defaultPlayer),
      properties: [],
      money: 0,
      ready: false
    },
    right: {
      player: deepClone(defaultPlayer),
      properties: [],
      money: 0,
      ready: false
    },
  },
  chat: [],
  spaces: [],
  chanceCards: [],
  availableColors: [],
}