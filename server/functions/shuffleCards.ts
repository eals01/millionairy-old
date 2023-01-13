import { ChanceCard } from '../../types/ChanceCard'

export default function shuffleCards(cards: ChanceCard[]) {
  return cards.sort(() => Math.random() - 0.5)
}
