import deepClone from 'deep-clone'
import { defaultSpace, Space } from './Space'

export type Player = {
  id: string
  money: number
  nextPlayer: Player | null
  currentSpace: Space
  previousSpace: Space
  color: string
}

export const defaultPlayer: Player = {
  id: '',
  money: -1,
  nextPlayer: null,
  currentSpace: deepClone(defaultSpace),
  previousSpace: deepClone(defaultSpace),
  color: '',
}
