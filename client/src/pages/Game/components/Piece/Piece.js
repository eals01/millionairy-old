export default function Piece({ player, position }) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[0.5, 0.5, 2]} />
      <meshPhysicalMaterial color={player.color} />
    </mesh>
  )
}
