import { RigidBody } from '@react-three/rapier'
import { useState } from 'react'
import useGame from '../stores/useGame'

export default function ComputerDesk() {
    const [hovered, setHover] = useState(false)
    const openInterface = useGame((state) => state.openInterface)

    return (
        <RigidBody type="fixed" colliders="hull">
            <mesh 
                position={[5, 0, -5]} // Place it in the corner
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
                onClick={() => openInterface()} // Click to open!
            >
                {/* A simple desk shape */}
                <boxGeometry args={[2, 1, 1]} />
                <meshStandardMaterial color={hovered ? "cyan" : "blue"} />
            </mesh>
        </RigidBody>
    )
}