import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Euler, MathUtils, Raycaster, Vector2, Vector3 } from 'three'

const MIN_PITCH = -0.9
const MAX_PITCH = 0.4
const BASE_DISTANCE = 6
const COLLISION_PADDING = 0.25
const SENSITIVITY = 0.003
const VELOCITY_DAMP = 6
const ROT_LAG = 12
const POS_LAG = 8
const DIST_LAG = 8

function dampAngle(current, target, lambda, delta) {
  const twoPi = Math.PI * 2
  const shortest = MathUtils.euclideanModulo(target - current + Math.PI, twoPi) - Math.PI
  const eased = MathUtils.damp(0, shortest, lambda, delta)
  return current + eased
}

export default function ThirdPersonCamera({ targetRef }) {
  const { camera, scene, gl } = useThree()

  const raycaster = useMemo(() => new Raycaster(), [])
  const targetPos = useMemo(() => new Vector3(), [])
  const desiredPos = useMemo(() => new Vector3(), [])
  const dragDelta = useMemo(() => new Vector2(), [])
  const tempDir = useMemo(() => new Vector3(), [])
  const euler = useMemo(() => new Euler(0, 0, 0, 'YXZ'), [])

  const dragActive = useRef(false)
  const pointerLocked = useRef(false)

  const state = useRef({
    yaw: 0,
    pitch: -0.35,
    yawVel: 0,
    pitchVel: 0,
    distance: BASE_DISTANCE,
    currentDistance: BASE_DISTANCE,
    smoothedYaw: 0,
    smoothedPitch: -0.35,
    initialized: false
  })

  useEffect(() => {
    const onPointerDown = (event) => {
      if (event.button !== 0 && event.button !== 2) return
      if (!document.pointerLockElement && gl?.domElement?.requestPointerLock) {
        gl.domElement.requestPointerLock()
      }
      dragActive.current = true
    }

    const onPointerUp = () => {
      dragActive.current = false
    }

    const onPointerMove = (event) => {
      if (!dragActive.current) return
      dragDelta.set(event.movementX || 0, event.movementY || 0)
      const s = state.current
      s.yawVel = MathUtils.clamp(s.yawVel + dragDelta.x * SENSITIVITY, -4, 4)
      s.pitchVel = MathUtils.clamp(s.pitchVel + dragDelta.y * SENSITIVITY, -3, 3)
    }

    const onPointerLockChange = () => {
      pointerLocked.current = document.pointerLockElement === gl?.domElement
      if (!pointerLocked.current) dragActive.current = false
      if (document && document.body) {
        document.body.style.cursor = pointerLocked.current ? 'none' : 'auto'
      }
    }

    document.addEventListener('pointerlockchange', onPointerLockChange)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointermove', onPointerMove)

    return () => {
      document.removeEventListener('pointerlockchange', onPointerLockChange)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointermove', onPointerMove)
      if (document && document.body) document.body.style.cursor = 'auto'
    }
  }, [dragDelta, gl])

  useFrame((_, delta) => {
    const player = targetRef?.current
    if (!player) return

    // Cap delta to prevent physics instability
    const cappedDelta = Math.min(delta, 0.1)

    player.getWorldPosition(targetPos)
    targetPos.y += 1.2

    const s = state.current

    // Initialize camera position on first frame
    if (!s.initialized) {
      camera.position.set(targetPos.x, targetPos.y + 2, targetPos.z + BASE_DISTANCE)
      s.initialized = true
      return
    }

    s.yaw += s.yawVel * cappedDelta
    s.pitch = MathUtils.clamp(s.pitch + s.pitchVel * cappedDelta, MIN_PITCH, MAX_PITCH)

    s.yawVel = MathUtils.damp(s.yawVel, 0, VELOCITY_DAMP, cappedDelta)
    s.pitchVel = MathUtils.damp(s.pitchVel, 0, VELOCITY_DAMP, cappedDelta)

    s.smoothedYaw = dampAngle(s.smoothedYaw, s.yaw, ROT_LAG, cappedDelta)
    s.smoothedPitch = MathUtils.damp(s.smoothedPitch, s.pitch, ROT_LAG, cappedDelta)

    euler.set(s.smoothedPitch, s.smoothedYaw, 0)
    tempDir.set(0, 0, 1).applyEuler(euler).normalize()

    // Optimized raycasting: only check meshes, not debug helpers
    raycaster.set(targetPos, tempDir.clone().multiplyScalar(-1))
    const hits = raycaster.intersectObjects(scene.children, true).filter(hit => hit.object.isMesh)
    const blockingHit = hits.find((hit) => {
      let obj = hit.object
      while (obj) {
        if (obj === player) return false
        if (obj.name && obj.name.toLowerCase().includes('player')) return false
        obj = obj.parent
      }
      return true
    })

    const desiredDistance = blockingHit ? Math.max(blockingHit.distance - COLLISION_PADDING, 1) : s.distance
    s.currentDistance = MathUtils.damp(s.currentDistance, desiredDistance, DIST_LAG, cappedDelta)

    desiredPos.copy(targetPos).addScaledVector(tempDir, -s.currentDistance)
    
    const smoothFactor = 1 - Math.exp(-POS_LAG * cappedDelta)
    camera.position.lerp(desiredPos, smoothFactor)
    camera.lookAt(targetPos)
  })

  return null
}
