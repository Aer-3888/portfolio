import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Euler, MathUtils, Raycaster, Vector2, Vector3 } from 'three'

const MIN_PITCH = -0.9
const MAX_PITCH = 0.4
const BASE_DISTANCE = 6
const COLLISION_PADDING = 0.25
const BASE_FOV = 45
const MAX_FOV = 52
const MIN_FOV = 42
const SENSITIVITY = 0.003
const VELOCITY_DAMP = 6
const ROT_LAG = 8
const POS_LAG = 10
const DIST_LAG = 6

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
  const smoothedPos = useMemo(() => new Vector3(), [])
  const lookAtPos = useMemo(() => new Vector3(), [])
  const dragDelta = useMemo(() => new Vector2(), [])
  const tempDir = useMemo(() => new Vector3(), [])
  const euler = useMemo(() => new Euler(0, 0, 0, 'YXZ'), [])
  const prevTargetPos = useMemo(() => new Vector3(), [])

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
    fov: BASE_FOV
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

    player.getWorldPosition(targetPos)
    targetPos.y += 1.2

    const s = state.current

    s.yaw += s.yawVel * delta
    s.pitch = MathUtils.clamp(s.pitch + s.pitchVel * delta, MIN_PITCH, MAX_PITCH)

    s.yawVel = MathUtils.damp(s.yawVel, 0, VELOCITY_DAMP, delta)
    s.pitchVel = MathUtils.damp(s.pitchVel, 0, VELOCITY_DAMP, delta)

    s.smoothedYaw = dampAngle(s.smoothedYaw, s.yaw, ROT_LAG, delta)
    s.smoothedPitch = MathUtils.damp(s.smoothedPitch, s.pitch, ROT_LAG, delta)

    euler.set(s.smoothedPitch, s.smoothedYaw, 0)
    tempDir.set(0, 0, 1).applyEuler(euler)

    raycaster.set(targetPos, tempDir.normalize())
    const hits = raycaster.intersectObjects(scene.children, true)
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
    s.currentDistance = MathUtils.damp(s.currentDistance, desiredDistance, DIST_LAG, delta)

    smoothedPos.copy(tempDir.multiplyScalar(s.currentDistance)).add(targetPos)
    camera.position.lerp(smoothedPos, 1 - Math.exp(-POS_LAG * delta))

    lookAtPos.lerpVectors(lookAtPos, targetPos, 1 - Math.exp(-POS_LAG * delta))
    camera.lookAt(lookAtPos)
    camera.up.set(0, 1, 0)

    const frameSpeed = prevTargetPos.distanceTo(targetPos) / Math.max(delta, 1e-4)
    prevTargetPos.copy(targetPos)
    const targetFov = MathUtils.clamp(BASE_FOV + MathUtils.clamp(frameSpeed * 0.15, -5, 5), MIN_FOV, MAX_FOV)
    s.fov = MathUtils.damp(s.fov, targetFov, 4, delta)
    camera.fov = s.fov
    camera.updateProjectionMatrix()
  })

  return null
}
