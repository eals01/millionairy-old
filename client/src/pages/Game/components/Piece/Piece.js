import { motion } from 'framer-motion-3d'
import { useEffect, useState } from 'react'
import socket from '../../../../socket'

export default function Piece({ player, players, spaces }) {
  const [previousSpace, setPreviousSpace] = useState(0)
  const [keyFrames, setKeyFrames] = useState([
    [positionPiece(0)[0]],
    [1],
    [positionPiece(0)[2]],
  ])
  const [duration, setDuration] = useState(1)

  function positionPiece(spaceNumber) {
    let sharesSpaceWith = spaceNumber === player.currentSpace ? 0 : 1
    for (const otherPlayer of players) {
      if (spaceNumber == otherPlayer.currentSpace) {
        sharesSpaceWith++
      }
    }
    if (sharesSpaceWith > 1) sharesSpaceWith++

    let playerNumberOnSpace = 0
    for (const otherPlayer of players) {
      if (player === otherPlayer) break
      if (spaceNumber == otherPlayer.currentSpace) {
        playerNumberOnSpace++
      }
    }

    const boundaries = spaces[spaceNumber].boundaries
    const boundaryWidth = boundaries.start[0] - boundaries.end[0]
    const boundaryHeight = boundaries.start[2] - boundaries.end[2]

    return [
      boundaries.start[0] -
        (boundaryWidth / (sharesSpaceWith + 1)) * (playerNumberOnSpace + 1),
      1,
      boundaries.start[2] -
        (boundaryHeight / (sharesSpaceWith + 1)) * (playerNumberOnSpace + 1),
    ]
  }

  useEffect(() => {
    if (previousSpace !== player.currentSpace) {
      const gap =
        player.currentSpace > previousSpace
          ? player.currentSpace - previousSpace
          : Math.abs(previousSpace - 40) + player.currentSpace
      let keyFrames = [[], [], []]
      keyFrames[1].push(positionPiece(player.currentSpace)[0] / 10000 + 1)
      for (
        let spaceNumber = previousSpace;
        spaceNumber % 40 != player.currentSpace + 1;
        spaceNumber++
      ) {
        keyFrames[0].push(positionPiece(spaceNumber % 40)[0])
        keyFrames[1].push(3, 1)
        keyFrames[2].push(positionPiece(spaceNumber % 40)[2])
      }
      keyFrames[1].pop()
      keyFrames[1].pop()
      setDuration(gap / 2)
      setKeyFrames(keyFrames)
      console.log(keyFrames)
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
