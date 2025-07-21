'use client';

import React, { useEffect, useRef } from 'react';

import { ThreeEvent } from '@react-three/fiber';
import { Group, Mesh, Object3D } from 'three';

import { ModelInfo } from '../ui/ModelDialog';
import type { BaseModelProps } from './BaseModel';
import BaseModel, { preloadModel as preloadBaseModel } from './BaseModel';

// 可点击模型组件的Props接口
interface ClickableModelProps extends BaseModelProps {
  modelInfo: ModelInfo;
  onModelClick: (modelInfo: ModelInfo) => void;
}

// 主要的可点击模型组件
export default function ClickableModel({
  modelPath,
  modelInfo,
  onModelClick,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  enablePhysics = false,
  physicsSize = [1, 1, 1],
}: ClickableModelProps) {
  // 模型组引用
  const groupRef = useRef<Group>(null!);

  // 设置所有子对象为可点击
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child: Object3D) => {
        if (child instanceof Mesh) {
          // 启用射线检测
          child.userData.clickable = true;
        }
      });
    }
  }, []);

  // 处理点击事件
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onModelClick(modelInfo);
  };

  // 处理鼠标悬停
  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  // 处理鼠标离开
  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    document.body.style.cursor = 'auto';
  };

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <BaseModel
        modelPath={modelPath}
        position={position}
        rotation={rotation}
        scale={scale}
        enablePhysics={enablePhysics}
        physicsSize={physicsSize}
      />
    </group>
  );
}

// 预加载模型
export function preloadModel(modelPath: string) {
  preloadBaseModel(modelPath);
}
