import { Player } from './Player'

export type Space = {
  id: number
  name: string
  column: number
  streetNumber: number
  type: string
  boundaries: {
    start: number[]
    end: number[]
  }
  ownerID: string | null
  price: {
    purchase: number
    parking: number[]
    house: number
    tax: number
  }
  color: string
  propertyNumber: number
  houseCount: 0 | 1 | 2 | 3 | 4 | 5
  playerIDsOnSpace: (string | null)[]
}

export const defaultSpace: Space = {
  id: -1,
  name: '',
  column: -1,
  streetNumber: -1,
  type: '',
  boundaries: {
    start: [],
    end: [],
  },
  ownerID: null,
  price: {
    purchase: -1,
    parking: [],
    house: -1,
    tax: -1,
  },
  color: '',
  propertyNumber: -1,
  houseCount: 0,
  playerIDsOnSpace: [],
}
