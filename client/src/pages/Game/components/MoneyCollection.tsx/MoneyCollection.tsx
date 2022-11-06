import { Player } from '../../../../../../types/Player'
import Money from '../Money/Money'
import textures from '../Money/faces/faces'
import { AnimatePresence } from 'framer-motion'

function calculateBillCounts(money: number) {
  const fiveHundreds = Math.floor(money / 500)
  const hundreds = Math.floor((money % 500) / 100)
  const tens = Math.floor((money % 100) / 10)
  const ones = Math.floor(money % 10)
  return [ones, tens, hundreds, fiveHundreds]
}

export default function MoneyCollection({
  position,
  money,
}: {
  position: number[]
  money: number
}) {
  return (
    <group>
      <AnimatePresence>
        {calculateBillCounts(money).map((billCount, billCountIndex) => {
          return [...Array(billCount)].map((__, billIndex) => {
            return (
              <Money
                key={
                  'bill' +
                  billCountIndex +
                  billIndex +
                  position[0] +
                  position[2]
                }
                face={textures[billCountIndex]}
                position={[31, billIndex / 5, -billCountIndex * 6 - 4.5]}
              />
            )
          })
        })}
      </AnimatePresence>
    </group>
  )
}
