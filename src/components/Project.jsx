import React from 'react'
import { Text } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Project({ title = "Project Title", description = "Description goes here", ...props }) {
  return (
    <group {...props}>
      
      {/* 1. The Frame/Board */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position-y={1.5}>
          {/* Width: 2, Height: 1.5, Depth: 0.1 */}
          <boxGeometry args={[2.5, 1.8, 0.1]} /> 
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>
      </RigidBody>

      {/* 2. The Title */}
      <Text
        //font="./fonts/bangers-v20-latin-regular.woff" 
        fontSize={0.3}
        position={[0, 2.1, 0.06]} // Slightly in front of the board (z=0.06)
        color="black"
        maxWidth={2}
        textAlign="center"
      >
        {title}
      </Text>

      {/* 3. The Description */}
      <Text
        fontSize={0.15}
        position={[0, 1.2, 0.06]}
        color="#333"
        maxWidth={2.2}
        textAlign="center"
      >
        {description}
      </Text>

    </group>
  )
}