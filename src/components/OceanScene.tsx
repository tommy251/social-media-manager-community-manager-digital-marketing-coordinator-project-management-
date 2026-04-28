import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

function Ocean() {
  const mesh = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color("#0a1838") },
      uShallow: { value: new THREE.Color("#3b6ea5") },
      uFoam: { value: new THREE.Color("#ffb780") },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -2.4, 0]}>
      <planeGeometry args={[60, 60, 140, 140]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          varying float vElevation;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float wave1 = sin(pos.x * 0.4 + uTime * 0.8) * 0.35;
            float wave2 = sin(pos.y * 0.6 + uTime * 1.1) * 0.25;
            float wave3 = sin((pos.x + pos.y) * 0.3 + uTime * 0.5) * 0.4;
            pos.z += wave1 + wave2 + wave3;
            vElevation = pos.z;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uDeep;
          uniform vec3 uShallow;
          uniform vec3 uFoam;
          varying float vElevation;
          varying vec2 vUv;
          void main() {
            float mixStrength = (vElevation + 1.0) * 0.5;
            vec3 color = mix(uDeep, uShallow, smoothstep(0.0, 0.7, mixStrength));
            color = mix(color, uFoam, smoothstep(0.85, 1.2, mixStrength) * 0.6);
            float glare = smoothstep(0.45, 0.55, vUv.x) * smoothstep(0.55, 0.45, vUv.x);
            color += vec3(1.0, 0.7, 0.4) * glare * 0.15;
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

function Sun() {
  return (
    <mesh position={[0, 0.4, -10]}>
      <circleGeometry args={[1.4, 64]} />
      <meshBasicMaterial color="#ffb066" />
    </mesh>
  );
}

function FloatingOrbs() {
  const orbs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        pos: [
          (Math.random() - 0.5) * 14,
          Math.random() * 3 + 0.5,
          (Math.random() - 0.5) * 8 - 2,
        ] as [number, number, number],
        scale: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 2 + 1,
        key: i,
      })),
    []
  );
  return (
    <>
      {orbs.map((o) => (
        <Float key={o.key} speed={o.speed} rotationIntensity={0.4} floatIntensity={1.2}>
          <mesh position={o.pos} scale={o.scale}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color="#ffd9a8"
              emissive="#ff7a3d"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export function OceanScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full" suppressHydrationWarning>
      {!mounted && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #1a1235 0%, #4a2a4a 25%, #c45a3a 55%, #f0a060 70%, #2a4a78 100%)",
          }}
        />
      )}
      {mounted && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
          frameloop="always"
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0.8, 5]} fov={55} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 5, -5]} intensity={1.5} color="#ffb066" />
            <pointLight position={[3, 2, 3]} intensity={0.6} color="#ff7a3d" />
            <Sun />
            <Ocean />
            <FloatingOrbs />
            <fog attach="fog" args={["#3a2548", 8, 30]} />
          </Suspense>
        </Canvas>
      )}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,8,24,0.55)_100%)]" />
    </div>
  );
}