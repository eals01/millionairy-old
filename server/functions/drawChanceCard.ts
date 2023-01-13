import deepClone from 'deep-clone'
import chanceCards from '../defaultValues/chanceCards'
import shuffleCards from './shuffleCards'
import { ChanceCard } from '../../types/ChanceCard'
import { Lobby } from '../../types/Lobby'

export default function drawChanceCard(lobby: Lobby): ChanceCard {
  if (lobby.chanceCards.length === 0) {
    lobby.chanceCards = shuffleCards(deepClone(chanceCards))
  }
  return lobby.chanceCards.pop()!
}
