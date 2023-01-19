export default function House(props: any) {
    return (
        <mesh {...props} receiveShadow castShadow>
            <boxGeometry args={[1.4, 1, 0.8]} />
            <meshPhysicalMaterial color='green' />
        </mesh>
    )
}
