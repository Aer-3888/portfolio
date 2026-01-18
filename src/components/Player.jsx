import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Ecctrl from 'ecctrl'

const Player = forwardRef(function Player(props, ref) {
  const ecctrlRef = useRef(null)
  const visualRef = useRef(null)

  useImperativeHandle(ref, () => {
    if (ecctrlRef.current && typeof ecctrlRef.current.getWorldPosition === 'function') {
      return ecctrlRef.current
    }
    return visualRef.current
  })

  return (
    <Ecctrl
      ref={ecctrlRef}
      gravityScale={4}
      friction={1}
      autoBalanceSpringK={1}
      maxVelLimit={5}
      jumpVel={7}
      capsuleRadius={0.35}
      capsuleHalfHeight={0.15}
      {...props}
    >
      {/* VISUALS: The "Boxy Bot" Character */}
      <group ref={visualRef} position={[0, -0.4, 0]} name="player-visual">
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.4]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position={[0, 0.65, 0.21]}>
          <boxGeometry args={[0.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
        </mesh>

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
})

export default Player