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
  }
  color: string
  propertyNumber: number
}
