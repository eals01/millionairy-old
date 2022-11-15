import { Space } from '../../../../../../types/Space'

export default function Lights({ spaces }: { spaces: Space[] }) {
  return (
    <group>
      {/*<mesh position={[-0.64, 1.25, -0.75]}>
        <boxGeometry args={[0.16, 1, 0.06]} />
        <meshPhysicalMaterial
          color='brown'
          emissive={spaces[1].ownerID !== '' ? 'brown' : 'black'}
        />
      </mesh>
      {spaces[1].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={4}
          height={1.7}
          position={[-0.64, 5, -0.75]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='chocolate'
        />
      )}
      <mesh position={[-0.32, 1.25, -0.75]}>
        <boxGeometry args={[0.16, 1, 0.06]} />
        <meshPhysicalMaterial
          color='brown'
          emissive={spaces[1].ownerID !== '' ? 'brown' : 'black'}
        />
      </mesh>
      {spaces[2].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={4}
          height={1.7}
          position={[-0.32, 5, -0.75]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='chocolate'
        />
      )}
      <mesh position={[0.16, 1.25, -0.75]}>
        <boxGeometry args={[0.16, 1, 0.06]} />
        <meshPhysicalMaterial
          color='lightblue'
          emissive={spaces[1].ownerID !== '' ? 'lightblue' : 'black'}
        />
      </mesh>
      {spaces[3].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={4}
          height={1.7}
          position={[0.16, 5, -0.75]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='lightblue'
        />
      )}
      <mesh position={[0.48, 1.25, -0.75]}>
        <boxGeometry args={[0.16, 1, 0.06]} />
        <meshPhysicalMaterial
          color='lightblue'
          emissive={spaces[1].ownerID !== '' ? 'lightblue' : 'black'}
        />
      </mesh>
      {spaces[4].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={4}
          height={1.7}
          position={[0.48, 5, -0.75]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='lightblue'
        />
      )}
      <mesh position={[0.64, 1.25, -0.75]}>
        <boxGeometry args={[0.16, 1, 0.06]} />
        <meshPhysicalMaterial
          color='lightblue'
          emissive={spaces[1].ownerID !== '' ? 'lightblue' : 'black'}
        />
      </mesh>
      {spaces[5].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={4}
          height={1.7}
          position={[0.64, 5, -0.75]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='lightblue'
        />
      )}
      <mesh position={[0.75, 1.25, -0.64]}>
        <boxGeometry args={[0.06, 1, 0.16]} />
        <meshPhysicalMaterial color='pink' emissive='pink' />
      </mesh>
      {spaces[6].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={1.7}
          height={4}
          position={[0.75, 5, -0.64]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='pink'
        />
      )}
      <mesh position={[0.75, 1.25, -0.32]}>
        <boxGeometry args={[0.06, 1, 0.16]} />
        <meshPhysicalMaterial color='pink' emissive='pink' />
      </mesh>
      {spaces[7].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={1.7}
          height={4}
          position={[0.75, 5, -0.32]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='pink'
        />
      )}
      <mesh position={[0.75, 1.25, -0.16]}>
        <boxGeometry args={[0.06, 1, 0.16]} />
        <meshPhysicalMaterial color='pink' emissive='pink' />
      </mesh>
      {spaces[8].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={1.7}
          height={4}
          position={[0.75, 5, -0.16]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='pink'
        />
      )}
      <mesh position={[0.75, 1.25, 0.16]}>
        <boxGeometry args={[0.06, 1, 0.16]} />
        <meshPhysicalMaterial color='orange' emissive='orange' />
      </mesh>
      {spaces[9].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={1.7}
          height={4}
          position={[0.75, 5, 0.16]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='orange'
        />
      )}
      <mesh position={[0.75, 1.25, 0.48]}>
        <boxGeometry args={[0.06, 1, 0.16]} />
        <meshPhysicalMaterial color='orange' emissive='orange' />
      </mesh>
      {spaces[10].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={1.7}
          height={4}
          position={[0.75, 5, 0.48]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='orange'
        />
      )}
      <mesh position={[0.75, 1.25, 0.64]}>
        <boxGeometry args={[0.06, 1, 0.16]} />
        <meshPhysicalMaterial color='orange' emissive='orange' />
      </mesh>
      {spaces[11].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={1.7}
          height={4}
          position={[0.75, 5, 0.64]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='orange'
        />
      )}
      <mesh position={[0.64, 1.25, 0.75]}>
        <boxGeometry args={[0.16, 1, 0.06]} />
        <meshPhysicalMaterial color='red' emissive='red' />
      </mesh>
      {spaces[12].ownerID !== '' && (
        <rectAreaLight
          intensity={1}
          width={4}
          height={1.7}
          position={[0.64, 5, 0.75]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='red'
        />
      )}
      <mesh position={[0.32, 1.25, 0.75]}>
        <boxGeometry args={[0.16, 1, 0.06]} />
        <meshPhysicalMaterial color='red' emissive='red' />
      </mesh>
      <rectAreaLight
        intensity={1}
        width={4}
        height={1.7}
        position={[0.32, 5, 0.75]}
        rotation={[-Math.PI / 2, 0, 0]}
        color='red'
      />
      <mesh position={[0.16, 1.25, 0.75]}>
        <boxGeometry args={[0.16, 1, 0.06]} />
        <meshPhysicalMaterial color='red' emissive='red' />
      </mesh>
      <rectAreaLight
        intensity={1}
        width={4}
        height={1.7}
        position={[0.16, 5, 0.75]}
        rotation={[-Math.PI / 2, 0, 0]}
        color='red'
      />
      <mesh position={[-0.16, 1.25, 0.75]}>
        <boxGeometry args={[0.16, 1, 0.06]} />
        <meshPhysicalMaterial color='yellow' emissive='yellow' />
      </mesh>
      <rectAreaLight
        intensity={1}
        width={4}
        height={1.7}
        position={[-0.16, 5, 0.75]}
        rotation={[-Math.PI / 2, 0, 0]}
        color='yellow'
      />
      <mesh position={[-0.32, 1.25, 0.75]}>
        <boxGeometry args={[0.16, 1, 0.06]} />
        <meshPhysicalMaterial color='yellow' emissive='yellow' />
      </mesh>
      <rectAreaLight
        intensity={1}
        width={4}
        height={1.7}
        position={[-0.32, 5, 0.75]}
        rotation={[-Math.PI / 2, 0, 0]}
        color='yellow'
      />
      <mesh position={[-0.64, 1.25, 0.75]}>
        <boxGeometry args={[0.16, 1, 0.06]} />
        <meshPhysicalMaterial color='yellow' emissive='yellow' />
      </mesh>
      <rectAreaLight
        intensity={1}
        width={4}
        height={1.7}
        position={[-0.64, 5, 0.75]}
        rotation={[-Math.PI / 2, 0, 0]}
        color='yellow'
      />
      <mesh position={[-0.75, 1.25, 0.64]}>
        <boxGeometry args={[0.06, 1, 0.16]} />
        <meshPhysicalMaterial color='green' emissive='green' />
      </mesh>
      <rectAreaLight
        intensity={1}
        width={1.7}
        height={4}
        position={[-0.75, 5, 0.64]}
        rotation={[-Math.PI / 2, 0, 0]}
        color='forestgreen'
      />
      <mesh position={[-0.75, 1.25, 0.48]}>
        <boxGeometry args={[0.06, 1, 0.16]} />
        <meshPhysicalMaterial color='green' emissive='green' />
      </mesh>
      <rectAreaLight
        intensity={1}
        width={1.7}
        height={4}
        position={[-0.75, 5, 0.48]}
        rotation={[-Math.PI / 2, 0, 0]}
        color='forestgreen'
      />
      <mesh position={[-0.75, 1.25, 0.16]}>
        <boxGeometry args={[0.06, 1, 0.16]} />
        <meshPhysicalMaterial color='green' emissive='green' />
      </mesh>
      <rectAreaLight
        intensity={1}
        width={1.7}
        height={4}
        position={[-0.75, 5, 0.16]}
        rotation={[-Math.PI / 2, 0, 0]}
        color='forestgreen'
      />
      <mesh position={[-0.75, 1.25, -0.32]}>
        <boxGeometry args={[0.06, 1, 0.16]} />
        <meshPhysicalMaterial color='navy' emissive='navy' />
      </mesh>
      <rectAreaLight
        intensity={1}
        width={1.7}
        height={4}
        position={[-0.75, 5, -0.32]}
        rotation={[-Math.PI / 2, 0, 0]}
        color='blue'
      />
      <mesh position={[-0.75, 1.25, -0.64]}>
        <boxGeometry args={[0.06, 1, 0.16]} />
        <meshPhysicalMaterial color='navy' emissive='navy' />
      </mesh>
      <rectAreaLight
        intensity={1}
        width={1.7}
        height={4}
        position={[-0.75, 5, -0.64]}
        rotation={[-Math.PI / 2, 0, 0]}
        color='blue'
      />*/}
    </group>
  )
}
