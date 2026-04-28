import { useEffect, useRef, useState } from "react";

// Dynamically import Three.js only on client
async function loadWebGL(canvas: HTMLCanvasElement) {
  const THREE = await import("three");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("#3a2548", 8, 30);

  const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0.8, 5);
  camera.lookAt(0, 0, 0);

  // Ocean
  const geo = new THREE.PlaneGeometry(60, 60, 140, 140);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color("#0a1838") },
      uShallow: { value: new THREE.Color("#3b6ea5") },
      uFoam: { value: new THREE.Color("#ffb780") },
    },
    vertexShader: `
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
    `,
    fragmentShader: `
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
    `,
  });
  const ocean = new THREE.Mesh(geo, mat);
  ocean.rotation.x = -Math.PI / 2.2;
  ocean.position.y = -2.4;
  scene.add(ocean);

  // Sun
  const sun = new THREE.Mesh(
    new THREE.CircleGeometry(1.4, 64),
    new THREE.MeshBasicMaterial({ color: "#ffb066" })
  );
  sun.position.set(0, 0.4, -10);
  scene.add(sun);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const dirLight = new THREE.DirectionalLight("#ffb066", 1.5);
  dirLight.position.set(0, 5, -5);
  scene.add(dirLight);
  const ptLight = new THREE.PointLight("#ff7a3d", 0.6);
  ptLight.position.set(3, 2, 3);
  scene.add(ptLight);

  let animId: number;
  const clock = new THREE.Clock();

  function animate() {
    animId = requestAnimationFrame(animate);
    mat.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  }
  animate();

  const onResize = () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  };
  window.addEventListener("resize", onResize);

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener("resize", onResize);
    renderer.dispose();
  };
}

export function OceanScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cleanup: (() => void) | undefined;

    loadWebGL(canvas)
      .then((fn) => { cleanup = fn; })
      .catch(() => setWebglFailed(true));

    return () => cleanup?.();
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full" suppressHydrationWarning>
      {/* Always-visible CSS gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1a1235 0%, #4a2a4a 25%, #c45a3a 55%, #f0a060 70%, #2a4a78 100%)",
        }}
      />
      {/* WebGL canvas — only renders on client */}
      {!webglFailed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 1 }}
        />
      )}
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,8,24,0.55)_100%)]" />
    </div>
  );
}