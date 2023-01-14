import { Sky, Stars } from '@react-three/drei'
import Box from './components/Box/Box'
import Room from './components/Room/Room'
import Table from './components/Table/Table'

export default function Scene() {
  return (
    <>
      {/*<Sky
        distance={450000}
        sunPosition={[0, -0.1, -1]}
        inclination={0}
        azimuth={0.25}
      />
      <Stars radius={300} />
      <pointLight
        position={[-150, 200, -400]}
        color='#c5d9ff'
        intensity={0.3}
        castShadow
        shadow-mapSize-height={32768}
        shadow-mapSize-width={32768}
        shadow-radius={4}
      />
      <spotLight
        position={[0, 150, 0]}
        color='#ffbb73'
        intensity={0.2}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        shadow-radius={1}
        shadow-bias={-0.0001}
  />*/}
      <ambientLight intensity={0.5} />
      <Box />
      {/*<Room />*/}
    </>
  )
}
