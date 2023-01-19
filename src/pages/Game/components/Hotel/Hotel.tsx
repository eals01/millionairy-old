export default function Hotel(props: any) {
    return (
        <mesh {...props} receiveShadow castShadow>
            <boxGeometry args={[1, 3, 2.4]} />
            <meshPhysicalMaterial color='red' />
        </mesh>
    )
}
