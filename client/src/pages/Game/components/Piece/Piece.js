export default function Piece({ player, position }) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[0.6, 0.6, 2]} />
      <meshPhysicalMaterial color={player.color} />
    </mesh>
  )
}
