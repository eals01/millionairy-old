import { useBox } from '@react-three/cannon'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'
import wood from './wood.jpg'

export default function Table() {
  const texture = useLoader(TextureLoader, wood)

  const [tableRef] = useBox(() => ({
    mass: 1,
    type: 'Static',
    args: [100, 2, 200],
    position: [0, -1.3, 0],
    sleepSpeedLimit: 1,
  }))

  return (
    <mesh ref={tableRef} receiveShadow>
      <boxGeometry args={[100, 2, 200]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
