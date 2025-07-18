'use client';

import React from 'react';

interface LightProps {
  // 环境光设置
  ambientIntensity?: number;
  ambientColor?: string;

  // 主方向光设置
  mainLightIntensity?: number;
  mainLightColor?: string;
  mainLightPosition?: [number, number, number];
  enableShadows?: boolean;

  // 辅助光设置
  fillLightIntensity?: number;
  fillLightColor?: string;
  fillLightPosition?: [number, number, number];

  // 点光源设置
  pointLightIntensity?: number;
  pointLightColor?: string;
  pointLightPosition?: [number, number, number];
  pointLightDistance?: number;

  // 半球光设置
  hemisphereIntensity?: number;
  hemisphereSkyColor?: string;
  hemisphereGroundColor?: string;

  // 雾效果设置
  enableFog?: boolean;
  fogColor?: string;
  fogNear?: number;
  fogFar?: number;
}

export default function Light({
  // 环境光默认值
  ambientIntensity = 0.5,
  ambientColor = '#ffffff',

  // 主方向光默认值
  mainLightIntensity = 1.2,
  mainLightColor = '#ffffff',
  mainLightPosition = [100, 100, 50],
  enableShadows = true,

  // 辅助光默认值
  fillLightIntensity = 0.4,
  fillLightColor = '#87CEEB',
  fillLightPosition = [-50, 50, -50],

  // 点光源默认值
  pointLightIntensity = 0.5,
  pointLightColor = '#ffffff',
  pointLightPosition = [0, 50, 0],
  pointLightDistance = 1000,

  // 半球光默认值
  hemisphereIntensity = 0.3,
  hemisphereSkyColor = '#87CEEB',
  hemisphereGroundColor = '#654321',

  // 雾效果默认值
  enableFog = true,
  fogColor = '#87CEEB',
  fogNear = 100,
  fogFar = 2000,
}: LightProps) {
  return (
    <>
      {/* 环境光 - 提供整体基础照明 */}
      <ambientLight intensity={ambientIntensity} color={ambientColor} />

      {/* 主方向光 - 模拟太阳光 */}
      <directionalLight
        position={mainLightPosition}
        intensity={mainLightIntensity}
        color={mainLightColor}
        castShadow={enableShadows}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={1000}
        shadow-camera-left={-500}
        shadow-camera-right={500}
        shadow-camera-top={500}
        shadow-camera-bottom={-500}
      />

      {/* 辅助方向光 - 填充阴影 */}
      <directionalLight
        position={fillLightPosition}
        intensity={fillLightIntensity}
        color={fillLightColor}
      />

      {/* 点光源 - 增加局部亮度 */}
      <pointLight
        position={pointLightPosition}
        intensity={pointLightIntensity}
        color={pointLightColor}
        distance={pointLightDistance}
      />

      {/* 半球光 - 模拟天空和地面的反射光 */}
      <hemisphereLight
        args={[hemisphereSkyColor, hemisphereGroundColor, hemisphereIntensity]}
      />

      {/* 雾效果 - 改善远处场景的视觉效果 */}
      {enableFog && <fog attach="fog" args={[fogColor, fogNear, fogFar]} />}
    </>
  );
}
