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
    mortgage: number
  }
  color: string
  propertyNumber: number
  houseCount: 0 | 1 | 2 | 3 | 4 | 5
  playerIDsOnSpace: (string | null)[]
  mortgaged: boolean
}

export const defaultSpace: Space = {
  id: -1,
  name: '',
  column: 0,
  streetNumber: 0,
  type: '',
  boundaries: {
    start: [],
    end: [],
  },
  ownerID: null,
  price: {
    purchase: 0,
    parking: [],
    house: 0,
    tax: 0,
    mortgage: 0,
  },
  color: '',
  propertyNumber: 0,
  houseCount: 0,
  playerIDsOnSpace: [],
  mortgaged: false,
}
