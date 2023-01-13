import { useBox } from '@react-three/cannon'

export default function Chance({ height }) {
  const [chanceRef] = useBox(() => ({
    mass: 50,
    type: 'Dynamic',
    args: [8, 0.1, 5],
    position: [-9.9, height, 9.9],
    rotation: [0, -Math.PI / 4, 0],
    sleepSpeedLimit: 1,
  }))

  return (
    <mesh castShadow ref={chanceRef}>
      <boxGeometry args={[8, 0.05, 5]} />
      <meshPhongMaterial attach='material' color='orange' />
    </mesh>
  )
}
