/*
  License: CC-BY
  Author: jeremy
  Source: Poly Pizza
  Title: Laptop
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Laptop(props) {
  const { nodes, materials } = useGLTF('/models/laptop.glb')
  const groupRef = useRef()

  return (
    <RigidBody type="fixed" colliders="hull">
      <group 
        {...props} 
        ref={groupRef}
        dispose={null}
        userData={{ interactable: true, type: 'laptop', prompt: 'Open Laptop' }}
        onPointerOver={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <mesh geometry={nodes['Laptop_01_Cube025-Mesh'].geometry} material={materials['1A1A1A']} />
        <mesh geometry={nodes['Laptop_01_Cube025-Mesh_1'].geometry} material={materials['039BE5']} />
        <mesh geometry={nodes['Laptop_01_Cube025-Mesh_2'].geometry} material={materials.F44336} />
        <mesh geometry={nodes['Laptop_01_Cube025-Mesh_3'].geometry} material={materials.FF9800} />
        <mesh geometry={nodes['Laptop_01_Cube025-Mesh_4'].geometry} material={materials['455A64']} />
      </group>
    </RigidBody>
  )
}

useGLTF.preload('/models/laptop.glb')