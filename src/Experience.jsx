import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import Ecctrl from 'ecctrl'
import Laptop from './components/Laptop'

export default function Experience() {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1} 
        castShadow 
      />

      {/* The Physics World (Gravity is on!) */}
      {/* debug={true} lets you see the invisible hitboxes (wireframes) */}
        <Physics debug={true} timeStep="vary">        
        {/* PLAYER CHARACTER */}
        <Ecctrl 
          position={[0, 1, 0]}
          camInitDis={-5} // Camera distance
          camMaxDis={-5} 
          maxVelLimit={5} 
          jumpVel={4}
        >
          {/* This is the visual representation of "You" (a floating capsule for now) */}
          <mesh castShadow position-y={0.5}>
            <capsuleGeometry args={[0.3, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </Ecctrl>

        {/* THE STAGE (Floor & Walls) */}
        {/* type="fixed" means it won't move when you bump into it */}
        <RigidBody type="fixed" friction={2}>
          {/* Simple invisible collider for the floor so Ecctrl can detect ground for jumping */}
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
        <Laptop position={[3, 0, -3]} rotation-y={0.5} scale={0.08} />
      </Physics>
    </>
  )
}