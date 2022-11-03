import { Player } from '../../../../../../types/Player'
import Money from '../Money/Money'
import textures from '../Money/faces/faces'

const moneyColors = ['lightgreen', 'yellow', 'orange', 'teal']

export default function MoneyCollection({
  bank,
  players,
}: {
  bank: { value: string; ownerIndex: number }[][]
  players: Player[]
}) {
  console.log(bank)
  return (
    <>
      {bank.map((bills, billsIndex) => {
        return bills.map((bill, billIndex) => {
          const valueIndex = [
            'ones',
            'tens',
            'hundreds',
            'fivehundreds',
          ].indexOf(bill.value)

          const playersBills = bills.filter(
            (otherBill) => otherBill.ownerIndex === bill.ownerIndex
          )
          const offsetY = playersBills.length - 1 - playersBills.indexOf(bill)

          const playerPositions =
            players.length === 2
              ? [
                  {
                    position: [29, -0.15, -22.5],
                    rotation: [0, Math.PI, 0],
                    offset: [],
                  },
                  {
                    position: [-29, -0.15, -22.5],
                    rotation: [0, 0, 0],
                    offset: [],
                  },
                ]
              : [
                  {
                    position: [31, -0.15, -22.5],
                    rotation: [0, Math.PI, 0],
                    offset: [0, offsetY / 10, 18 - valueIndex * 6],
                  },
                  {
                    position: [-22.5, -0.15, 29],
                    rotation: [0, Math.PI / 2, 0],
                    offset: [],
                  },
                  {
                    position: [-29, -0.15, -22.5],
                    rotation: [0, 0, 0],
                    offset: [],
                  },
                  {
                    position: [22.5, -0.15, -29],
                    rotation: [0, -Math.PI / 2, 0],
                    offset: [],
                  },
                ]

          const playerPosition = playerPositions[bill.ownerIndex]

          return (
            <Money
              key={billsIndex + ' ' + billIndex}
              face={textures[billsIndex]}
              position={
                playerPosition === undefined
                  ? [5, -0.15 + billIndex / 20, 53 - billsIndex * 6]
                  : [
                      playerPosition.position[0],
                      -0.15 + playerPosition.offset[1],
                      playerPosition.position[2] + playerPosition.offset[2],
                    ]
              }
              rotation={[]}
            />
          )
        })
      })}
    </>
  )
}
