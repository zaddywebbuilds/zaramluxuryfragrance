import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { STORY } from './storyState'

/* Eases */
const smooth = (n) => n * n * (3 - 2 * n)
const seg = (p, a, b) => smooth(Math.min(1, Math.max(0, (p - a) / (b - a))))

/* ─── Perfume bottle — scroll-choreographed, never free-spinning ─── */
function Bottle() {
  const group = useRef()

  useFrame(({ clock }) => {
    const g = group.current
    if (!g) return
    const p = STORY.p
    const t = clock.getElapsedTime()

    // Gentle idle float, always present but subtle
    const float = Math.sin(t * 0.7) * 0.05

    // Beat 2 (0.2–0.4): approach camera, rotate a few degrees
    const approach = seg(p, 0.2, 0.4)
    // Beat 3 (0.4–0.6): drift to the left, note content on the right
    const aside = seg(p, 0.4, 0.6)
    // Beat 4 (0.6–0.8): lift as the cream panel rises past
    const lift = seg(p, 0.6, 0.8)

    g.position.x = -1.7 * aside + STORY.mx * 0.08
    g.position.y = float + lift * 0.9 + STORY.my * 0.05
    g.position.z = approach * 0.85 - lift * 0.4
    g.rotation.y = THREE.MathUtils.degToRad(approach * 9 - aside * 6) + STORY.mx * 0.05
    g.rotation.z = THREE.MathUtils.degToRad(aside * -3)
    g.scale.setScalar(1 + approach * 0.06 - lift * 0.12)
  })

  return (
    <group ref={group}>
      {/* Glass body */}
      <mesh>
        <cylinderGeometry args={[0.55, 0.62, 2.3, 72]} />
        <meshPhysicalMaterial
          color="#F3E7D3" emissive="#C8902A" emissiveIntensity={0.05}
          transparent opacity={0.85}
          roughness={0.06} metalness={0.14}
          transmission={0.55} thickness={0.6}
          ior={1.5} reflectivity={0.9} envMapIntensity={1.2}
        />
      </mesh>
      {/* Liquid */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.47, 0.54, 1.65, 48]} />
        <meshPhysicalMaterial color="#C8902A" transparent opacity={0.4} roughness={0.1} transmission={0.45} />
      </mesh>
      {/* Shoulder */}
      <mesh position={[0, 1.28, 0]}>
        <cylinderGeometry args={[0.36, 0.55, 0.45, 72]} />
        <meshPhysicalMaterial color="#F3E7D3" transparent opacity={0.82} roughness={0.06} transmission={0.5} thickness={0.4} ior={1.5} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.62, 0]}>
        <cylinderGeometry args={[0.2, 0.34, 0.32, 48]} />
        <meshPhysicalMaterial color="#F3E7D3" transparent opacity={0.85} roughness={0.06} transmission={0.45} ior={1.5} />
      </mesh>
      {/* Gold cap */}
      <mesh position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.36, 48]} />
        <meshStandardMaterial color="#C9A455" roughness={0.14} metalness={0.9} envMapIntensity={1.6} />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#A8762A" roughness={0.1} metalness={0.94} envMapIntensity={2} />
      </mesh>
      {/* Label */}
      <mesh position={[0, -0.05, 0.58]}>
        <planeGeometry args={[0.84, 1.22]} />
        <meshStandardMaterial color="#FAF5EC" roughness={0.4} transparent opacity={0.95} />
      </mesh>
      {/* Base ring */}
      <mesh position={[0, -1.18, 0]}>
        <torusGeometry args={[0.58, 0.035, 12, 64]} />
        <meshStandardMaterial color="#C9A455" roughness={0.12} metalness={0.9} />
      </mesh>
    </group>
  )
}

/* ─── Floating ingredient accents (petals + amber chips), beat 3 ─── */
function Ingredients() {
  const items = useRef([])
  const data = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    angle: (i / 8) * Math.PI * 2,
    r: 1.35 + (i % 3) * 0.35,
    y: -0.8 + (i % 4) * 0.5,
    speed: 0.1 + (i % 3) * 0.05,
    petal: i % 2 === 0,
  })), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const vis = seg(STORY.p, 0.4, 0.52) * (1 - seg(STORY.p, 0.62, 0.75))
    items.current.forEach((m, i) => {
      if (!m) return
      const d = data[i]
      const a = d.angle + t * d.speed
      m.position.set(Math.cos(a) * d.r - 1.7 * seg(STORY.p, 0.4, 0.6), d.y + Math.sin(t * 0.5 + i) * 0.12, Math.sin(a) * d.r * 0.5)
      m.rotation.x = t * 0.2 + i
      m.rotation.y = t * 0.15
      m.scale.setScalar(vis * (d.petal ? 0.11 : 0.06))
      m.material.opacity = vis * 0.85
    })
  })

  return data.map((d, i) => (
    <mesh key={i} ref={(el) => (items.current[i] = el)} scale={0}>
      {d.petal ? <planeGeometry args={[1, 0.6]} /> : <boxGeometry args={[1, 1, 1]} />}
      <meshStandardMaterial
        color={d.petal ? '#E8B4B8' : '#B8843D'}
        roughness={0.5} transparent opacity={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  ))
}

/* ─── Perfume mist particles ─── */
function Mist({ count }) {
  const pts = useRef()
  const seeds = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 7
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (!pts.current) return
    const t = clock.getElapsedTime()
    pts.current.rotation.y = t * 0.02 + STORY.p * 0.5
    pts.current.position.y = -STORY.p * 1.2
    pts.current.material.opacity = 0.35 + seg(STORY.p, 0.55, 0.75) * 0.3 - seg(STORY.p, 0.78, 0.95) * 0.5
  })

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={seeds} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#E9C98F" transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  )
}

/* ─── Camera: mostly stable, gentle dolly, lerped cursor sway ─── */
function CameraRig() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0.2, 5))

  useFrame(() => {
    const p = STORY.p
    const dolly = seg(p, 0.2, 0.4) * 0.5 + seg(p, 0.6, 0.8) * 0.35
    target.current.set(STORY.mx * 0.12, 0.2 + STORY.my * 0.08, 5 - dolly)
    camera.position.lerp(target.current, 0.07)
    camera.lookAt(0, 0.2, 0)
  })
  return null
}

function Lights({ tier }) {
  const key = useRef()
  useFrame(() => {
    if (key.current) key.current.intensity = 1.2 + seg(STORY.p, 0.2, 0.4) * 0.9
  })
  return (
    <>
      <ambientLight intensity={0.55} color="#FBF7F1" />
      <directionalLight ref={key} position={[3, 5, 4]} intensity={1.2} color="#FFF2DC" />
      <directionalLight position={[-4, 2, -2]} intensity={0.45} color="#D4AC70" />
      {tier === 'high' && <pointLight position={[2.5, 0.5, 3]} intensity={0.6} color="#FBCF9A" />}
    </>
  )
}

/* ─── Canvas entry — lazily imported by PerfumeHeroStory ─── */
export default function BottleScene({ tier = 'high', active = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5], fov: 42 }}
      dpr={[1, tier === 'high' ? 1.75 : 1.25]}
      gl={{ antialias: tier === 'high', alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      style={{ position: 'absolute', inset: 0, background: 'transparent' }}
    >
      <Lights tier={tier} />
      <CameraRig />
      <Bottle />
      <Ingredients />
      <Mist count={tier === 'high' ? 130 : 55} />
    </Canvas>
  )
}
