import { AnimatePresence } from 'framer-motion'
import CurrencyBill from '../CurrencyBill/CurrencyBill'
import textures from '../CurrencyBill/faces/faces'

function calculateBillCounts(money: number) {
  const fiveHundreds = Math.floor(money / 500)
  const hundreds = Math.floor((money % 500) / 100)
  const tens = Math.floor((money % 100) / 10)
  const ones = Math.floor(money % 10)
  return [ones, tens, hundreds, fiveHundreds]
}

const cardRotations = [
  -0.0035, -0.0364, -0.0244, -0.0261, 0.0387, -0.0492, -0.0486, -0.0295, 0.0355,
  0.0174, -0.0029, 0.01455, -0.0264, 0.0309, -0.0002, 0.0321, 0.0259, 0.01,
  0.0201, -0.0346, -0.034, 0.0269, -0.0104, -0.0226, 0.0478, 0.0206, -0.0372,
  -0.0231, -0.0176, 0.0328,
]

export default function CurrencyBills({
  position,
  rotation,
  money,
}: {
  position: number[]
  rotation: number
  money: number
}) {
  return (
    <group rotation={[0, rotation, 0]}>
      <AnimatePresence>
        {calculateBillCounts(money).map((billCount, billCountIndex) => {
          return [...Array(billCount)].map((__, billIndex) => {
            return (
              <CurrencyBill
                key={
                  'bill' +
                  billCountIndex +
                  billIndex +
                  position[0] +
                  position[2]
                }
                face={textures[billCountIndex]}
                position={[
                  position[0],
                  billIndex / 10,
                  -billCountIndex * 6 - position[2],
                ]}
                rotation={cardRotations[billIndex % 9]}
              />
            )
          })
        })}
      </AnimatePresence>
    </group>
  )
}
