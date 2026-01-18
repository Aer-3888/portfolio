import { OrbitControls } from '@react-three/drei'

export default function Experience() {
  return (
    <>
      {/* 1. Camera Controls: Allows you to rotate the view with the mouse */}
      <OrbitControls makeDefault />

      {/* 2. Lighting: Essential to see 3D objects */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* 3. The Floor (The Stage) */}
      <mesh rotation-x={-Math.PI / 2} position-y={-1}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* 4. A Placeholder Cube (Representing an NPC or Object) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </>
  )
}