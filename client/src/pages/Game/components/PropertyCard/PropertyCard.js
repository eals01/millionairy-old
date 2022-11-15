import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'

export default function PropertyCard({ position, face, rotation }) {
  const texture = useLoader(TextureLoader, face)

  return (
    <motion.mesh
      castShadow
      initial={false}
      animate={{
        x: [null, position[0]],
        y: [null, 50 + position[0] / 100, position[1]],
        z: [null, position[2]],
        rotateX: [null, rotation[0]],
        rotateY: [null, rotation[1]],
        rotateZ: [null, rotation[2]],
      }}
      transition={{ duration: 1.5 }}
    >
      <boxGeometry args={[5, 0.05, 8]} />
      <meshStandardMaterial map={texture} />
    </motion.mesh>
  )
}
