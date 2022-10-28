import { ChanceCard } from '../../types/ChanceCard'

const chanceCards: ChanceCard[] = [
  {
    text: 'Marius er i det gavmilde hjørnet... Motta M100',
    action: {
      type: 'receive',
      value: 100
    }
  },
  {
    text: 'Du blir stoppet i fartskontroll... Mist M100',
    action: {
      type: 'lose',
      value: 100
    }
  }
]

export default chanceCards