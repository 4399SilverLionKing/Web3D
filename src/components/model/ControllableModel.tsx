'use client';

import React, { useEffect, useRef } from 'react';

import { useBox } from '@react-three/cannon';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';

import type { BaseModelProps } from './BaseModel';
import BaseModel, { preloadModel as preloadBaseModel } from './BaseModel';

// 可控制模型组件的Props接口
interface ControllableModelProps extends BaseModelProps {
  onPositionChange?: (position: Vector3) => void;
  mass?: number;
  forwardForce?: number;
  backwardForce?: number;
  torqueStrength?: number;
  maxSpeed?: number;
  driftCorrection?: number;
}

// 主要的可控制模型组件
export default function ControllableModel({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  onPositionChange,
  physicsSize = [2, 2, 2],
  mass = 1,
  forwardForce = 200,
  backwardForce = 100,
  torqueStrength = 80,
  maxSpeed = 200,
  driftCorrection = 0.8,
}: ControllableModelProps) {
  const groupRef = useRef<Group>(null!);

  // 物理刚体设置
  const [physicsRef, api] = useBox(() => ({
    position,
    rotation,
    args: physicsSize,
    mass,
    type: 'Dynamic',
    material: { friction: 0.05, restitution: 0.05 },
    angularFactor: [0, 1, 0], // 只允许Y轴旋转
    linearDamping: 0.1,
    angularDamping: 0.98,
  }));

  const [, get] = useKeyboardControls();

  // 当前物理状态
  const currentPosition = useRef([0, 0, 0]);
  const currentRotation = useRef([0, 0, 0]);
  const currentVelocity = useRef([0, 0, 0]);

  // 订阅物理状态变化
  useEffect(() => {
    if (!api) return;

    const unsubscribes = [
      api.position.subscribe(pos => {
        currentPosition.current = pos;
        if (onPositionChange) {
          onPositionChange(new Vector3(pos[0], pos[1], pos[2]));
        }
      }),
      api.rotation.subscribe(rot => {
        currentRotation.current = rot;
      }),
      api.velocity.subscribe(vel => {
        currentVelocity.current = vel;
      }),
    ];

    return () => unsubscribes.forEach(unsub => unsub());
  }, [api, onPositionChange]);

  // 主控制循环
  useFrame(() => {
    if (!api || !groupRef.current) return;

    // 1. 同步视觉和物理
    const position = currentPosition.current;
    const rotation = currentRotation.current;
    const velocity = currentVelocity.current;

    groupRef.current.position.set(position[0], position[1], position[2]);
    groupRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);

    // 2. 获取输入和计算基础数据
    const { forward, backward, left, right } = get();
    const yRotation = rotation[1];
    const currentSpeed = Math.sqrt(
      velocity[0] * velocity[0] + velocity[2] * velocity[2]
    );

    // 前进方向向量
    const forwardVector = new Vector3(
      -Math.sin(yRotation),
      0,
      -Math.cos(yRotation)
    );

    // 3. 转向控制
    if (left || right) {
      const torque = left ? torqueStrength : -torqueStrength;
      api.applyTorque([0, torque, 0]);
    }

    // 4. 漂移校正
    if (currentSpeed > 0.5) {
      const velocityVector = new Vector3(
        velocity[0],
        0,
        velocity[2]
      ).normalize();
      const rightVector = new Vector3(
        -Math.cos(yRotation),
        0,
        Math.sin(yRotation)
      );
      const lateralSlip = velocityVector.dot(rightVector);

      if (Math.abs(lateralSlip) > 0.02) {
        const correctionForce = -lateralSlip * mass * 150;
        api.applyForce(
          [rightVector.x * correctionForce, 0, rightVector.z * correctionForce],
          [0, 0, 0]
        );
      }
    }

    // 5. 移动控制
    if (forward && currentSpeed < maxSpeed) {
      // 前进：速度越快，力越小
      const speedFactor = Math.max(0.2, 1 - currentSpeed / maxSpeed);
      api.applyForce(
        [
          forwardVector.x * forwardForce * speedFactor,
          0,
          forwardVector.z * forwardForce * speedFactor,
        ],
        [0, 0, 0]
      );
    }

    if (backward && currentSpeed < maxSpeed * 0.6) {
      // 后退：最大速度限制为60%
      const speedFactor = Math.max(0.2, 1 - currentSpeed / (maxSpeed * 0.6));
      api.applyForce(
        [
          forwardVector.x * -backwardForce * speedFactor,
          0,
          forwardVector.z * -backwardForce * speedFactor,
        ],
        [0, 0, 0]
      );
    }

    // 6. 自然减速
    if (!forward && !backward && currentSpeed > 0.1) {
      const dragFactor = Math.min(currentSpeed * 0.1, 20);
      api.applyForce(
        [
          -velocity[0] * dragFactor * driftCorrection,
          0,
          -velocity[2] * dragFactor * driftCorrection,
        ],
        [0, 0, 0]
      );
    }
  });

  return (
    <group>
      {/* 物理碰撞体 */}
      <mesh ref={physicsRef} visible={false}>
        <boxGeometry args={physicsSize} />
        <meshBasicMaterial
          transparent
          opacity={0.2}
          color="#00ff00"
          wireframe={true}
        />
      </mesh>

      {/* 可视化模型 */}
      <group ref={groupRef}>
        <BaseModel
          modelPath={modelPath}
          scale={scale}
          enablePhysics={false} // 物理由ControllableModel自己管理
        />
      </group>
    </group>
  );
}

// 预加载模型
export function preloadModel(modelPath: string) {
  preloadBaseModel(modelPath);
}
