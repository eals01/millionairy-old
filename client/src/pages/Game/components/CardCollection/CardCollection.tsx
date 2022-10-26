import { Space } from '../../../../../../types/Space'
import PropertyCard from '../PropertyCard/PropertyCard'

export default function CardCollection({
  spaces,
  position,
}: {
  spaces: Space[]
  position: number[]
}) {
  return (
    <group position={position} rotation={[0, Math.PI, 0]}>
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
            />
          )
        }
      })}
    </group>
  )
}
