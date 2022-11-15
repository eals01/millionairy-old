import { motion } from 'framer-motion-3d'
import { useEffect, useState } from 'react'
import { Player } from '../../../../../../types/Player'
import { Space } from '../../../../../../types/Space'
import socket from '../../../../socket'

export default function Piece({
  player,
  players,
  spaces,
}: {
  player: Player
  players: Player[]
  spaces: Space[]
}) {
  const [previousSpace, setPreviousSpace] = useState(0)
  const [keyFrames, setKeyFrames] = useState<number[][]>([
    [positionPiece(0)[0]],
    [1],
    [positionPiece(0)[2]],
  ])
  const [duration, setDuration] = useState(1)

  function positionPiece(spaceNumber: number) {
    let countOfOtherPlayersOnSpace = 0
    for (const otherPlayer of players) {
      if (spaceNumber == otherPlayer.currentSpace && otherPlayer !== player) {
        countOfOtherPlayersOnSpace++
      }
    }

    let playersNumberOnSpace = 0
    for (const otherPlayer of players) {
      if (player === otherPlayer) break
      if (player.currentSpace === otherPlayer.currentSpace) {
        playersNumberOnSpace++
      }
    }

    const boundaries = spaces[spaceNumber].boundaries
    const boundaryWidth = boundaries.start[0] - boundaries.end[0]
    const boundaryHeight = boundaries.start[2] - boundaries.end[2]

    return [
      boundaries.start[0] -
        (boundaryWidth / (countOfOtherPlayersOnSpace + 2)) *
          (playersNumberOnSpace + 1),
      1,
      boundaries.start[2] -
        (boundaryHeight / (countOfOtherPlayersOnSpace + 2)) *
          (playersNumberOnSpace + 1),
    ]
  }

  useEffect(() => {
    if (previousSpace !== player.currentSpace) {
      const gap =
        player.currentSpace > previousSpace
          ? player.currentSpace - previousSpace
          : Math.abs(previousSpace - 40) + player.currentSpace
      let keyFrames: number[][] = [[], [], []]
      keyFrames[1].push(Math.random() / 100 + 1)
      for (
        let spaceNumber = previousSpace;
        spaceNumber % 40 != player.currentSpace + 1;
        spaceNumber++
      ) {
        const intermediateSpacePosition = positionPiece(spaceNumber % 40)
        keyFrames[0].push(intermediateSpacePosition[0])
        keyFrames[1].push(3, 1)
        keyFrames[2].push(intermediateSpacePosition[2])
      }
      keyFrames[0][0] = positionPiece(previousSpace)[0]
      keyFrames[2][0] = positionPiece(previousSpace)[2]
      keyFrames[1].splice(keyFrames.length - 2, 2)
      setDuration(gap / 2)
      setKeyFrames(keyFrames)
    }

    setPreviousSpace(player.currentSpace)
  }, [player])

  function finishedMoving() {
    if (previousSpace === 0 && player.currentSpace === 0) return
    socket.emit('finishedMoving')
  }

  return (
    <motion.mesh
      castShadow
      initial={false}
      animate={{
        x: [...keyFrames[0]],
        y: [...keyFrames[1]],
        z: [...keyFrames[2]],
      }}
      transition={{ duration: duration, type: 'tween' }}
      onAnimationComplete={finishedMoving}
    >
      <cylinderGeometry args={[0.6, 0.6, 2]} />
      <meshPhysicalMaterial color={player.color} />
    </motion.mesh>
  )
}
