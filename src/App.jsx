import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

function App() {
  return (
    // The Canvas is the parent component for all 3D content
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, 2, 6] // Moves camera back so we can see the scene
      }}
    >
      <Experience />
    </Canvas>
  )
}

export default App