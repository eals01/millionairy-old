import { useBox } from '@react-three/cannon'

export default function House() {
  const [houseRef] = useBox(() => ({
    mass: 1,
    type: 'Static',
    args: [100, 2, 200],
    position: [0, -1.3, 0],
    sleepSpeedLimit: 1,
  }))

  return (
    <mesh ref={houseRef}>
      <boxGeometry args={[100, 2, 200]} />
      <meshPhongMaterial attach='material' color='#806517' />
    </mesh>
  )
}
