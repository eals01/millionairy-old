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

const moneyRotations = [
  -0.0035542148185325126, -0.03649812891558371, -0.024480735271521527,
  -0.02618536505838063, 0.03877931381088148, -0.0492274538476708,
  -0.048619116786601003, -0.029501423703322052, 0.0355168572214577,
  0.01748988937251446, -0.0029386513720251195, 0.014555042329934209,
  -0.026469756615503905, 0.030955616676023978, -0.00020040811522950563,
  0.03211633425455693, 0.025902097626396572, 0.010045558671036042,
  0.020145820473164905, -0.034688376770824994, -0.034057310389452124,
  0.02693470469993786, -0.010462921434977207, -0.022691227301098363,
  0.04789473834722248, 0.02061132247159911, -0.037225026687600526,
  -0.023119642554974475, -0.01764107687868717, 0.03283278653610845,
]

export default function MoneyCollection({
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
              <Money
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
                rotation={moneyRotations[billIndex % 9]}
              />
            )
          })
        })}
      </AnimatePresence>
    </group>
  )
}
