import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'

export default function PropertyCard({ position, face, rotation }) {
  const texture = useLoader(THREE.TextureLoader, face)

  return (
    <motion.mesh
      initial={false}
      animate={{
        x: [null, position[0]],
        y: [position[0] / 100, 50, position[1]],
        z: [null, position[2]],
        rotateY: [null, rotation[1]],
      }}
      transition={{ duration: 2 }}
    >
      <boxGeometry args={[5, 0.05, 8]} />
      <meshStandardMaterial map={texture} />
    </motion.mesh>
  )
}
