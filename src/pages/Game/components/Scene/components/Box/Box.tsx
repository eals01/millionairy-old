export default function Box() {
  return (
    <group>
      <mesh castShadow position={[0, -0.15 + 2.5, 55]}>
        <boxGeometry args={[26, 5, 26]} />
        <meshPhysicalMaterial color='gray' />
      </mesh>
    </group>
  )
}
