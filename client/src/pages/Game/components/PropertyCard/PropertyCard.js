import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import face from './faces/face1.png'

export default function PropertyCard({ position }) {
  const texture = useLoader(THREE.TextureLoader, face)

  return (
    <mesh position={position} rotation={[0, -Math.PI / 2, 0]}>
      <boxGeometry args={[5, 0.05, 8]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
