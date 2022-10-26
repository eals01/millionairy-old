import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

export default function Chance({ height, offsetZ, color, face }) {
  const texture = useLoader(THREE.TextureLoader, face)

  return (
    <mesh position={[-2, -0.15 + height / 15, 27 + offsetZ]}>
      <boxGeometry args={[10, 0.05, 5]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
