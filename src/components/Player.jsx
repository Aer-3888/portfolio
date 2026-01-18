import React from 'react'
import Ecctrl from 'ecctrl'

export default function Player(props) {
  return (
    // Ecctrl wraps the character and handles all physics/camera logic
    <Ecctrl 
      camInitDis={-5} // Camera distance
      camMaxDis={-5} 
      gravityScale={4}
      friction={1}
      autoBalanceSpringK={1}
      maxVelLimit={5} // Speed
      jumpVel={7}     // Jump height
      capsuleRadius={0.35}
      capsuleHalfHeight={0.15}
      {...props}
    >
      
      {/* VISUALS: The "Boxy Bot" Character */}
      <group position={[0, -0.4, 0]}> {/* Offset to fit inside capsule */}
        
        {/* 1. Body */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.4]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>

        {/* 2. Eyes (Visor) */}
        <mesh position={[0, 0.65, 0.21]}>
          <boxGeometry args={[0.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
        </mesh>

        {/* 3. Floating Hands */}
        <mesh position={[-0.4, 0.4, 0.2]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.4, 0.4, 0.2]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="white" />
        </mesh>

      </group>

    </Ecctrl>
  )
}