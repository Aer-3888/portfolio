/*
  License: CC-BY
  Author: jeremy
  Source: Poly Pizza
  Title: Laptop
*/

import React, { useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import useGame from '../stores/useGame'

export default function Laptop(props) {
  // IMPORTANT: Make sure this path matches where you put the file!
  // If you put it in public/models/, use '/models/laptop.glb'
  const { nodes, materials } = useGLTF('/models/laptop.glb')
  
  const [hovered, setHover] = useState(false)
  const openInterface = useGame((state) => state.openInterface)

  return (
    // 1. RigidBody makes it solid so you can't walk through it
    <RigidBody type="fixed" colliders="hull">
      <group 
        {...props} 
        dispose={null}
        // 2. Interaction Logic
        onPointerEnter={() => { document.body.style.cursor = 'pointer'; setHover(true) }}
        onPointerLeave={() => { document.body.style.cursor = 'auto'; setHover(false) }}
        onClick={(e) => {
           e.stopPropagation()
           openInterface() 
        }}
      >
        {/* Visual Effect: Scale up slightly when hovered */}
        <group position-y={hovered ? 0.2 : 0}>
            
            {/* 3. YOUR MODEL PARTS (From the file you generated) */}
            <mesh geometry={nodes['Laptop_01_Cube025-Mesh'].geometry} material={materials['1A1A1A']} />
            <mesh geometry={nodes['Laptop_01_Cube025-Mesh_1'].geometry} material={materials['039BE5']} />
            <mesh geometry={nodes['Laptop_01_Cube025-Mesh_2'].geometry} material={materials.F44336} />
            <mesh geometry={nodes['Laptop_01_Cube025-Mesh_3'].geometry} material={materials.FF9800} />
            <mesh geometry={nodes['Laptop_01_Cube025-Mesh_4'].geometry} material={materials['455A64']} />

        </group>
      </group>
    </RigidBody>
  )
}

useGLTF.preload('/models/laptop.glb')