"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group } from "three"
import { Environment } from "@react-three/drei"

function PyramidGroup({ target }: { target: { current: { x: number; y: number } } }) {
  const group = useRef<Group | null>(null)

  // separate spin and offset so continuous spin isn't clobbered by lerp
  const spin = useRef(0)
  const offset = useRef({ x: 0, y: 0 })
  // spinSpeed ref is controlled by wheel/drag gestures from the parent
  const spinSpeedRef = useRef(0.003)

  useFrame(() => {
    if (!group.current) return
    // continuous spin uses the mutable spinSpeedRef
    spin.current += spinSpeedRef.current

    // lerp offsets toward target
    const lerp = 0.06
    offset.current.x += (target.current.x - offset.current.x) * lerp
    offset.current.y += (target.current.y - offset.current.y) * lerp

    // apply composed rotation: spin + yaw offset, and separate pitch offset
    group.current.rotation.x = offset.current.x
    group.current.rotation.y = spin.current + offset.current.y
  })

  // Gap controls
  const GAP_TOP = 0.65     // top ↔ middle
  const GAP_BOTTOM = 0.45 // middle ↔ bottom

  return (
    <group ref={group}>
      {/* 🔺 TOP PYRAMID */}
      <mesh position={[0, 1.4 + GAP_TOP, 0]}>
        <coneGeometry args={[1.2, 1.6, 4]} />
        <meshPhysicalMaterial
          color="#02abc1"
          metalness={0.03}
          roughness={0.06}
          transmission={0.45}
          thickness={0.5}
          ior={1.45}
          clearcoat={0.6}
          clearcoatRoughness={0.08}
          reflectivity={0.85}
          envMapIntensity={0.9}
          transparent
          opacity={0.98}
        />
      </mesh>

      {/* ▭ MIDDLE SLAB */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.37, 1.97, 0.8, 4]} />
        <meshPhysicalMaterial
          color="#afb3ba"
          metalness={0.04}
          roughness={0.14}
          transmission={0.02}
          thickness={0.08}
          ior={1.3}
          clearcoat={0.08}
          clearcoatRoughness={0.2}
          envMapIntensity={0.6}
        />
      </mesh>

      {/* ▭ BOTTOM SLAB (closer now) */}
      <mesh position={[0, -0.2 - GAP_BOTTOM, 0]}>
        <cylinderGeometry args={[2.23, 2.74, 0.7, 4]} />
        <meshPhysicalMaterial
          color="#063f50"
          metalness={0.05}
          roughness={0.08}
          transmission={0.25}
          thickness={0.45}
          ior={1.4}
          clearcoat={0.5}
          clearcoatRoughness={0.06}
          envMapIntensity={0.85}
          transparent
          opacity={0.97}
        />
      </mesh>
    </group>
  )
}

export function Pyramid3D() {
  const target = useRef({ x: 0, y: 0 })
  // interactive controls
  const dragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const spinSpeed = useRef(0.003)

  function handlePointerDown(e: React.PointerEvent) {
    dragging.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
    try { (e.target as Element).setPointerCapture((e as any).pointerId) } catch {}
  }

  function handlePointerUp(e: React.PointerEvent) {
    dragging.current = false
    try { (e.target as Element).releasePointerCapture((e as any).pointerId) } catch {}
  }

  function handlePointerMove(e: React.PointerEvent) {
    const el = (e.currentTarget as HTMLElement)
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width // 0..1
    const y = (e.clientY - rect.top) / rect.height // 0..1
    // normalize to -0.5..0.5
    const nx = x - 0.5
    const ny = y - 0.5
    if (dragging.current) {
      // when dragging, allow freer rotation and adjust spin speed by horizontal movement
      const dx = e.clientX - lastPos.current.x
      lastPos.current = { x: e.clientX, y: e.clientY }
      // larger mapping while dragging
      target.current.x = -ny * 0.7
      target.current.y = nx * 1.2
      // quick spin boost from horizontal drag velocity
      spinSpeed.current = Math.min(1.5, Math.max(-1.5, spinSpeed.current + dx * 0.0006))
    } else {
      // hover mapping (subtle)
      target.current.x = -ny * 0.35
      target.current.y = nx * 0.6
    }
  }

  function handlePointerLeave() {
    if (!dragging.current) {
      target.current.x = 0
      target.current.y = 0
    }
  }

  function handleWheel(e: React.WheelEvent) {
    // wheel up -> speed up, wheel down -> slow
    spinSpeed.current = Math.min(2, Math.max(-2, spinSpeed.current - e.deltaY * 0.001))
  }

  function handleDoubleClick() {
    // reset
    target.current.x = 0
    target.current.y = 0
    spinSpeed.current = 0.003
  }

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px]"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
    >
      {/* subtle radial backdrop to help the crystal pyramid read on white backgrounds */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="rounded-full blur-3xl"
          style={{
            width: 640,
            height: 640,
            background: 'radial-gradient(circle at 50% 45%, rgba(6,63,80,0.12), rgba(6,63,80,0.04) 35%, rgba(255,255,255,0) 60%)'
          }}
        />
      </div>

      {/* colorful splash behind the pyramid for depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          width="900"
          height="900"
          viewBox="0 0 900 900"
          className="-z-10 blur-[36px] opacity-70"
          aria-hidden
        >
          <defs>
            <radialGradient id="g1" cx="40%" cy="35%" r="50%">
              <stop offset="0%" stopColor="#00B3C6" stopOpacity="0.95"/>
              <stop offset="60%" stopColor="#006B8F" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="g2" cx="65%" cy="65%" r="45%">
              <stop offset="0%" stopColor="#FFD6A5" stopOpacity="0.9"/>
              <stop offset="50%" stopColor="#FF9F7A" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="360" cy="260" r="260" fill="url(#g1)" />
          <circle cx="560" cy="520" r="220" fill="url(#g2)" />
          <g transform="translate(200,500) rotate(-20)" fill="#00D4E8" opacity="0.12">
            <ellipse cx="0" cy="0" rx="160" ry="60" />
            <ellipse cx="120" cy="-40" rx="140" ry="50" />
          </g>
        </svg>
      </div>

      <Canvas camera={{ position: [0, 0, 9], fov: 38 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} />
        <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#00B3C6" />
        {/* Warm rim light for rich highlights */}
        <pointLight position={[2, 4, 3]} intensity={0.9} color="#FFD6A5" />
        {/* Cool fill to enhance cyan reflections */}
        <pointLight position={[-2, -2, 4]} intensity={0.6} color="#00D4E8" />
        <PyramidGroup target={target} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
