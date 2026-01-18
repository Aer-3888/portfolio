/*
  License: CC-BY
  Author: CMHT Oculus
  Source: Poly Pizza
  Title: Chair
*/

import React from 'react'
import { useGLTF, Center } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Chair(props) {
  // FIXED PATH: matches public/models/chair.glb
  const { nodes, materials } = useGLTF('/models/chair.glb')
  
  return (
    <RigidBody type="fixed" colliders="hull" {...props}>
      {/* <Center> ensures the chair sits perfectly on the floor */}
      <Center top>
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