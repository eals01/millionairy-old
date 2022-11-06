import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'

export default function Money({ position, face }) {
  const texture = useLoader(TextureLoader, face)

  return (
    <motion.mesh
      castShadow
      initial={{
        x: position[0],
        y: 20 + position[1],
        z: position[2],
        opacity: 0,
      }}
      animate={{
        x: position[0],
        y: position[1],
        z: position[2],
        opacity: 1,
      }}
      exit={{
        x: position[0],
        y: 20 + position[1],
        z: position[2],
        opacity: 0,
      }}
      transition={{ duration: 0.75 + position[1] / 10 }}
    >
      <boxGeometry args={[10, 0.05, 5]} />
      <meshStandardMaterial map={texture} />
    </motion.mesh>
  )
}
