import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'

export default function Money({ position, rotation, face }) {
  const texture = useLoader(TextureLoader, face)

  return (
    <motion.mesh
      castShadow
      animate={{
        x: [null, position[0]],
        y: [null, 15 + position[0] / 100 + position[1] * 10 + 5, position[1]],
        z: [null, position[2]],
        rotateX: rotation[0],
        rotateY: rotation[1],
        rotateZ: rotation[2],
      }}
      transition={{ duration: 3 }}
    >
      <boxGeometry args={[10, 0.05, 5]} />
      <meshStandardMaterial map={texture} />
    </motion.mesh>
  )
}
