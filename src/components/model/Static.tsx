'use client';

import React, { Suspense, useEffect, useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';

import { useMaterialOptimizer } from '../tool/MaterialOptimizer';

// GLB模型组件的Props接口
interface GLBModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  rotationSpeed?: number;
}

// GLB模型加载组件
function GLBModelInner({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  rotationSpeed = 0.5,
}: GLBModelProps) {
  // 使用useGLTF hook加载GLB模型
  const { scene } = useGLTF(modelPath);

  // 模型引用
  const modelRef = useRef<Group>(null!);

  // 使用材质优化器
  useMaterialOptimizer(scene, {
    enableDoubleSide: modelPath.includes('sea'), // 海洋模型使用双面渲染
    alphaTest: 0.1,
    depthWrite: true,
    depthTest: true,
    transparent: false,
  });

  // 自动旋转动画
  useFrame((_, delta) => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

// 加载状态组件
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

// 主要的GLB模型组件，包含Suspense边界
export default function StaticModel(props: GLBModelProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GLBModelInner {...props} />
    </Suspense>
  );
}

// 预加载模型
export function preloadGLBModel(modelPath: string) {
  useGLTF.preload(modelPath);
}
