import { ContactShadows, Grid } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import type { QualityMode } from "./types";

interface SceneEnvironmentProps {
  quality: QualityMode;
}

export function SceneEnvironment({ quality }: SceneEnvironmentProps) {
  const dust = useRef<Group>(null);
  const orbitals = useRef<Group>(null);
  const positions = useMemo(() => {
    const amount = quality === "low" ? 130 : quality === "high" ? 620 : 420;
    const values = new Float32Array(amount * 3);
    let seed = 8291;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let index = 0; index < amount; index += 1) {
      values[index * 3] = (random() - 0.5) * 20;
      values[index * 3 + 1] = random() * 6.8 + 0.1;
      values[index * 3 + 2] = (random() - 0.5) * 16;
    }
    return values;
  }, [quality]);

  const sparkPositions = useMemo(() => {
    const amount = quality === "low" ? 42 : quality === "high" ? 160 : 96;
    const values = new Float32Array(amount * 3);
    let seed = 1931;
    const random = () => {
      seed = (seed * 48271) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let index = 0; index < amount; index += 1) {
      const radius = 3.6 + random() * 8.8;
      const angle = random() * Math.PI * 2;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = 0.35 + random() * 6.8;
      values[index * 3 + 2] = Math.sin(angle) * radius * 0.82;
    }
    return values;
  }, [quality]);

  useFrame(({ clock }) => {
    if (!dust.current) return;
    dust.current.rotation.y = clock.getElapsedTime() * 0.019;
    dust.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.14) * 0.025;
    dust.current.position.y = Math.sin(clock.getElapsedTime() * 0.35) * 0.12;
    if (orbitals.current) {
      orbitals.current.rotation.y = clock.getElapsedTime() * 0.075;
      orbitals.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.21) * 0.035;
    }
  });

  return (
    <>
      <color attach="background" args={["#050914"]} />
      <fog attach="fog" args={["#050914", 23, 42]} />
      <ambientLight intensity={0.72} color="#c9ddff" />
      <hemisphereLight args={["#668fff", "#210813", 1.05]} />
      <directionalLight
        position={[6, 10, 7]}
        intensity={1.8}
        color="#dce9ff"
        castShadow={quality !== "low"}
        shadow-mapSize-width={quality === "high" ? 1024 : 512}
        shadow-mapSize-height={quality === "high" ? 1024 : 512}
      />
      <pointLight position={[-7, 4, 3]} color="#1679ff" intensity={26} distance={15} decay={2} />
      <pointLight position={[7, 4, 1]} color="#ff315b" intensity={20} distance={14} decay={2} />
      <pointLight position={[0, 5.5, -5]} color="#7bd8ff" intensity={12} distance={12} decay={2} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[34, 28]} />
        <meshPhysicalMaterial color="#060d1a" metalness={0.65} roughness={0.38} />
      </mesh>
      <Grid
        args={[28, 24]}
        position={[0, 0.012, -0.4]}
        cellSize={0.72}
        cellThickness={0.55}
        cellColor="#162b4c"
        sectionSize={3.6}
        sectionThickness={0.9}
        sectionColor="#234b76"
        fadeDistance={17}
        fadeStrength={1.4}
        infiniteGrid
      />
      <mesh position={[-6.3, 3.8, -3]} rotation={[0, Math.PI / 5, 0]}>
        <planeGeometry args={[4.4, 7]} />
        <meshBasicMaterial color="#1d6eff" transparent opacity={0.035} depthWrite={false} />
      </mesh>
      <mesh position={[6.3, 3.4, -2]} rotation={[0, -Math.PI / 5, 0]}>
        <planeGeometry args={[4.1, 6.4]} />
        <meshBasicMaterial color="#ff2854" transparent opacity={0.035} depthWrite={false} />
      </mesh>
      {quality !== "low" && (
        <group ref={orbitals} position={[0, 2.1, 0.55]}>
          <mesh rotation={[Math.PI / 2.75, 0, 0.38]}>
            <torusGeometry args={[6.4, 0.012, 6, 120]} />
            <meshBasicMaterial color="#287dff" transparent opacity={0.22} depthWrite={false} />
          </mesh>
          <mesh rotation={[Math.PI / 2.2, 0.25, -0.55]}>
            <torusGeometry args={[5.15, 0.009, 6, 96]} />
            <meshBasicMaterial color="#ff466b" transparent opacity={0.16} depthWrite={false} />
          </mesh>
        </group>
      )}
      {quality !== "low" && (
        <ContactShadows
          position={[0, 0.025, -0.3]}
          opacity={0.48}
          scale={17}
          blur={2.6}
          far={9}
          frames={1}
        />
      )}
      <group ref={dust}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#a6dfff"
            size={0.028}
            sizeAttenuation
            transparent
            opacity={0.55}
            depthWrite={false}
          />
        </points>
        <points rotation={[0.08, 0.28, 0]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[sparkPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#8deaff"
            size={0.052}
            sizeAttenuation
            transparent
            opacity={0.7}
            depthWrite={false}
          />
        </points>
        {quality !== "low" && (
          <points rotation={[0, -0.42, 0.08]}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[sparkPositions, 3]} />
            </bufferGeometry>
            <pointsMaterial
              color="#ff6380"
              size={0.027}
              sizeAttenuation
              transparent
              opacity={0.48}
              depthWrite={false}
            />
          </points>
        )}
      </group>
    </>
  );
}
