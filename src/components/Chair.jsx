import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Chair(props) {
  const { nodes, materials } = useGLTF('/models/chair.glb')
  
  return (
    <RigidBody 
        type="dynamic" 
        colliders="hull" 
        mass={1}
        friction={-1}
        restitution={0.5}
        canSleep={false}
        {...props}
    >
      <Center bottom>
        <group dispose={null}>
            <mesh 
              castShadow 
              receiveShadow
              geometry={nodes.Node.geometry} 
              material={materials.Bean_Bag} 
            />
        </group>
      </Center>
    </RigidBody>
  )
}

useGLTF.preload('/models/chair.glb')