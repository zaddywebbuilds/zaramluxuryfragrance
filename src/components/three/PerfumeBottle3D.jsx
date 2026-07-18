import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, PresentationControls } from '@react-three/drei'

// Simple procedural bottle using Three.js geometry (no GLTF required)
function Bottle() {
  const groupRef = useRef()
  const [mouseX, setMouseX] = useState(0)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    // Gentle sway
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15 + mouseX * 0.2
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.05
  })

  return (
    <group ref={groupRef}>
      {/* Bottle body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.6, 2.4, 64, 1, false]} />
        <meshPhysicalMaterial
          color="#F7EBD2"
          transparent
          opacity={0.82}
          roughness={0.05}
          metalness={0.1}
          transmission={0.7}
          thickness={0.5}
          ior={1.5}
          reflectivity={0.9}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.22, 0.45, 0.6, 64]} />
        <meshPhysicalMaterial
          color="#F7EBD2"
          transparent opacity={0.85}
          roughness={0.05} metalness={0.1}
          transmission={0.65} thickness={0.3}
        />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.98, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.36, 64]} />
        <meshStandardMaterial color="#D4AC70" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#B8843D" roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Liquid inside */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.48, 0.53, 1.6, 64]} />
        <meshPhysicalMaterial
          color="#D4AC70"
          transparent opacity={0.55}
          roughness={0.1}
          transmission={0.5}
        />
      </mesh>

      {/* Label area */}
      <mesh position={[0, -0.1, 0.56]}>
        <planeGeometry args={[0.9, 1.2]} />
        <meshStandardMaterial color="#FBF7F1" roughness={0.4} transparent opacity={0.92} />
      </mesh>
    </group>
  )
}

export default function PerfumeBottle3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} color="#FBF7F1" />
        <directionalLight position={[3, 5, 5]} intensity={1.2} color="#F7EBD2" castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#D4AC70" />
        <pointLight position={[0, 4, 2]} intensity={0.5} color="#FBEFEB" />

        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 300 }}
          rotation={[0, 0, 0]}
          polar={[-0.3, 0.3]}
          azimuth={[-0.5, 0.5]}
        >
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Bottle />
          </Float>
        </PresentationControls>

        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
