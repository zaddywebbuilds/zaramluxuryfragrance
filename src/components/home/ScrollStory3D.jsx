import { useRef, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// ─── Shared scroll progress ─────────────────────────────────────────
const SP = { v: 0 } // mutable singleton read by all r3f hooks via useFrame

// ─── Perfume Bottle ─────────────────────────────────────────────────
function Bottle() {
  const group = useRef()
  const cap = useRef()
  const body = useRef()
  const liquid = useRef()

  useFrame(({ clock }) => {
    if (!group.current) return
    const p = SP.v
    const t = clock.getElapsedTime()

    // ACT 1 — 0→0.25: rise from below, spin in
    if (p <= 0.25) {
      const n = p / 0.25
      const ease = n * n * (3 - 2 * n) // smoothstep
      group.current.position.y = -4 + ease * 4
      group.current.rotation.y = (1 - ease) * Math.PI * 3
      group.current.scale.setScalar(0.3 + ease * 0.7)
      group.current.rotation.z = 0
    }
    // ACT 2 — 0.25→0.5: center-stage, camera orbits
    else if (p <= 0.5) {
      group.current.position.y = Math.sin(t * 0.6) * 0.08
      group.current.rotation.y = t * 0.4
      group.current.rotation.z = 0
      group.current.scale.setScalar(1)
    }
    // ACT 3 — 0.5→0.72: cap lifts, bottle tilts forward
    else if (p <= 0.72) {
      const n = (p - 0.5) / 0.22
      const ease = n * n * (3 - 2 * n)
      group.current.position.y = Math.sin(t * 0.6) * 0.06
      group.current.rotation.y = t * 0.25
      group.current.rotation.z = ease * 0.18
      if (cap.current) cap.current.position.y = 1.98 + ease * 2.2
    }
    // ACT 4 — 0.72→0.88: bottle drifts back
    else if (p <= 0.88) {
      const n = (p - 0.72) / 0.16
      group.current.position.y = n * 1.5
      group.current.rotation.y = t * 0.15
      group.current.rotation.z = 0.18 - n * 0.18
      group.current.scale.setScalar(1)
    }
    // ACT 5 — 0.88→1: dissolve
    else {
      const n = (p - 0.88) / 0.12
      const ease = n * n
      group.current.scale.setScalar(1 - ease * 0.6)
      group.current.position.y = 1.5 + ease * 2
    }

    // Liquid opacity pulses gently
    if (liquid.current) {
      liquid.current.material.opacity = 0.3 + Math.sin(t * 1.2) * 0.1
    }
  })

  return (
    <group ref={group} position={[0, -4, 0]} scale={0.3}>
      {/* Body */}
      <mesh ref={body} castShadow>
        <cylinderGeometry args={[0.55, 0.62, 2.4, 80, 1]} />
        <meshPhysicalMaterial
          color="#F0E4CC"
          emissive="#C8902A"
          emissiveIntensity={0.08}
          transparent opacity={0.85}
          roughness={0.06} metalness={0.15}
          transmission={0.55} thickness={0.6}
          ior={1.55} reflectivity={0.9}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Shoulder bevel */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.38, 0.55, 0.5, 80]} />
        <meshPhysicalMaterial
          color="#F0E4CC" transparent opacity={0.8}
          roughness={0.04} metalness={0.1}
          transmission={0.7} thickness={0.4} ior={1.5}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.72, 0]}>
        <cylinderGeometry args={[0.22, 0.38, 0.42, 64]} />
        <meshPhysicalMaterial
          color="#F0E4CC" transparent opacity={0.85}
          roughness={0.04} metalness={0.1}
          transmission={0.65} thickness={0.3} ior={1.5}
        />
      </mesh>

      {/* Cap */}
      <group ref={cap} position={[0, 1.98, 0]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.38, 64]} />
          <meshStandardMaterial color="#C9A455" roughness={0.12} metalness={0.92} envMapIntensity={2} />
        </mesh>
        <mesh position={[0, 0.27, 0]}>
          <sphereGeometry args={[0.16, 40, 40]} />
          <meshStandardMaterial color="#A8762A" roughness={0.08} metalness={0.96} envMapIntensity={2.5} />
        </mesh>
      </group>

      {/* Liquid fill */}
      <mesh ref={liquid} position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.47, 0.54, 1.7, 64]} />
        <meshPhysicalMaterial
          color="#C8902A" transparent opacity={0.4}
          roughness={0.08} transmission={0.55}
        />
      </mesh>

      {/* Label plate */}
      <mesh position={[0, -0.08, 0.57]}>
        <planeGeometry args={[0.88, 1.3]} />
        <meshStandardMaterial color="#FAF5EC" roughness={0.35} transparent opacity={0.94} />
      </mesh>

      {/* Base ring */}
      <mesh position={[0, -1.22, 0]}>
        <torusGeometry args={[0.58, 0.04, 16, 80]} />
        <meshStandardMaterial color="#C9A455" roughness={0.1} metalness={0.95} />
      </mesh>
    </group>
  )
}

