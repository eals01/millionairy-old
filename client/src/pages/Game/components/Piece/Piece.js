import { useCylinder } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'

const SPACES = [
  {
    position: { x: 22, z: -22 },
  },
  {
    position: { x: 22, z: -16 },
  },
  {
    position: { x: 22, z: -12 },
  },
  {
    position: { x: 22, z: -8 },
  },
  {
    position: { x: 22, z: -4 },
  },
  {
    position: { x: 22, z: 0 },
  },
  {
    position: { x: 22, z: 4 },
  },
  {
    position: { x: 22, z: 8 },
  },
  {
    position: { x: 22, z: 12 },
  },
  {
    position: { x: 22, z: 16 },
  },
  {
    position: { x: 22, z: 22 },
  },
  {
    position: { x: 16, z: 22 },
  },
  {
    position: { x: 12, z: 22 },
  },
  {
    position: { x: 8, z: 22 },
  },
  {
    position: { x: 4, z: 22 },
  },
  {
    position: { x: 0, z: 22 },
  },
  {
    position: { x: -4, z: 22 },
  },
  {
    position: { x: -8, z: 22 },
  },
  {
    position: { x: -12, z: 22 },
  },
  {
    position: { x: -16, z: 22 },
  },
  {
    position: { x: -22, z: 22 },
  },
  {
    position: { x: -22, z: 16 },
  },
  {
    position: { x: -22, z: 12 },
  },
  {
    position: { x: -22, z: 8 },
  },
  {
    position: { x: -22, z: 4 },
  },
  {
    position: { x: -22, z: 0 },
  },
  {
    position: { x: -22, z: -4 },
  },
  {
    position: { x: -22, z: -8 },
  },
  {
    position: { x: -22, z: -12 },
  },
  {
    position: { x: -22, z: -16 },
  },
  {
    position: { x: -22, z: -22 },
  },
  {
    position: { x: -16, z: -22 },
  },
  {
    position: { x: -12, z: -22 },
  },
  {
    position: { x: -8, z: -22 },
  },
  {
    position: { x: -4, z: -22 },
  },
  {
    position: { x: 0, z: -22 },
  },
  {
    position: { x: 4, z: -22 },
  },
  {
    position: { x: 8, z: -22 },
  },
  {
    position: { x: 12, z: -22 },
  },
  {
    position: { x: 16, z: -22 },
  },
]

export default function Piece({ player, offset }) {
  const [pieceRef, api] = useCylinder(() => ({
    mass: 0,
    type: 'Dynamic',
    args: [0.75, 0.75, 2],
    position: [
      SPACES[player.currentSpace].position.x,
      1 + offset,
      SPACES[player.currentSpace].position.z,
    ],
    sleepSpeedLimit: 1,
  }))

  useFrame(() => {
    api.position.set(
      SPACES[player.currentSpace].position.x,
      1 + offset * 3,
      SPACES[player.currentSpace].position.z
    )
  })

  return (
    <mesh ref={pieceRef}>
      <cylinderGeometry args={[0.75, 0.75, 2]} />
      <meshPhysicalMaterial color={player.color} />
    </mesh>
  )
}
