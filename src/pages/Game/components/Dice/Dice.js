import { Vector3, Quaternion } from 'three'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import model from './Dice.gltf'
import socket from '../../../../socket'

export default function Model({ offset }) {
  const [yourTurn, setYourTurn] = useState(true)
  const [turnEndable, setTurnEndable] = useState(false)

  const [thrown, setThrown] = useState(false)
  const [checkingForResult, setCheckingForResult] = useState(false)

  const [velocity, setVelocity] = useState([0, 0, 0])
  const [quaternionRotation, setQuaternionRotation] = useState([0, 0, 0, 0])

  useEffect(() => {
    socket.on('turnEndable', () => {
      setTurnEndable(true)
    })

    socket.on('diceThrown', (values) => {
      setThrown(true)
      api.position.set(0, 0, 0)
      api.position.set(offset, 10, offset)
      api.velocity.set(
        values.velocity[0 + offset],
        values.velocity[1 + offset],
        values.velocity[2 + offset]
      )
      api.rotation.set(
        values.rotation[0 + offset],
        values.rotation[1 + offset],
        values.rotation[2 + offset]
      )
      api.angularVelocity.set(
        values.angularVelocity[0 + offset],
        values.angularVelocity[1 + offset],
        values.angularVelocity[2 + offset]
      )
    })

    return () => {
      socket.off('updateLobby')
      socket.off('turnEndable')
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

  const timeBeforeCheckingForResult = 100
  useEffect(() => {
    if (thrown) {
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
        if (yourTurn && !turnEndable) socket.emit('emitDiceResult', getResult())
      }
    }
  })

  function throwDice() {
    if (yourTurn && !turnEndable && !checkingForResult) {
      socket.emit('throwDice')
    }
  }

  function getResult() {
    let vectors = [
      new Vector3(1, 0, 0),
      new Vector3(0, 0, -1),
      new Vector3(0, 1, 0),
      new Vector3(0, -1, 0),
      new Vector3(0, 0, 1),
      new Vector3(-1, 0, 0),
    ]

    const quaternion = new Quaternion(
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
      castShadow
    />
  )
}

useGLTF.preload(model)
