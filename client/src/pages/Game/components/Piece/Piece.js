import { useCylinder } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'

export default function Piece({ player, position, offset }) {
  const [pieceRef, api] = useCylinder(() => ({
    mass: 0,
    type: 'Dynamic',
    args: [0.75, 0.75, 2],
    // position: position,
    position: [0, 0, 0],
    sleepSpeedLimit: 1,
  }))

  useFrame(() => {
    console.log(position)
    api.position.set(position[0], position[1], position[2])
  })

  return (
    <mesh ref={pieceRef}>
      <cylinderGeometry args={[0.75, 0.75, 2]} />
      <meshPhysicalMaterial color={player.color} />
    </mesh>
  )
}
