"use client";

import { Canvas } from "@react-three/fiber";
import {
  Float,
  Sphere,
  MeshDistortMaterial,
  Environment,
} from "@react-three/drei";
import { Suspense } from "react";

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
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 32, 32]} position={position} scale={scale}>
        <MeshDistortMaterial color={color} speed={2} distort={0.4} radius={1} />
      </Sphere>
    </Float>
  );
}

export default function Background3D() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
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
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
