export default function WheelOfFunction() {
  return (
    <group position={[40, 0, 40]} rotation={[0, (2 * Math.PI) / -2.5, 0]}>
      <mesh position={[0, 0, -1]} castShadow>
        <boxGeometry args={[10, 1, 1]} />
        <meshPhysicalMaterial color='gray' />
      </mesh>
      <mesh position={[5, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 5]} />
        <meshPhysicalMaterial color='gray' />
      </mesh>
      <mesh position={[-5, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 5]} />
        <meshPhysicalMaterial color='gray' />
      </mesh>
      <mesh position={[0, 10, -1]} castShadow>
        <boxGeometry args={[1, 20, 1]} />
        <meshPhysicalMaterial color='gray' />
      </mesh>
      <mesh position={[0, 15, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[10, 10, 1, 20]} />
        <meshPhysicalMaterial color='white' />
      </mesh>
      <mesh position={[0, 15, 0]} castShadow>
        <boxGeometry args={[1, 1, 3]} />
        <meshPhysicalMaterial color='gray' />
      </mesh>
    </group>
  )
}
