'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';

import { useGLTF } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Group, Mesh, Object3D } from 'three';

import { useMaterialOptimizer } from '../tool/MaterialOptimizer';
import { ModelInfo } from '../ui/ModelDialog';

// 可点击静态模型组件的Props接口
interface ClickableStaticModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  rotationSpeed?: number;
  modelInfo: ModelInfo;
  onModelClick: (modelInfo: ModelInfo) => void;
}

// 可点击静态模型内部组件
function ClickableStaticModelInner({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  rotationSpeed = 0.5,
  modelInfo,
  onModelClick,
}: ClickableStaticModelProps) {
  // 使用useGLTF hook加载GLB模型
  const { scene } = useGLTF(modelPath);

  // 模型引用
  const modelRef = useRef<Group>(null!);

  // 悬停状态
  const [hovered, setHovered] = useState(false);

  // 使用材质优化器
  useMaterialOptimizer(scene, {
    enableDoubleSide: modelPath.includes('sea'), // 海洋模型使用双面渲染
    alphaTest: 0.1,
    depthWrite: true,
    depthTest: true,
    transparent: false,
  });

  // 设置所有子对象为可点击
  useEffect(() => {
    if (scene) {
      scene.traverse((child: Object3D) => {
        if (child instanceof Mesh) {
          // 启用射线检测
          child.userData.clickable = true;
        }
      });
    }
  }, [scene]);

  // 自动旋转动画
  useFrame((_, delta) => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  // 处理点击事件
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onModelClick(modelInfo);
  };

  // 处理鼠标悬停
  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  // 处理鼠标离开
  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={hovered ? scale * 1.05 : scale} // 悬停时稍微放大
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
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

// 主要的可点击静态模型组件，包含Suspense边界
export default function ClickableStaticModel(props: ClickableStaticModelProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ClickableStaticModelInner {...props} />
    </Suspense>
  );
}

// 预加载模型
export function preloadClickableGLBModel(modelPath: string) {
  useGLTF.preload(modelPath);
}
