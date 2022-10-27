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
  ownerID: string
  price: {
    buy: number
    parking: number[]
    house: number
    tax: number
  }
  color: string
  propertyNumber: number
  houseCount: 0 | 1 | 2 | 3 | 4 | 5
}
