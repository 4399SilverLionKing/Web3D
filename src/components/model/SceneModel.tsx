'use client';

import React from 'react';

import BaseModel, { BaseModelProps, preloadModel } from './BaseModel';

// 海洋场景模型组件
export default function SceneModel({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}: BaseModelProps) {
  return (
    <BaseModel
      modelPath={modelPath}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}

// 预加载海洋模型
export function preloadSeaModel(modelPath: string) {
  preloadModel(modelPath);
}
