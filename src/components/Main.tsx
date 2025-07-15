'use client';

import React, { Suspense, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';

import CameraFollow from './CameraFollow';
import DynamicModel from './Dynamic';
import Light from './Light';
import StaticModel from './Static';

export default function Scene() {
  // 模型位置状态
  const [modelPosition, setModelPosition] = useState(new Vector3(0, 0, 0));

  // 处理模型位置变化
  const handleModelPositionChange = (position: Vector3) => {
    setModelPosition(position);
  };

  return (
    <div className="relative h-full w-full">
      <Canvas
        // 相机初始化
        camera={{
          position: [0, 10, 20],
          fov: 60,
          near: 1,
          far: 15000,
        }}
        // 启用抗锯齿和优化设置
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        {/* 光照系统 */}
        <Light fogNear={100} fogFar={1500} fogColor="#B0E0E6" />

        {/* 场景模型 */}
        <Suspense fallback={null}>
          <StaticModel
            modelPath="/modals/sea.glb"
            scale={1}
            position={[0, 0, 0]}
          />
        </Suspense>

        {/* 动态模型 */}
        <Suspense fallback={null}>
          <DynamicModel
            modelPath="/modals/boat.glb"
            scale={1}
            initialPosition={[400, 0, 0]}
            onPositionChange={handleModelPositionChange}
            disableBackward={true}
          />
        </Suspense>

        {/* 相机跟随 */}
        <CameraFollow
          target={[modelPosition.x, modelPosition.y, modelPosition.z]}
          smoothness={0.1}
        />
      </Canvas>
    </div>
  );
}
