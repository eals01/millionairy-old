import { Space } from '../../../../../../types/Space'
import Money from '../Money/Money'
import PropertyCard from '../PropertyCard/PropertyCard'
import faces from '../PropertyCard/faces/faces'
import textures from '../Money/faces/faces'

export default function CardCollection({
  spaces,
  position,
  rotation,
  currencies,
}: {
  spaces: Space[]
  position: number[]
  rotation: number[]
  currencies: number[]
}) {
  const moneyColors = ['lightgreen', 'yellow', 'orange', 'teal']

  return (
    <group position={position} rotation={rotation}>
      {spaces.map((space) => {
        if (space.column > -1) {
          return (
            <PropertyCard
              key={'space' + space.id}
              position={[
                -space.streetNumber * 1 + (space.column < 5 ? 0 : -10.5),
                space.streetNumber / 20,
                (space.column % 5) * 5.2,
              ]}
              face={faces[space.propertyNumber]}
            />
          )
        }
      })}
      {[...Array(4)].map((_, columnIndex) =>
        [...Array(currencies[columnIndex])].map((_, index) => (
          <Money
            key={columnIndex + index + 'm'}
            height={index * 1}
            offsetZ={columnIndex * 6}
            color={moneyColors[columnIndex]}
            face={textures[columnIndex]}
          />
        ))
      )}
    </group>
  )
}
