export default function Room() {
  return (
    <group>
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -32.3, 0]}
      >
        <planeGeometry args={[500, 500]} />
        <meshPhysicalMaterial color='brown' />
      </mesh>
      <mesh
        castShadow
        position={[-250 - 5, -32.3 + 125, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[500, 250, 10]} />
        <meshPhysicalMaterial color='beige' />
      </mesh>
      <mesh
        castShadow
        position={[-225, -32.3 + 125, -255]}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[50, 250, 10]} />
        <meshPhysicalMaterial color='beige' />
      </mesh>
      <mesh castShadow position={[-100, -32.3 + 40, -255]} rotation={[0, 0, 0]}>
        <boxGeometry args={[200, 80, 10]} />
        <meshPhysicalMaterial color='beige' />
      </mesh>
      <mesh
        castShadow
        position={[-100, -32.3 + 240, -255]}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[200, 20, 10]} />
        <meshPhysicalMaterial color='beige' />
      </mesh>
      <mesh castShadow position={[125, -32.3 + 125, -255]} rotation={[0, 0, 0]}>
        <boxGeometry args={[250, 250, 10]} />
        <meshPhysicalMaterial color='beige' />
      </mesh>
      <mesh castShadow position={[0, -32.3 + 125, 250 + 5]}>
        <boxGeometry args={[500, 250, 10]} />
        <meshPhysicalMaterial color='beige' />
      </mesh>
      <mesh
        castShadow
        position={[0, -32.3 + 255, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <boxGeometry args={[500, 500, 10]} />
        <meshPhysicalMaterial color='beige' />
      </mesh>
      <mesh
        castShadow
        position={[250 - 5, -32.3 + 125, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[500, 250, 10]} />
        <meshPhysicalMaterial color='beige' />
      </mesh>
    </group>
  )
}
