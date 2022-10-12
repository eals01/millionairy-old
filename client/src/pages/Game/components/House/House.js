import { useBox } from '@react-three/cannon'

export default function House({ color }) {
  const [houseRef] = useBox(() => ({
    mass: 1,
    type: 'Dynamic',
    args: [1, 1, 1.5],
    position: [18.75, 3, -15],
    sleepSpeedLimit: 1,
  }))

  return (
    <mesh ref={houseRef}>
      <boxGeometry args={[1, 1, 1.5]} />
      <meshPhongMaterial attach='material' color={color} />
    </mesh>
  )
}
