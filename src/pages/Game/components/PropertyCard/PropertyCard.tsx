import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader } from '@react-three/fiber'
import { motion } from 'framer-motion-3d'
import { useState, useEffect } from 'react'

export default function PropertyCard({
  position,
  face,
  rotation,
}: {
  position: number[]
  face: string
  rotation: number[]
}) {
  const texture = useLoader(TextureLoader, face)

  const [shouldAnimate, setShouldAnimate] = useState(true)
  const [oldPosition, setOldPosition] = useState([0, 0, 0])

  useEffect(() => {
    if (position[0] === oldPosition[0] && position[2] === oldPosition[2]) {
      setShouldAnimate(false)
    } else {
      setShouldAnimate(true)
      setOldPosition(position)
    }
  })

  return (
    <motion.mesh
      castShadow
      initial={false}
      animate={
        shouldAnimate && {
          x: [null, position[0]],
          y: [null, 50, position[1]],
          z: [null, position[2]],
          rotateX: [null, rotation[0]],
          rotateY: [null, rotation[1]],
          rotateZ: [null, rotation[2]],
        }
      }
      transition={{ duration: 1.5 }}
    >
      <boxGeometry args={[5, 0.05, 8]} />
      <meshStandardMaterial map={texture} />
    </motion.mesh>
  )
}
