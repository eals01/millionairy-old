import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import model from './Dice.gltf'

export default function Model({
  offset,
  factors,
  diceThrown,
  setDiceThrown,
  throwDie,
  setResult,
}) {
  const [thrown, setThrown] = useState(false)
  const [checkingForResult, setCheckingForResult] = useState(false)

  const [velocity, setVelocity] = useState([0, 0, 0])
  const [quaternionRotation, setQuaternionRotation] = useState([0, 0, 0, 0])
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

  useEffect(() => {
    if (diceThrown) {
      throwDice()
      setDiceThrown(false)
    }
  }, [diceThrown])

  function throwDice() {
    api.position.set(offset, 15, offset)
    api.angularVelocity.set(factors[0], factors[1], factors[2])
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
        setResult(getResult())
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
      onClick={throwDie}
      geometry={nodes.Dice.geometry}
      material={materials.Material}
    />
  )
}

useGLTF.preload(model)
