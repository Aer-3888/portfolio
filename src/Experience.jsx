import { useRef } from 'react'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import Player from './components/Player'
import Laptop from './components/Laptop'
import Desk from './components/Desk'
import Chair from './components/Chair'
import Project from './components/Project'
import ThirdPersonCamera from './components/ThirdPersonCamera'

export default function Experience() {
  const playerRef = useRef(null)

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1} 
        castShadow 
      />

      {/* The Physics World */}
      <Physics debug={true} timeStep="vary">        
        
        <Player ref={playerRef} position={[0, 3, 0]} />
        <ThirdPersonCamera targetRef={playerRef} />

        {/* THE STAGE (Floor & Walls) */}
        <RigidBody type="fixed" friction={2}>
          {/* Simple invisible collider for the floor so Ecctrl can detect ground */}
          <CuboidCollider args={[10, 0.05, 10]} position={[0, -1.01, 0]} />
          
          {/* Floor */}
          <mesh receiveShadow position-y={-1} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#333" />
          </mesh>

          {/* Wall 1 (Back) */}
          <mesh receiveShadow position={[0, 1, -10]}>
            <boxGeometry args={[20, 4, 1]} />
            <meshStandardMaterial color="#555" />
          </mesh>
          
          {/* Wall 2 (Right) */}
          <mesh receiveShadow position={[10, 1, 0]} rotation-y={-Math.PI / 2}>
            <boxGeometry args={[20, 4, 1]} />
            <meshStandardMaterial color="#555" />
          </mesh>

           {/* Wall 3 (Left) */}
           <mesh receiveShadow position={[-10, 1, 0]} rotation-y={-Math.PI / 2}>
            <boxGeometry args={[20, 4, 1]} />
            <meshStandardMaterial color="#555" />
          </mesh>

        </RigidBody>

        {/* An Obstacle to jump over */}
          <RigidBody position={[3, 0, 3]}>
           <mesh castShadow>
             <boxGeometry />
             <meshStandardMaterial color="orange" />
           </mesh>
        </RigidBody>

        <Desk scale={1.8} position={[5, -1, -5]} rotation-y={-Math.PI * 0.5} />
        
        <Laptop 
            scale={0.08} 
            position={[5, 0.7, -5]}  
        />
        
        <Chair 
            scale={0.06} 
            position={[4.5, 1.2, -2.5]} 
            rotation-y={-Math.PI * 1.1} 
        />
        
        <Project 
            title="Waiki" 
            description="A Flutter-based Android application that integrates with a physical device to combat screen addiction."
            url="https://waikiup.com/"
            screenshots={[
                '/images/waiki_android/waiki1.jpg',
                '/images/waiki_android/waiki2.jpg',
                '/images/waiki_android/waiki3.jpg',
                '/images/waiki_android/waiki4.jpg',
                '/images/waiki_android/waiki5.jpg'
            ]}
            scale={0.8}
            position={[0, 0, -5]} 
            rotation-y={-Math.PI * 1.8} 
        />
      </Physics>
    </>
  )
}