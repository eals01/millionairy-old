import { useBox } from '@react-three/cannon'

export default function PropertyCard({ offsetX, offsetY, offsetZ }) {
  const [chanceRef] = useBox(() => ({
    mass: 1,
    type: 'Dynamic',
    args: [8, 0.05, 5],
    position: [30 + offsetX, 1 + offsetY, 22.5 + offsetZ],
    sleepSpeedLimit: 1,
  }))

  return (
    <mesh ref={chanceRef}>
      <boxGeometry args={[8, 0.05, 5]} />
      <meshPhongMaterial attach='material' color='white' />
    </mesh>
  )
}
