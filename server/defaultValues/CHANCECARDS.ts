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
    text: 'Du blir stoppet i fartskontroll... Mist M50',
    action: {
      type: 'lose',
      value: 50
    }
  },
  {
    text: 'Du realiserer aksjer med stor gevinst! Motta M200',
    action: {
      type: 'receive',
      value: 200
    }
  },
  {
    text: 'Baksmell på skatten... Betal M50',
    action: {
      type: 'lose',
      value: 50
    }
  }
]

export default chanceCards
