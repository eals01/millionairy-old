import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import model from './Board.gltf'

export default function Board() {
  const [boardRef] = useBox(() => ({
    mass: 1,
    type: 'Static',
    args: [50, 0.3, 50],
    position: [0, -0.15, 0],
    rotation: [0, -Math.PI / 2, 0],
  }))

  const { nodes, materials } = useGLTF(model)
  return (
    <group ref={boardRef} scale={[25, 0.15, 25]} position={[0, -0.3, 0]}>
      <mesh geometry={nodes.Cube_1.geometry} material={materials.Material} />
      <mesh
        geometry={nodes.Cube_2.geometry}
        material={materials['Material.001']}
        receiveShadow
      />
    </group>
  )
}

useGLTF.preload(model)
