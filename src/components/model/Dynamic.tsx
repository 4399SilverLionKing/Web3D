'use client';

import React, { useRef, useState } from 'react';

import { useGLTF, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';

import { useMaterialOptimizer } from '../tool/MaterialOptimizer';

interface DynamicModelProps {
  modelPath: string;
  scale?: number;
  initialPosition?: [number, number, number];
  onPositionChange?: (position: Vector3) => void;
  disableBackward?: boolean;
}

export default function DynamicModel({
  modelPath,
  scale = 1,
  initialPosition = [0, 0, 0],
  onPositionChange,
  disableBackward = false,
}: DynamicModelProps) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<Group>(null!);

  // 使用材质优化器
  useMaterialOptimizer(scene, {
    enableDoubleSide: false,
    alphaTest: 0.1,
    depthWrite: true,
    depthTest: true,
    transparent: false,
  });

  // 模型状态
  const [position, setPosition] = useState(new Vector3(...initialPosition));
  const [rotation, setRotation] = useState(0);
  const [velocity, setVelocity] = useState(new Vector3(0, 0, 0));

  // 使用 KeyboardControls hook
  const [, get] = useKeyboardControls();

  // 模型物理参数
  const acceleration = 0.05;
  const maxSpeed = 0.5;
  const friction = 0.95;
  const turnSpeed = 0.005;

  // 物理更新
  useFrame(() => {
    if (!modelRef.current) return;

    // 获取当前键盘状态
    const { forward, backward, left, right } = get();

    let newRotation = rotation;
    let newVelocity = velocity.clone();

    // 转向
    if (left) {
      newRotation += turnSpeed;
    }
    if (right) {
      newRotation -= turnSpeed;
    }

    // 前进/后退
    const forwardVector = new Vector3(
      Math.sin(newRotation),
      0,
      Math.cos(newRotation)
    );

    if (forward) {
      newVelocity.add(forwardVector.multiplyScalar(-acceleration));
    }
    // 只有在未禁用后退时才允许后退动作
    if (backward && !disableBackward) {
      newVelocity.add(forwardVector.multiplyScalar(acceleration));
    }

    // 限制最大速度
    if (newVelocity.length() > maxSpeed) {
      newVelocity.normalize().multiplyScalar(maxSpeed);
    }

    // 应用摩擦力
    newVelocity.multiplyScalar(friction);

    // 更新位置
    const newPosition = position.clone().add(newVelocity);

    // 更新状态
    setRotation(newRotation);
    setVelocity(newVelocity);
    setPosition(newPosition);

    // 更新3D对象
    modelRef.current.position.copy(newPosition);
    modelRef.current.rotation.y = newRotation;

    // 通知父组件位置变化
    if (onPositionChange) {
      onPositionChange(newPosition);
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale}
      position={initialPosition}
    />
  );
}

// 预加载模型
export function preloadModel(modelPath: string) {
  useGLTF.preload(modelPath);
}
