'use client';

import { useRef } from 'react';

import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

interface CameraFollowProps {
  target: [number, number, number];
  smoothness?: number;
}

export default function CameraFollow({
  target,
  smoothness = 0.1,
}: CameraFollowProps) {
  const controlsRef = useRef<any>(null);
  const targetPosition = useRef(new Vector3());

  useFrame(() => {
    // 获取目标坐标
    const targetVector = new Vector3(...target);
    targetPosition.current.lerp(targetVector, smoothness);

    // 跟随目标
    if (controlsRef.current) {
      controlsRef.current.target.copy(targetPosition.current);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      target={target}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={10}
      maxDistance={200}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2.2}
      dampingFactor={0.05}
      enableDamping={true}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      panSpeed={0.8}
    />
  );
}
