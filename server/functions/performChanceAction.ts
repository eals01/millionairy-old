import { ChanceCard } from '../../types/ChanceCard'
import { Player } from '../../types/Player'

export default function performChanceAction(card: ChanceCard, player: Player) {
  switch (card.action.type) {
    case 'receive':
      player.money += card.action.value
      break
    case 'lose':
      player.money -= card.action.value
      break
  }
}
