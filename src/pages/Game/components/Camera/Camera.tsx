import { LayoutCamera } from 'framer-motion-3d'
import { useEffect, useState } from 'react'
import { Player } from '../../../../types/Player'
import socket from '../../../../socket'

export default function Camera({ view }: { view: string }) {
  const [X, setX] = useState<number | number[]>(21.25 + 10)
  const [Z, setZ] = useState<number | number[]>(-21.25 - 15)
  const [rotateY, setRotateY] = useState<number | number[]>(Math.PI / 1.2)
  const [duration, setDuration] = useState(1)

  useEffect(() => {
    socket.on('movePiece', (lobby) => {
      const spaces = lobby.spaces
      const previousSpaceIndex =
        lobby.players[lobby.currentPlayerIndex].previousSpace
      const targetSpaceIndex =
        lobby.players[lobby.currentPlayerIndex].currentSpace
      const gap =
        targetSpaceIndex > previousSpaceIndex
          ? targetSpaceIndex - previousSpaceIndex
          : Math.abs(previousSpaceIndex - 40) + targetSpaceIndex

      const rotations = [
        Math.PI / 1.2,
        Math.PI / 1.2 - Math.PI / 2,
        Math.PI / 1.2 - Math.PI,
        Math.PI / 1.2 - Math.PI * 1.5,
      ]
      const offsetX = [10, 15, -10, -15]
      const offsetZ = [-15, 10, 15, -10]

      let X = []
      let Z = []
      let rotateY = []
      for (let i = previousSpaceIndex; i <= previousSpaceIndex + gap; i++) {
        const sideNumber = Math.floor((i % 40) / 10)
        const boundaries = spaces[i % 40].boundaries
        X.push(
          (boundaries.start[0] + boundaries.end[0]) / 2 + offsetX[sideNumber]
        )
        Z.push(
          (boundaries.start[2] + boundaries.end[2]) / 2 + offsetZ[sideNumber]
        )
        rotateY.push(rotations[sideNumber])
      }
      setX(X)
      setZ(Z)
      setRotateY(rotateY)
      setDuration(gap / 2)
    })

    return () => {
      socket.off('movePiece')
    }
  }, [])

  function animationComplete() {
    setX(typeof X === 'number' ? X : X[X.length - 1])
    setZ(typeof Z === 'number' ? Z : Z[Z.length - 1])
    setRotateY(
      typeof rotateY === 'number' ? rotateY : rotateY[rotateY.length - 1]
    )
  }

  const cameraViews = [
    {
      name: 'followPlayer',
      X: X,
      Y: 10,
      Z: Z,
      rotateX: 0,
      rotateY: rotateY,
      rotateZ: 0,
      duration: duration,
    },
    {
      name: 'card',
      X: 10,
      Y: 20,
      Z: 0,
      rotateX: 0,
      rotateY: Math.PI / 2,
      rotateZ: 0,
      duration: 2,
    },
    {
      name: 'wheel',
      X: 25,
      Y: 10,
      Z: 20,
      rotateX: 0,
      rotateY: (2 * Math.PI) / -2.5,
      rotateZ: 0,
      duration: 2,
    },
  ]

  const selectedView = cameraViews.find((cameraView) => {
    return cameraView.name === view
  })

  if (!selectedView) return <></>
  return (
    <LayoutCamera
      initial={false}
      animate={{
        x: selectedView.X,
        y: selectedView.Y,
        z: selectedView.Z,
        rotateX: selectedView.rotateX,
        rotateY: selectedView.rotateY,
        rotateZ: selectedView.rotateZ,
      }}
      onAnimationComplete={animationComplete}
      transition={{ type: 'tween', duration: selectedView.duration }}
      fov={90}
      key={undefined}
      view={undefined}
      attach={undefined}
      args={undefined}
      clear={undefined}
      raycast={undefined}
      castShadow={undefined}
      type={undefined}
      name={undefined}
      id={undefined}
      uuid={undefined}
      parent={undefined}
      modelViewMatrix={undefined}
      normalMatrix={undefined}
      matrixWorld={undefined}
      matrixAutoUpdate={undefined}
      matrixWorldNeedsUpdate={undefined}
      visible={undefined}
      receiveShadow={undefined}
      frustumCulled={undefined}
      renderOrder={undefined}
      animations={undefined}
      userData={undefined}
      customDepthMaterial={undefined}
      customDistanceMaterial={undefined}
      isObject3D={undefined}
      onBeforeRender={undefined}
      onAfterRender={undefined}
      applyMatrix4={undefined}
      applyQuaternion={undefined}
      setRotationFromAxisAngle={undefined}
      setRotationFromEuler={undefined}
      setRotationFromMatrix={undefined}
      setRotationFromQuaternion={undefined}
      rotateOnAxis={undefined}
      rotateOnWorldAxis={undefined}
      rotateX={undefined}
      rotateY={undefined}
      rotateZ={undefined}
      translateOnAxis={undefined}
      translateX={undefined}
      translateY={undefined}
      translateZ={undefined}
      localToWorld={undefined}
      worldToLocal={undefined}
      add={undefined}
      remove={undefined}
      removeFromParent={undefined}
      getObjectById={undefined}
      getObjectByName={undefined}
      getObjectByProperty={undefined}
      getWorldPosition={undefined}
      getWorldQuaternion={undefined}
      getWorldScale={undefined}
      getWorldDirection={undefined}
      traverse={undefined}
      traverseVisible={undefined}
      traverseAncestors={undefined}
      updateMatrix={undefined}
      updateMatrixWorld={undefined}
      updateWorldMatrix={undefined}
      toJSON={undefined}
      clone={undefined}
      copy={undefined}
      addEventListener={undefined}
      hasEventListener={undefined}
      removeEventListener={undefined}
      dispatchEvent={undefined}
      matrixWorldInverse={undefined}
      projectionMatrix={undefined}
      projectionMatrixInverse={undefined}
      isCamera={undefined}
      isPerspectiveCamera={undefined}
      zoom={undefined}
      aspect={undefined}
      near={undefined}
      far={undefined}
      focus={undefined}
      filmGauge={undefined}
      filmOffset={undefined}
      setFocalLength={undefined}
      getFocalLength={undefined}
      getEffectiveFOV={undefined}
      getFilmWidth={undefined}
      getFilmHeight={undefined}
      setViewOffset={undefined}
      clearViewOffset={undefined}
      updateProjectionMatrix={undefined}
      setLens={undefined}
    />
  )
}