// ─── Particle Vortex ────────────────────────────────────────────────
function Particles({ count = 350 }) {
  const mesh = useRef()

  const { positions, phases, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const ph = new Float32Array(count)
    const sp = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2 * 8
      const r = 0.6 + (i / count) * 2.2
      const h = -2 + (i / count) * 4
      pos[i * 3]     = Math.cos(theta) * r
      pos[i * 3 + 1] = h
      pos[i * 3 + 2] = Math.sin(theta) * r
      ph[i] = Math.random() * Math.PI * 2
      sp[i] = 0.3 + Math.random() * 0.7
    }
    return { positions: pos, phases: ph, speeds: sp }
  }, [count])

  const posRef = useRef(positions.slice())

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const p = SP.v
    const t = clock.getElapsedTime()

    const attr = mesh.current.geometry.attributes.position
    const burst = p > 0.48 && p < 0.78 ? (p - 0.48) / 0.3 : 0

    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2 * 8 + t * speeds[i] * 0.2
      const r = (0.6 + (i / count) * 2.2) + burst * (2 + Math.sin(phases[i]) * 1.5)
      const h = (-2 + (i / count) * 4) + Math.sin(t * speeds[i] * 0.5 + phases[i]) * 0.15 + burst * Math.cos(phases[i]) * 1.5

      attr.array[i * 3]     = Math.cos(theta) * r
      attr.array[i * 3 + 1] = h
      attr.array[i * 3 + 2] = Math.sin(theta) * r
    }
    attr.needsUpdate = true

    // Rotation of the whole cloud
    mesh.current.rotation.y = t * 0.08

    // Opacity: fade in with scroll, burst bright at cap-lift, fade out at end
    let opacity = 0
    if (p < 0.15) opacity = p / 0.15 * 0.6
    else if (p < 0.72) opacity = 0.6 + burst * 0.4
    else if (p < 0.92) opacity = (1 - (p - 0.72) / 0.2) * 0.6
    mesh.current.material.opacity = Math.max(0, opacity)

    // Size pulses on burst
    mesh.current.material.size = 0.03 + burst * 0.06
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#D4AC70"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Accent glow spheres ────────────────────────────────────────────
function GlowOrbs() {
  const orbs = useRef([])
  const data = useMemo(() => (
    Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * Math.PI * 2,
      r: 2.5 + (i % 2) * 0.8,
      speed: 0.12 + i * 0.03,
      y: -1 + i * 0.4,
    }))
  ), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const p = SP.v
    const burst = p > 0.48 && p < 0.78 ? (p - 0.48) / 0.3 : 0

    orbs.current.forEach((orb, i) => {
      if (!orb) return
      const d = data[i]
      const a = d.angle + t * d.speed
      const r = d.r + burst * 1.5
      orb.position.x = Math.cos(a) * r
      orb.position.z = Math.sin(a) * r
      orb.position.y = d.y + Math.sin(t * 0.4 + d.angle) * 0.3
      orb.scale.setScalar(0.08 + burst * 0.12 + Math.sin(t * 2 + i) * 0.02)

      const mat = orb.children[0]?.material
      if (mat) mat.opacity = (p < 0.1 ? p * 10 : p > 0.85 ? (1 - p) / 0.15 : 1) * 0.7
    })
  })

  return (
    <>
      {data.map((d, i) => (
        <group key={i} ref={(el) => (orbs.current[i] = el)}>
          <mesh>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#D4AC70' : '#FBCF9A'}
              emissive={i % 2 === 0 ? '#D4AC70' : '#F5A623'}
              emissiveIntensity={2}
              transparent opacity={0}
            />
          </mesh>
        </group>
      ))}
    </>
  )
}

// ─── Dynamic lights ─────────────────────────────────────────────────
function Lights() {
  const key = useRef()
  const fill = useRef()
  const rim = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const p = SP.v
    if (key.current)  key.current.intensity  = 1.4 + Math.sin(t * 0.7) * 0.2 + (p > 0.48 && p < 0.78 ? 1.5 : 0)
    if (fill.current) fill.current.intensity = 0.5 + p * 0.3
    if (rim.current) {
      rim.current.position.x = Math.sin(t * 0.3) * 4
      rim.current.position.z = Math.cos(t * 0.3) * 4
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} color="#FBF7F1" />
      <directionalLight ref={key} position={[3, 6, 4]} intensity={1.4} color="#FFF5E4" castShadow />
      <directionalLight ref={fill} position={[-4, 2, -3]} intensity={0.5} color="#D4AC70" />
      <pointLight ref={rim} position={[4, 1, 4]} intensity={0.8} color="#FBCF9A" />
      <pointLight position={[0, 5, 0]} intensity={0.4} color="#FFFFFF" />
    </>
  )
}

