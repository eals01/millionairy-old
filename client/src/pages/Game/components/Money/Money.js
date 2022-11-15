import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'

export default function Money({ position, face, rotation }) {
  const texture = useLoader(TextureLoader, face)

  return (
    <motion.mesh
      castShadow
      initial={{
        x: position[0],
        y: 60 + position[1],
        z: position[2],
      }}
      animate={{
        x: position[0],
        y: position[1],
        z: position[2],
        rotateY: rotation,
      }}
      exit={{
        x: position[0],
        y: 60 + position[1],
        z: position[2],
      }}
      transition={{ duration: 0.75 + position[1] / 10, type: 'tween' }}
    >
      <boxGeometry args={[10, 0.05, 5]} />
      <meshStandardMaterial map={texture} />
    </motion.mesh>
  )
}
