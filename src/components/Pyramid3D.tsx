"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group } from "three"
import { Environment } from "@react-three/drei"

function PyramidGroup() {
  const group = useRef<Group | null>(null)

  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y += 0.003
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
  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      {/* single soft radial glow behind the pyramid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div
          className="rounded-full blur-3xl"
          style={{
            width: 760,
            height: 760,
            background: 'radial-gradient(circle at 50% 45%, rgba(0,179,198,0.22), rgba(0,179,198,0.12) 30%, rgba(255,255,255,0) 60%)',
            boxShadow: '0 40px 120px rgba(0,179,198,0.14), inset 0 0 80px rgba(255,214,165,0.06)'
          }}
        />
      </div>

      <Canvas camera={{ position: [0, 0, 9], fov: 38 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} />
        <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#00B3C6" />
        {/* Warm rim light for rich highlights */}
        <pointLight position={[2, 4, 3]} intensity={0.9} color="#FFD6A5" />
        {/* Cool fill to enhance cyan reflections */}
        <pointLight position={[-2, -2, 4]} intensity={0.6} color="#00D4E8" />
        {/* background glow handled via DOM overlay for a clean, soft bloom */}
        <PyramidGroup />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
