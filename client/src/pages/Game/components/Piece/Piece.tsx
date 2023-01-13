import { motion } from 'framer-motion-3d'
import { useEffect, useState } from 'react'
import { Player } from '../../../../../../types/Player'
import { Space } from '../../../../../../types/Space'
import socket from '../../../../socket'

export default function Piece({
  player,
  spaces,
}: {
  player: Player
  spaces: Space[]
}) {
  const [duration, setDuration] = useState(1)
  const [previousSpace, setPreviousSpace] = useState(0)
  const [keyFrames, setKeyFrames] = useState<(number | null)[][]>([
    [positionPiece(0)[0]],
    [1],
    [positionPiece(0)[1]],
  ])

  function calculatePosition(space: Space, positionNumber: number) {
    const start = space.boundaries.start
    const end = space.boundaries.end

    switch (positionNumber) {
      case 0:
        return [
          start[0] + (end[0] - start[0]) / 3,
          start[2] + (end[2] - start[2]) / 5,
        ]

      case 2:
        return [
          start[0] + (end[0] - start[0]) / 3,
          start[2] + (3 * (end[2] - start[2])) / 5,
        ]

      case 1:
        return [
          start[0] + (2 * (end[0] - start[0])) / 3,
          start[2] + (2 * (end[2] - start[2])) / 5,
        ]

      case 3:
        return [
          start[0] + (2 * (end[0] - start[0])) / 3,
          start[2] + (4 * (end[2] - start[2])) / 5,
        ]

      default:
        return [
          start[0] + (end[0] - start[0]) / 2,
          start[2] + (end[2] - start[2]) / 2,
        ]
    }
  }

  function positionPiece(spaceNumber: number) {
    const space = spaces[spaceNumber]

    let availableIndex = -1
    space.playersOnSpace.find((space, index: number) => {
      availableIndex = index
      return space === null || space.id === player.id
    })
    return calculatePosition(space, availableIndex)
  }

  useEffect(() => {
    const targetSpace = player.currentSpace

    if (previousSpace !== targetSpace) {
      const gap =
        targetSpace > previousSpace
          ? targetSpace - previousSpace
          : Math.abs(previousSpace - 40) + targetSpace
      let keyFrames: (number | null)[][] = [[], [], []]
      keyFrames[1].push(Math.random() / 100 + 1)

      for (
        let spaceNumber = previousSpace;
        spaceNumber <= previousSpace + gap;
        spaceNumber++
      ) {
        const intermediateSpacePosition = positionPiece(spaceNumber % 40)
        keyFrames[0].push(intermediateSpacePosition[0])
        keyFrames[1].push(3, 1)
        keyFrames[2].push(intermediateSpacePosition[1])
      }

      keyFrames[0][0] = null
      keyFrames[2][0] = null
      keyFrames[1].splice(keyFrames.length - 2, 2)

      setDuration(gap / 2)
      setKeyFrames(keyFrames)
    }

    setPreviousSpace(targetSpace)
  }, [player.currentSpace])

  console.log(keyFrames)

  return (
    <motion.mesh
      castShadow
      initial={false}
      // bruh
      // @ts-ignore
      animate={{
        x: keyFrames[0],
        y: keyFrames[1],
        z: keyFrames[2],
      }}
      transition={{ duration: duration, type: 'tween' }}
      onAnimationComplete={() => {
        socket.emit('finishedMoving')
      }}
    >
      <cylinderGeometry args={[0.6, 0.6, 2]} />
      <meshPhysicalMaterial color={player.color} />
    </motion.mesh>
  )
}
