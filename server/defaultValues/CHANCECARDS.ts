import { ChanceCard } from "../../types/ChanceCard";

const chanceCards: ChanceCard[] = [
  {
    text: "Marius er i det gavmilde hjørnet... Motta M100",
    action: {
      type: "receive",
      value: 100,
    },
  },
  {
    text: "Du blir stoppet i fartskontroll... Mist M50",
    action: {
      type: "lose",
      value: 50,
    },
  },
  {
    text: "Du realiserer aksjer med stor gevinst! Motta M200",
    action: {
      type: "receive",
      value: 200,
    },
  },
  {
    text: "Baksmell på skatten... Betal M50",
    action: {
      type: "lose",
      value: 50,
    },
  },
  {
    text: "Du bestemmer deg for å reise til varmere strøk. Rykk fram til Hawaii! Du mottar M200 hvis du passerer start",
    action: {
      type: "move",
      value: 21,
    },
  },
];

export default chanceCards;

// betal til en spiller du velger selv

// betal skatt prosentvis
