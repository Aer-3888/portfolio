import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import Ecctrl from 'ecctrl'
import useGame from '../stores/useGame'
import { Vector3 } from 'three'

const Player = forwardRef(function Player(props, ref) {
  const ecctrlRef = useRef(null)
  const visualRef = useRef(null)
  const { scene } = useThree()
  
  const setNearbyObject = useGame((state) => state.setNearbyObject)
  const clearNearbyObject = useGame((state) => state.clearNearbyObject)
  const openInterface = useGame((state) => state.openInterface)
  
  const [, getKeys] = useKeyboardControls()
  const playerPos = useRef(new Vector3())
  const interactionDistance = 3 // meters

  useImperativeHandle(ref, () => {
    if (ecctrlRef.current && typeof ecctrlRef.current.getWorldPosition === 'function') {
      return ecctrlRef.current
    }
    return visualRef.current
  })

  useFrame(() => {
    if (!visualRef.current) return

    // Get player position from the visual group
    visualRef.current.getWorldPosition(playerPos.current)

    // Find nearby interactables
    let closestObject = null
    let closestDistance = interactionDistance

    scene.traverse((obj) => {
      if (obj.userData?.interactable) {
        const distance = playerPos.current.distanceTo(obj.position)
        if (distance < closestDistance) {
          closestDistance = distance
          closestObject = obj
        }
      }
    })

    // Update nearby object state
    if (closestObject) {
      setNearbyObject({
        name: closestObject.userData.type,
        prompt: closestObject.userData.prompt,
        data: closestObject.userData
      })

      // Check for interact key press
      const { interact } = getKeys()
      if (interact) {
        handleInteraction(closestObject.userData)
      }
    } else {
      clearNearbyObject()
    }
  })

  const handleInteraction = (userData) => {
    if (userData.type === 'laptop') {
      openInterface()
    } else if (userData.type === 'project' && userData.url) {
      window.open(userData.url, '_blank')
    }
  }

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