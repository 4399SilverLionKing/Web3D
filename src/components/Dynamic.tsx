'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';

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

  // 模型状态
  const [position, setPosition] = useState(new Vector3(...initialPosition));
  const [rotation, setRotation] = useState(0);
  const [velocity, setVelocity] = useState(new Vector3(0, 0, 0));

  // 键盘状态
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // 模型物理参数
  const acceleration = 0.05;
  const maxSpeed = 0.5;
  const friction = 0.95;
  const turnSpeed = 0.005;

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          setKeys(prev => ({ ...prev, forward: true }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          // 只有在未禁用后退时才允许后退
          if (!disableBackward) {
            setKeys(prev => ({ ...prev, backward: true }));
          }
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setKeys(prev => ({ ...prev, left: true }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setKeys(prev => ({ ...prev, right: true }));
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          setKeys(prev => ({ ...prev, forward: false }));
          break;
        case 'KeyS':
        case 'ArrowDown':
          // 只有在未禁用后退时才处理后退键释放
          if (!disableBackward) {
            setKeys(prev => ({ ...prev, backward: false }));
          }
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setKeys(prev => ({ ...prev, left: false }));
          break;
        case 'KeyD':
        case 'ArrowRight':
          setKeys(prev => ({ ...prev, right: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [disableBackward]);

  // 物理更新
  useFrame(() => {
    if (!modelRef.current) return;

    let newRotation = rotation;
    let newVelocity = velocity.clone();

    // 转向
    if (keys.left) {
      newRotation += turnSpeed;
    }
    if (keys.right) {
      newRotation -= turnSpeed;
    }

    // 前进/后退
    const forward = new Vector3(
      Math.sin(newRotation),
      0,
      Math.cos(newRotation)
    );

    if (keys.forward) {
      newVelocity.add(forward.multiplyScalar(-acceleration));
    }
    // 只有在未禁用后退时才允许后退动作
    if (keys.backward && !disableBackward) {
      newVelocity.add(forward.multiplyScalar(acceleration));
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
