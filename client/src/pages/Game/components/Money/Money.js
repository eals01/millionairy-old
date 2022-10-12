import { useBox } from '@react-three/cannon'

export default function Chance({ height, offsetZ }) {
  const [chanceRef] = useBox(() => ({
    mass: 1,
    type: 'Dynamic',
    args: [10, 0.1, 5],
    position: [31, 1 + height, -22.5 + offsetZ],
    sleepSpeedLimit: 1,
  }))

  return (
    <mesh ref={chanceRef}>
      <boxGeometry args={[10, 0.05, 5]} />
      <meshPhongMaterial attach='material' color='green' />
    </mesh>
  )
}
