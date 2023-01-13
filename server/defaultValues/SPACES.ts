import { Space } from '../../types/Space'

const SPACES: Space[] = [
  {
    id: 0,
    name: 'Start',
    column: -1,
    streetNumber: -1,
    type: 'start',
    boundaries: {
      start: [24.5, 5, -18],
      end: [18, 5, -24.5]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 1,
    name: 'Sandefjord',
    column: 0,
    streetNumber: 1,
    type: 'property',
    boundaries: {
      start: [24.5, 5, -14],
      end: [19.5, 5, -18]
    },
    ownerID: '',
    price: {
      buy: 60,
      parking: [4, 10, 30, 90, 160, 250],
      house: 50,
      tax: 0
    },
    color: 'brown',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 2,
    name: 'Wheel of Fortune',
    column: -1,
    streetNumber: -1,
    type: 'wheel',
    boundaries: {
      start: [24.5, 5, -10],
      end: [18, 5, -14]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 3,
    name: 'Larvik',
    column: 0,
    streetNumber: 2,
    type: 'property',
    boundaries: {
      start: [24.5, 5, -6],
      end: [19.5, 5, -10]
    },
    ownerID: '',
    price: {
      buy: 60,
      parking: [8, 20, 60, 180, 320, 450],
      house: 50,
      tax: 0
    },
    color: 'brown',
    propertyNumber: 1,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 4,
    name: 'Rotteskatt',
    column: -1,
    streetNumber: -1,
    type: 'tax',
    boundaries: {
      start: [24.5, 5, -2],
      end: [18, 5, -6]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 200
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 5,
    name: 'VY',
    column: 8,
    streetNumber: 1,
    type: 'transport',
    boundaries: {
      start: [24.5, 5, 2],
      end: [18, 5, -2]
    },
    ownerID: '',
    price: {
      buy: 200,
      parking: [25, 50, 100, 200],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 2,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 6,
    name: 'Hønefoss',
    column: 1,
    streetNumber: 1,
    type: 'property',
    boundaries: {
      start: [24.5, 5, 6],
      end: [19.5, 5, 2]
    },
    ownerID: '',
    price: {
      buy: 100,
      parking: [12, 30, 90, 270, 400, 550],
      house: 50,
      tax: 0
    },
    color: 'lightblue',
    propertyNumber: 3,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 7,
    name: 'Sjanse',
    column: -1,
    streetNumber: -1,
    type: 'chance',
    boundaries: {
      start: [24.5, 5, 10],
      end: [18, 5, 6]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 8,
    name: 'Mallorca',
    column: 1,
    streetNumber: 2,
    type: 'property',
    boundaries: {
      start: [24.5, 5, 14],
      end: [19.5, 5, 10]
    },
    ownerID: '',
    price: {
      buy: 100,
      parking: [12, 30, 90, 270, 400, 550],
      house: 50,
      tax: 0
    },
    color: 'lightblue',
    propertyNumber: 4,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 9,
    name: 'Åbolveien 37F',
    column: 1,
    streetNumber: 3,
    type: 'property',
    boundaries: {
      start: [24.5, 5, 18],
      end: [19.5, 5, 14]
    },
    ownerID: '',
    price: {
      buy: 120,
      parking: [16, 40, 100, 300, 450, 600],
      house: 50,
      tax: 0
    },
    color: 'lightblue',
    propertyNumber: 5,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 10,
    name: 'Jail',
    column: -1,
    streetNumber: -1,
    type: 'jail',
    boundaries: {
      start: [24.5, 5, 24.5],
      end: [18, 5, 18]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 11,
    name: 'Kringsjå',
    column: 2,
    streetNumber: 1,
    type: 'property',
    boundaries: {
      start: [18, 5, 24.5],
      end: [14, 5, 19.5]
    },
    ownerID: '',
    price: {
      buy: 140,
      parking: [20, 50, 150, 450, 625, 750],
      house: 100,
      tax: 0
    },
    color: 'pink',
    propertyNumber: 6,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 12,
    name: 'Tøyen Cola',
    column: 9,
    streetNumber: 1,
    type: 'utility',
    boundaries: {
      start: [14, 5, 24.5],
      end: [10, 5, 18]
    },
    ownerID: '',
    price: {
      buy: 150,
      parking: [100],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 7,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 13,
    name: 'Lambertseter',
    column: 2,
    streetNumber: 2,
    type: 'property',
    boundaries: {
      start: [10, 5, 24.5],
      end: [6, 5, 19.5]
    },
    ownerID: '',
    price: {
      buy: 140,
      parking: [20, 50, 150, 450, 625, 750],
      house: 100,
      tax: 0
    },
    color: 'pink',
    propertyNumber: 8,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 14,
    name: 'Grønland',
    column: 2,
    streetNumber: 3,
    type: 'property',
    boundaries: {
      start: [6, 5, 24.5],
      end: [2, 5, 19.5]
    },
    ownerID: '',
    price: {
      buy: 160,
      parking: [24, 60, 180, 500, 700, 900],
      house: 100,
      tax: 0
    },
    color: 'pink',
    propertyNumber: 9,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 15,
    name: 'Norwegian',
    column: 8,
    streetNumber: 2,
    type: 'transport',
    boundaries: {
      start: [2, 5, 24.5],
      end: [-2, 5, 18]
    },
    ownerID: '',
    price: {
      buy: 200,
      parking: [25, 50, 100, 200],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 10,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 16,
    name: 'Drammen',
    column: 3,
    streetNumber: 1,
    type: 'property',
    boundaries: {
      start: [-2, 5, 24.5],
      end: [-6, 5, 19.5]
    },
    ownerID: '',
    price: {
      buy: 180,
      parking: [28, 70, 200, 550, 750, 950],
      house: 100,
      tax: 0
    },
    color: 'orange',
    propertyNumber: 11,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 17,
    name: 'Wheel of Fortune',
    column: -1,
    streetNumber: -1,
    type: 'wheel',
    boundaries: {
      start: [-6, 5, 24.5],
      end: [-10, 5, 18]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 18,
    name: 'Tromsø',
    column: 3,
    streetNumber: 2,
    type: 'property',
    boundaries: {
      start: [-10, 5, 24.5],
      end: [-14, 5, 19.5]
    },
    ownerID: '',
    price: {
      buy: 180,
      parking: [28, 70, 200, 550, 750, 950],
      house: 100,
      tax: 0
    },
    color: 'orange',
    propertyNumber: 12,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 19,
    name: 'Drammen',
    column: 3,
    streetNumber: 3,
    type: 'property',
    boundaries: {
      start: [-14, 5, 24.5],
      end: [-18, 5, 19.5]
    },
    ownerID: '',
    price: {
      buy: 200,
      parking: [32, 80, 220, 600, 800, 1000],
      house: 100,
      tax: 0
    },
    color: 'orange',
    propertyNumber: 13,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 20,
    name: 'Gratis parkering',
    column: -1,
    streetNumber: -1,
    type: 'free',
    boundaries: {
      start: [-24.5, 5, 24.5],
      end: [-18, 5, 18]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 21,
    name: 'Hawaii',
    column: 4,
    streetNumber: 1,
    type: 'property',
    boundaries: {
      start: [-24.5, 5, 18],
      end: [-19.5, 5, 14]
    },
    ownerID: '',
    price: {
      buy: 220,
      parking: [36, 90, 250, 700, 875, 1050],
      house: 150,
      tax: 0
    },
    color: 'red',
    propertyNumber: 14,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 22,
    name: 'Sjanse',
    column: -1,
    streetNumber: -1,
    type: 'chance',
    boundaries: {
      start: [-24.5, 5, 14],
      end: [-18, 5, 10]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 23,
    name: 'Hawaii 2',
    column: 4,
    streetNumber: 2,
    type: 'property',
    boundaries: {
      start: [-24.5, 5, 10],
      end: [-19.5, 5, 6]
    },
    ownerID: '',
    price: {
      buy: 220,
      parking: [36, 90, 250, 700, 875, 1050],
      house: 150,
      tax: 0
    },
    color: 'red',
    propertyNumber: 15,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 24,
    name: 'Hawaii 3',
    column: 4,
    streetNumber: 3,
    type: 'property',
    boundaries: {
      start: [-24.5, 5, 6],
      end: [-19.5, 5, 2]
    },
    ownerID: '',
    price: {
      buy: 240,
      parking: [40, 100, 300, 750, 925, 1100],
      house: 150,
      tax: 0
    },
    color: 'red',
    propertyNumber: 16,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 25,
    name: 'Helikopter AS',
    column: 8,
    streetNumber: 3,
    type: 'transport',
    boundaries: {
      start: [-24.5, 5, 2],
      end: [-18, 5, -2]
    },
    ownerID: '',
    price: {
      buy: 200,
      parking: [25, 50, 100, 200],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 17,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 26,
    name: 'Göteborg',
    column: 5,
    streetNumber: 1,
    type: 'property',
    boundaries: {
      start: [-24.5, 5, -2],
      end: [-19.5, 5, -6]
    },
    ownerID: '',
    price: {
      buy: 260,
      parking: [44, 110, 330, 800, 975, 1150],
      house: 150,
      tax: 0
    },
    color: 'yellow',
    propertyNumber: 18,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 27,
    name: 'Malmö',
    column: 5,
    streetNumber: 2,
    type: 'property',
    boundaries: {
      start: [-24.5, 5, -6],
      end: [-19.5, 5, -10]
    },
    ownerID: '',
    price: {
      buy: 260,
      parking: [44, 110, 330, 800, 975, 1150],
      house: 150,
      tax: 0
    },
    color: 'yellow',
    propertyNumber: 19,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 28,
    name: 'Athletica',
    column: 9,
    streetNumber: 2,
    type: 'utility',
    boundaries: {
      start: [-24.5, 5, -10],
      end: [-18, 5, -14]
    },
    ownerID: '',
    price: {
      buy: 150,
      parking: [100],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 20,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 29,
    name: 'Kristiansand',
    column: 5,
    streetNumber: 3,
    type: 'utility',
    boundaries: {
      start: [-24.5, 5, -14],
      end: [-19.5, 5, -18]
    },
    ownerID: '',
    price: {
      buy: 280,
      parking: [48, 120, 360, 850, 1025, 1200],
      house: 150,
      tax: 0
    },
    color: 'yellow',
    propertyNumber: 21,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 30,
    name: 'Gå til fengsel',
    column: -1,
    streetNumber: -1,
    type: 'goToJail',
    boundaries: {
      start: [-24.5, 5, -18],
      end: [-18, 5, -24.5]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 31,
    name: 'Holmenkollen',
    column: 6,
    streetNumber: 1,
    type: 'property',
    boundaries: {
      start: [-18, 5, -19.5],
      end: [-14, 5, -24.5]
    },
    ownerID: '',
    price: {
      buy: 300,
      parking: [52, 130, 390, 900, 1100, 1275],
      house: 200,
      tax: 0
    },
    color: 'green',
    propertyNumber: 22,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 32,
    name: 'New Zealand',
    column: 6,
    streetNumber: 2,
    type: 'property',
    boundaries: {
      start: [-14, 5, -19.5],
      end: [-10, 5, -24.5]
    },
    ownerID: '',
    price: {
      buy: 300,
      parking: [52, 130, 390, 900, 1100, 1275],
      house: 200,
      tax: 0
    },
    color: 'green',
    propertyNumber: 23,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 33,
    name: 'Wheel of Fortune',
    column: -1,
    streetNumber: -1,
    type: 'wheel',
    boundaries: {
      start: [-10, 5, -18],
      end: [-6, 5, -24.5]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 34,
    name: 'New Zealand 2',
    column: 6,
    streetNumber: 3,
    type: 'property',
    boundaries: {
      start: [-6, 5, -19.5],
      end: [-2, 5, -24.5]
    },
    ownerID: '',
    price: {
      buy: 320,
      parking: [56, 150, 450, 1000, 1200, 1400],
      house: 200,
      tax: 0
    },
    color: 'green',
    propertyNumber: 24,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 35,
    name: 'Maxi Taxi',
    column: 8,
    streetNumber: 4,
    type: 'transport',
    boundaries: {
      start: [-2, 5, -18],
      end: [2, 5, -24.5]
    },
    ownerID: '',
    price: {
      buy: 200,
      parking: [25, 50, 100, 200],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 25,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 36,
    name: 'Sjanse',
    column: -1,
    streetNumber: -1,
    type: 'chance',
    boundaries: {
      start: [2, 5, -18],
      end: [6, 5, -24.5]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 0
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 37,
    name: 'Voss',
    column: 7,
    streetNumber: 1,
    type: 'property',
    boundaries: {
      start: [6, 5, -19.5],
      end: [10, 5, -24.5]
    },
    ownerID: '',
    price: {
      buy: 350,
      parking: [70, 175, 500, 1100, 1300, 1500],
      house: 200,
      tax: 0
    },
    color: 'blue',
    propertyNumber: 26,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 38,
    name: 'Formueskatt',
    column: -1,
    streetNumber: -1,
    type: 'tax',
    boundaries: {
      start: [10, 5, -18],
      end: [14, 5, -24.5]
    },
    ownerID: 'game',
    price: {
      buy: -1,
      parking: [],
      house: -1,
      tax: 100
    },
    color: '',
    propertyNumber: 0,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  },
  {
    id: 39,
    name: 'Bergen',
    column: 7,
    streetNumber: 2,
    type: 'property',
    boundaries: {
      start: [14, 5, -19.5],
      end: [18, 5, -24.5]
    },
    ownerID: '',
    price: {
      buy: 400,
      parking: [100, 200, 600, 1400, 1700, 2000],
      house: 200,
      tax: 0
    },
    color: 'blue',
    propertyNumber: 27,
    houseCount: 0,
    playersOnSpace: [null, null, null, null]
  }
]

export default SPACES
