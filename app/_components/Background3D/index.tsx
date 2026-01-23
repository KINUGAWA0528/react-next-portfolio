"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Sphere,
  MeshDistortMaterial,
  Environment,
  Stars,
} from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";

function Bubble({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}) {
  const ref = useRef<any>();
  const data = useMemo(
    () => ({
      xAmp: 1.5 + Math.random() * 2,
      yAmp: 1.5 + Math.random() * 2,
      zAmp: 0.5 + Math.random(),
      xFreq: (0.2 + Math.random() * 0.3) / 5,
      yFreq: (0.2 + Math.random() * 0.3) / 5,
      zFreq: (0.1 + Math.random() * 0.3) / 5,
      phase: Math.random() * Math.PI * 2,
    }),
    [],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.position.x =
      position[0] + Math.sin(time * data.xFreq + data.phase) * data.xAmp;
    ref.current.position.y =
      position[1] + Math.cos(time * data.yFreq + data.phase) * data.yAmp;
    ref.current.position.z =
      position[2] + Math.sin(time * data.zFreq + data.phase) * data.zAmp;
  });

  return (
    <group ref={ref}>
      <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} scale={scale}>
          <MeshDistortMaterial
            color="white"
            speed={2}
            distort={0.4}
            radius={1}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Background3D() {
  const pathname = usePathname();
  if (
    pathname === "/contact" ||
    pathname?.startsWith("/profile") ||
    pathname?.startsWith("/works") ||
    pathname?.startsWith("/blog")
  ) {
    return null;
  }
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Suspense fallback={null}>
          <Bubble
            position={[-1.5, 0.5, 0]}
            color="#FFB7B2"
            scale={1.2}
            speed={1.5}
          />
          <Bubble
            position={[1.5, -0.5, -1]}
            color="#A9DEF9"
            scale={1.0}
            speed={2}
          />
          <Bubble
            position={[0, 1.5, -2]}
            color="#E2F0CB"
            scale={0.8}
            speed={1.2}
          />
          <Bubble
            position={[-1, -1.5, -1]}
            color="#FCF6BD"
            scale={0.9}
            speed={1.8}
          />
          <Bubble
            position={[2, 1, -2]}
            color="#FFDAC1"
            scale={1.1}
            speed={1.4}
          />
          <Bubble
            position={[-2.5, -1, -3]}
            color="#E0BBE4"
            scale={0.7}
            speed={1.6}
          />
          <Bubble
            position={[2.5, 2, -1.5]}
            color="#957DAD"
            scale={1.3}
            speed={1.3}
          />
          <Bubble
            position={[1, -2, -2.5]}
            color="#D291BC"
            scale={0.9}
            speed={1.9}
          />
          <Bubble
            position={[-0.5, 2.5, -4]}
            color="#FEC8D8"
            scale={1.5}
            speed={1.1}
          />
          <Bubble
            position={[3, -1.5, -3]}
            color="#FFDFD3"
            scale={0.6}
            speed={2.2}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
