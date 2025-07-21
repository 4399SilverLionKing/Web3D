'use client';

import React, { Suspense, useRef } from 'react';

import { useBox } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

import { useMaterialOptimizer } from '../tool/MaterialOptimizer';

export interface BaseModelProps {
  modelPath: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  enablePhysics?: boolean;
  physicsSize?: [number, number, number];
}

// 基础模型加载组件
function BaseModelInner({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  enablePhysics = false,
  physicsSize = [1, 1, 1],
}: BaseModelProps) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<Group>(null!);

  // 物理碰撞体引用（总是创建，但仅在启用物理时使用）
  const [physicsRef] = useBox(() => ({
    position,
    args: physicsSize,
    type: 'Static', // 动态模型的物理自己控制
  }));

  // 使用材质优化器
  useMaterialOptimizer(scene, {
    alphaTest: 0.1,
    depthWrite: true,
    depthTest: true,
    transparent: false,
  });

  return (
    <group>
      {/* 物理碰撞体（仅在启用物理时显示） */}
      {enablePhysics && (
        <mesh ref={physicsRef} visible={false}>
          <boxGeometry args={physicsSize} />
          <meshBasicMaterial
            transparent
            opacity={0.8}
            color="#00ff00"
            wireframe={true}
          />
        </mesh>
      )}

      {/* 可视化模型 */}
      <primitive
        ref={modelRef}
        object={scene}
        position={position}
        rotation={rotation}
        scale={scale}
      />
    </group>
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

// 基础模型组件
export default function BaseModel(props: BaseModelProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BaseModelInner {...props} />
    </Suspense>
  );
}

// 预加载模型
export function preloadModel(modelPath: string) {
  useGLTF.preload(modelPath);
}
