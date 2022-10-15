import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import model from './Dice.gltf'
import socket from '../../../../socket'

export default function Model({ offset }) {
  const [thrown, setThrown] = useState(false)
  const [checkingForResult, setCheckingForResult] = useState(false)

  const [velocity, setVelocity] = useState([0, 0, 0])
  const [quaternionRotation, setQuaternionRotation] = useState([0, 0, 0, 0])

  useEffect(() => {
    socket.on('diceThrown', (values) => {
      api.position.set(offset, 10, offset)
      api.velocity.set(
        values.velocity[0],
        values.velocity[1],
        values.velocity[2]
      )
      api.rotation.set(
        values.rotation[0],
        values.rotation[1],
        values.rotation[2]
      )
      api.angularVelocity.set(
        values.angularVelocity[0],
        values.angularVelocity[1],
        values.angularVelocity[2]
      )
      setThrown(true)
    })

    return () => {
      socket.off('diceThrown')
    }
  }, [])

  useEffect(() => {
    const unsubscribeVelocity = api.velocity.subscribe((velocity) =>
      setVelocity(velocity)
    )
    const unsubscribeQuaternion = api.quaternion.subscribe((quaternion) =>
      setQuaternionRotation(quaternion)
    )
    return () => {
      unsubscribeVelocity()
      unsubscribeQuaternion()
    }
  }, [])

  function throwDice() {
    socket.emit('throwDice')
    setThrown(true)
  }

  useEffect(() => {
    if (thrown) {
      const timeBeforeCheckingForResult = 100
      setTimeout(() => {
        setCheckingForResult(true)
      }, timeBeforeCheckingForResult)
    }
  }, [thrown])

  useFrame(() => {
    if (thrown && checkingForResult) {
      let stopped =
        Math.abs(velocity[0]) + Math.abs(velocity[1]) + Math.abs(velocity[2]) <
        0.01
      if (stopped) {
        setThrown(false)
        setCheckingForResult(false)
        socket.emit('emitDiceResult', getResult())
      }
    }
  })

  function getResult() {
    let vectors = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(-1, 0, 0),
    ]

    const quaternion = new THREE.Quaternion(
      quaternionRotation[0],
      quaternionRotation[1],
      quaternionRotation[2],
      quaternionRotation[3]
    )

    for (const vector of vectors) {
      vector.applyQuaternion(quaternion)
    }

    let highestVector = vectors[0]
    for (const vector of vectors) {
      if (vector.y > highestVector.y) {
        highestVector = vector
      }
    }
    return vectors.indexOf(highestVector) + 1
  }

  const [diceRef, api] = useBox(() => ({
    mass: 1,
    type: 'Dynamic',
    args: [2, 2, 2],
    position: [offset, 1, offset],
    sleepSpeedLimit: 0,
  }))

  const { nodes, materials } = useGLTF(model)
  return (
    <mesh
      ref={diceRef}
      onClick={throwDice}
      geometry={nodes.Dice.geometry}
      material={materials.Material}
    />
  )
}

useGLTF.preload(model)
