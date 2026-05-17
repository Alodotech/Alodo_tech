"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";

// Constants for mapping SVG coordinates to 3D space
const OFFSET_X = 320;
const OFFSET_Y = 360;
const SCALE = 0.015;

const mapCoords = (x: number, y: number, z: number = 0) => {
  return [(x - OFFSET_X) * SCALE, -(y - OFFSET_Y) * SCALE, z] as [number, number, number];
};

const inAfrica = (x: number, y: number) => {
  const ellipses = [
    { cx: 320, cy: 220, rx: 130, ry: 100 },
    { cx: 310, cy: 350, rx: 150, ry: 120 },
    { cx: 330, cy: 480, rx: 110, ry: 110 },
    { cx: 410, cy: 250, rx: 80, ry: 70 },
  ];
  for (const e of ellipses) {
    const dx = (x - e.cx) / e.rx;
    const dy = (y - e.cy) / e.ry;
    if (dx * dx + dy * dy <= 1) return true;
  }
  return false;
};

function PointCloud() {
  const points = useMemo(() => {
    const positions = [];
    for (let y = 100; y < 620; y += 14) {
      for (let x = 150; x < 520; x += 14) {
        if (inAfrica(x, y)) {
          const jx = (Math.random() - 0.5) * 3;
          const jy = (Math.random() - 0.5) * 3;
          // Add random depth to form a slight spherical surface or just a thick cloud
          const depth = (Math.random() - 0.5) * 1.5; 
          const [px, py, pz] = mapCoords(x + jx, y + jy, depth);
          positions.push(px, py, pz);
        }
      }
    }
    return new Float32Array(positions);
  }, []);

  return (
    <Points positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#0A0A0A"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

function ConnectionNodes() {
  const nodes = [
    { cx: 290, cy: 200, color: "#0057FF" },
    { cx: 330, cy: 290, color: "#00C2A8" },
    { cx: 270, cy: 380, color: "#0057FF" },
    { cx: 370, cy: 430, color: "#00C2A8" },
    { cx: 320, cy: 540, color: "#0057FF" },
    { cx: 240, cy: 250, color: "#00C2A8" },
  ];

  const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [5, 1],
  ];

  // We assign a consistent slight depth to the nodes so they pop out
  const NODE_Z = 0.5;

  return (
    <group>
      {/* Draw Nodes */}
      {nodes.map((n, i) => {
        const [x, y, z] = mapCoords(n.cx, n.cy, NODE_Z);
        return (
          <Float key={`node-${i}`} speed={2} rotationIntensity={0} floatIntensity={0.5}>
            <Sphere args={[0.08, 16, 16]} position={[x, y, z]}>
              <meshBasicMaterial color={n.color} />
            </Sphere>
            {/* Glowing outer sphere */}
            <Sphere args={[0.15, 16, 16]} position={[x, y, z]}>
              <meshBasicMaterial color={n.color} transparent opacity={0.3} />
            </Sphere>
          </Float>
        );
      })}

      {/* Draw Lines */}
      {lines.map(([n1, n2], i) => {
        const p1 = mapCoords(nodes[n1].cx, nodes[n1].cy, NODE_Z);
        const p2 = mapCoords(nodes[n2].cx, nodes[n2].cy, NODE_Z);
        return (
          <Line
            key={`line-${i}`}
            points={[p1, p2]}
            color="#0A0A0A"
            lineWidth={1}
            transparent
            opacity={0.15}
          />
        );
      })}
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Mouvement de base plus rapide et plus ample
      const baseRotY = Math.sin(state.clock.elapsedTime * 0.6) * 0.4;
      const baseRotX = Math.cos(state.clock.elapsedTime * 0.4) * 0.2;
      
      // Interaction avec la souris beaucoup plus forte
      const mouseX = (state.pointer.x * Math.PI) / 3;
      const mouseY = (state.pointer.y * Math.PI) / 3;
      
      // Cible finale combinant l'animation automatique et la souris
      const targetY = baseRotY + mouseX;
      const targetX = baseRotX - mouseY;

      // Interpolation plus réactive (0.1 au lieu de 0.05)
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <PointCloud />
      <ConnectionNodes />
    </group>
  );
}

export default function Hero3DMap() {
  return (
    <div 
      style={{ 
        position: "absolute", 
        right: "-4%", 
        top: "50%", 
        transform: "translateY(-50%)", 
        width: "58%", 
        height: "800px", 
        opacity: 0.92 
      }}
    >
      {/* Background radial gradient to mimic the SVG one */}
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "520px",
          height: "520px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(0,87,255,0.15) 0%, rgba(0,87,255,0) 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 6.0], fov: 45 }}
        style={{ pointerEvents: "auto" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1} />
        <Scene />
      </Canvas>
    </div>
  );
}