// ─── Camera controller ───────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 5))

  useFrame(() => {
    const p = SP.v

    let x = 0, y = 0, z = 5

    if (p <= 0.25) {
      z = 5
    } else if (p <= 0.5) {
      const n = (p - 0.25) / 0.25
      const a = n * Math.PI * 0.55
      x = Math.sin(a) * 4.5
      z = Math.cos(a) * 4.5
      y = n * 0.5
    } else if (p <= 0.72) {
      const n = (p - 0.5) / 0.22
      x = Math.sin(0.55 * Math.PI) * 4.5 * (1 - n)
      z = Math.cos(0.55 * Math.PI) * 4.5 * (1 - n) + n * 3.5
      y = 0.5 + n * 0.8
    } else if (p <= 0.88) {
      const n = (p - 0.72) / 0.16
      y = 1.3 + n * 0.5
      z = 3.5 + n * 1
    } else {
      const n = (p - 0.88) / 0.12
      z = 4.5 + n * 3
      y = 1.8
    }

    target.current.set(x, y, z)
    camera.position.lerp(target.current, 0.06)
    camera.lookAt(0, 0.3, 0)
  })

  return null
}

// ─── Main component ──────────────────────────────────────────────────
export default function ScrollStory3D() {
  const sectionRef  = useRef()
  const text1       = useRef()
  const text2       = useRef()
  const text3       = useRef()
  const maskRef     = useRef()
  const progressBar = useRef()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    // Drive scroll progress
    const prog = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=380%',
      pin: true,
      scrub: 1.8,
      anticipatePin: 1,
      onUpdate: (self) => { SP.v = self.progress },
    })

    // Text + mask timeline (same trigger, same scrub)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=380%',
        scrub: 1.8,
      },
    })

    tl
      // Progress bar
      .fromTo(progressBar.current, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)

      // Text 1 — "Your Signature Scent"
      .fromTo(text1.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.12 }, 0.04)
      .to(text1.current,
        { opacity: 0, y: -30, filter: 'blur(6px)', duration: 0.1 }, 0.22)

      // Text 2 — "Crafted with Intention"
      .fromTo(text2.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.12 }, 0.38)
      .to(text2.current,
        { opacity: 0, y: -30, filter: 'blur(6px)', duration: 0.1 }, 0.56)

      // Text 3 — "Leave the Room Remembered"
      .fromTo(text3.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.1 }, 0.65)
      .to(text3.current,
        { opacity: 0, y: -30, filter: 'blur(6px)', duration: 0.09 }, 0.79)

      // Iris wipe — cream circle expands, revealing next section
      .fromTo(maskRef.current,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 1 },
        { clipPath: 'circle(160% at 50% 50%)', ease: 'power2.inOut', duration: 0.15 }, 0.86)

    return () => {
      prog.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === el) st.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="story-section">
      {/* Three.js scene */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, preserveDrawingBuffer: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <color attach="background" args={['#07050d']} />
        <fog attach="fog" args={['#07050d', 8, 20]} />

        <Lights />
        <CameraRig />
        <Bottle />
        <Particles count={350} />
        <GlowOrbs />

        <Suspense fallback={null}>
          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* Text layers — all stacked, GSAP controls opacity */}
      <div className="story-texts">
        <div ref={text1} className="story-text" style={{ opacity: 0 }}>
          <p className="story-label">The Essence of You</p>
          <h2 className="story-headline">
            Your Signature<br />
            <em>Scent Awaits.</em>
          </h2>
        </div>

        <div ref={text2} className="story-text" style={{ opacity: 0 }}>
          <p className="story-label">Craftsmanship</p>
          <h2 className="story-headline">
            Every Drop,<br />
            <em>Intentional.</em>
          </h2>
        </div>

        <div ref={text3} className="story-text" style={{ opacity: 0 }}>
          <p className="story-label">The Moment</p>
          <h2 className="story-headline">
            Leave the Room<br />
            <em>Remembered.</em>
          </h2>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="story-scroll-hint">
        <div className="story-scroll-line" />
        <span>SCROLL</span>
      </div>

      {/* Bottom progress bar */}
      <div className="story-progress-track">
        <div ref={progressBar} className="story-progress-fill" />
      </div>

      {/* Iris-wipe mask — cream overlay with clip-path expanding circle */}
      <div ref={maskRef} className="story-mask" />
    </section>
  )
}
