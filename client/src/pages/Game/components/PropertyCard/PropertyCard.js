import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

export default function PropertyCard({ position, face }) {
  const texture = useLoader(THREE.TextureLoader, face)

  return (
    <mesh position={position} rotation={[0, -Math.PI / 2, 0]}>
      <boxGeometry args={[5, 0.05, 8]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
