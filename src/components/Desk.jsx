/*
  License: CC-BY
  Author: jeff cobesign
  Source: Poly Pizza
  Title: Adjustable Desk
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Desk(props) {
  const { nodes, materials } = useGLTF('/models/desk.glb')
  
  return (
    // WRAPPER: Makes the desk solid so you can't walk through it
    // type="fixed" = it won't move.
    // colliders="trimesh" = exact collider from the mesh (fine for a single desk)
    // Spread transforms onto RigidBody so the collider matches the visual mesh
    <RigidBody type="fixed" colliders="trimesh" {...props}>
      <group dispose={null}>
        <mesh geometry={nodes.Cube007_Cube008.geometry} material={materials.GrayPlastic} />
        <mesh geometry={nodes.Cube006_Cube007.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Cylinder013.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Cylinder012.geometry} material={materials.WhiteSteelScrew} />
        <mesh geometry={nodes.Cylinder011.geometry} material={materials.BlackPlastic} />
        <mesh geometry={nodes.Cylinder010.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Cylinder009.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Cube005_Cube006.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Cylinder008.geometry} material={materials.BlackPlastic} />
        <mesh geometry={nodes.Cylinder007.geometry} material={materials.WhiteSteelScrew} />
        <mesh geometry={nodes.Cube004_Cube005.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Cylinder006.geometry} material={materials.WhiteSteelScrew} />
        <mesh geometry={nodes.Cylinder005.geometry} material={materials.BlackPlastic} />
        <mesh geometry={nodes.Cube003_Cube004.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Cube002_Cube003.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Cube001_Cube002.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Plane001_Plane002.geometry} material={materials.BlackWood} />
        <mesh geometry={nodes.Cylinder004.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Cylinder003.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Cylinder002.geometry} material={materials.BlackPlastic} />
        <mesh geometry={nodes.Cylinder001.geometry} material={materials.WhiteSteelScrew} />
        <mesh geometry={nodes.Cylinder.geometry} material={materials.BlackCoatSteel} />
        <mesh geometry={nodes.Cube_Cube001.geometry} material={materials.BlackCoatSteel} />
      </group>
    </RigidBody>
  )
}

useGLTF.preload('/models/desk.glb')