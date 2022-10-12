import { useState, useEffect } from 'react'
import { useCylinder } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'

const SPACES = [
  {
    position: { x: 22, z: -22 },
  },
  {
    position: { x: 22, z: -16 },
  },
  {
    position: { x: 22, z: -12 },
  },
  {
    position: { x: 22, z: -8 },
  },
  {
    position: { x: 22, z: -4 },
  },
  {
    position: { x: 22, z: 0 },
  },
  {
    position: { x: 22, z: 4 },
  },
  {
    position: { x: 22, z: 8 },
  },
  {
    position: { x: 22, z: 12 },
  },
  {
    position: { x: 22, z: 16 },
  },
  {
    position: { x: 22, z: 22 },
  },
  {
    position: { x: 16, z: 22 },
  },
  {
    position: { x: 12, z: 22 },
  },
  {
    position: { x: 8, z: 22 },
  },
  {
    position: { x: 4, z: 22 },
  },
  {
    position: { x: 0, z: 22 },
  },
  {
    position: { x: -4, z: 22 },
  },
  {
    position: { x: -8, z: 22 },
  },
  {
    position: { x: -12, z: 22 },
  },
  {
    position: { x: -16, z: 22 },
  },
  {
    position: { x: -22, z: 22 },
  },
  {
    position: { x: -22, z: 16 },
  },
  {
    position: { x: -22, z: 12 },
  },
  {
    position: { x: -22, z: 8 },
  },
  {
    position: { x: -22, z: 4 },
  },
  {
    position: { x: -22, z: 0 },
  },
  {
    position: { x: -22, z: -4 },
  },
  {
    position: { x: -22, z: -8 },
  },
  {
    position: { x: -22, z: -12 },
  },
  {
    position: { x: -22, z: -16 },
  },
  {
    position: { x: -22, z: -22 },
  },
  {
    position: { x: -16, z: -22 },
  },
  {
    position: { x: -12, z: -22 },
  },
  {
    position: { x: -8, z: -22 },
  },
  {
    position: { x: -4, z: -22 },
  },
  {
    position: { x: 0, z: -22 },
  },
  {
    position: { x: 4, z: -22 },
  },
  {
    position: { x: 8, z: -22 },
  },
  {
    position: { x: 12, z: -22 },
  },
  {
    position: { x: 16, z: -22 },
  },
]

export default function Piece({ currentSpace }) {
  const [pieceRef, api] = useCylinder(() => ({
    mass: 5,
    type: 'Dynamic',
    args: [0.75, 0.75, 2],
    position: [
      SPACES[currentSpace].position.x,
      1,
      SPACES[currentSpace].position.z,
    ],
    sleepSpeedLimit: 1,
  }))

  useFrame(() => {
    api.position.set(
      SPACES[currentSpace].position.x,
      1,
      SPACES[currentSpace].position.z
    )
  })

  return (
    <mesh ref={pieceRef}>
      <cylinderGeometry args={[0.75, 0.75, 2]} />
      <meshPhysicalMaterial metalness={1} clearcoat={1} />
    </mesh>
  )
}
