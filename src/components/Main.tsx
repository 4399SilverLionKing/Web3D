'use client';

import React, { Suspense, useState } from 'react';

import { KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';

import ClickableStaticModel from './model/ClickableStatic';
import DynamicModel from './model/Dynamic';
import StaticModel from './model/Static';
import CameraFollow from './tool/CameraFollow';
import Light from './tool/Light';
import ModelDialog, { ModelInfo } from './ui/ModelDialog';

// 键盘控制映射
const keyboardMap = [
  { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
  { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
  { name: 'left', keys: ['KeyA', 'ArrowLeft'] },
  { name: 'right', keys: ['KeyD', 'ArrowRight'] },
];

// 模型信息数据
const modelInfoData: Record<string, ModelInfo> = {
  viking_ship: {
    id: 'viking_ship',
    name: '我的博客',
    description: '这是我的个人博客网站，记录技术学习心得、项目经验和生活感悟。',
    details: [
      '技术栈：SpringBoot + Vue + TypeScript',
      '内容类型：技术博客、项目分享、学习笔记',
    ],
    links: 'blogs.sanyeyeye.xyz',
  },
  caravel_ship: {
    id: 'caravel_ship',
    name: '我的笔记',
    description:
      '这是我的个人笔记网站，整理和分享各种学习资料、技术文档和知识总结。',
    details: [
      '技术栈：Next.js + Nextra + ShadcnUI',
      '内容类型：学习笔记、技术文档、知识整理',
      '特点：分类清晰，搜索便捷',
      '用途：知识管理、学习记录、资料分享',
    ],
    links: 'notes.sanyeyeye.xyz',
  },
};

export default function Scene() {
  // 模型位置状态
  const [modelPosition, setModelPosition] = useState(new Vector3(0, 0, 0));

  // 对话框状态
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(null);

  // 处理模型位置变化
  const handleModelPositionChange = (position: Vector3) => {
    setModelPosition(position);
  };

  // 处理模型点击
  const handleModelClick = (modelInfo: ModelInfo) => {
    setSelectedModel(modelInfo);
    setIsDialogOpen(true);
  };

  // 关闭对话框
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedModel(null);
  };

  return (
    <div className="relative h-full w-full">
      <KeyboardControls map={keyboardMap}>
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

          {/* 可点击的静态模型 - 维京战船 */}
          <Suspense fallback={null}>
            <ClickableStaticModel
              modelPath="/modals/viking_ship.glb"
              scale={10}
              position={[400, -20, 400]}
              rotation={[0, Math.PI * 0.5, 0]}
              modelInfo={modelInfoData.viking_ship}
              onModelClick={handleModelClick}
            />
          </Suspense>

          {/* 可点击的静态模型 - 卡拉维尔帆船 */}
          <Suspense fallback={null}>
            <ClickableStaticModel
              modelPath="/modals/caravel_ship.glb"
              scale={1}
              position={[-300, -10, 300]}
              modelInfo={modelInfoData.caravel_ship}
              onModelClick={handleModelClick}
            />
          </Suspense>

          {/* 动态模型 */}
          <Suspense fallback={null}>
            <DynamicModel
              modelPath="/modals/boat.glb"
              scale={1}
              initialPosition={[50, -5, 600]}
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
      </KeyboardControls>

      {/* 模型信息对话框 */}
      <ModelDialog
        isOpen={isDialogOpen}
        modelInfo={selectedModel}
        onCloseAction={handleCloseDialog}
      />
    </div>
  );
}
