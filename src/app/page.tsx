'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';

import ModelDialog, { ModelInfo } from '@/components/ui/ModelDialog';

const Scene = dynamic(() => import('@/components/Main'), {
  loading: () => <p>Loading 3D scene...</p>,
});

// 网站介绍信息
const websiteInfo: ModelInfo = {
  id: 'website_info',
  name: '我的3D个人网站',
  description:
    '欢迎来到我的3D个人展示网站！这是一个结合了现代Web技术和3D可视化的创新项目。',
  details: [
    '🚀 技术栈：Next.js + Three.js + React Three Fiber',
    '🎨 特色：3D海洋场景 + 交互式船只模型',
    '💡 创新点：沉浸式3D体验 + 响应式设计',
    '🌊 场景：在虚拟海洋中探索我的数字世界',
    '⚡ 性能：优化的3D渲染和流畅的交互体验',
  ],
  links: 'github.com/4399SilverLionKing/Web3D',
};

export default function Home() {
  // 对话框状态管理
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(null);

  // 打开关于我对话框
  const handleOpenAboutDialog = () => {
    setSelectedModel(websiteInfo);
    setIsDialogOpen(true);
  };

  // 关闭对话框
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedModel(null);
  };

  return (
    <main className="relative h-screen w-screen">
      {/* 3D 场景 */}
      <div className="absolute top-0 left-0 h-full w-full">
        <Scene />
      </div>

      {/* 操作说明 */}
      <div className="bg-opacity-50 absolute top-10 left-10 max-w-xs rounded-lg p-4 text-white">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">🚢 模型控制</h3>
          <div className="space-y-1 text-sm">
            <p>
              <kbd className="rounded bg-gray-700 px-2 py-1 text-xs">W</kbd> 或{' '}
              <kbd className="rounded bg-gray-700 px-2 py-1 text-xs">↑</kbd>{' '}
              前进
            </p>
            <p>
              <kbd className="rounded bg-gray-700 px-2 py-1 text-xs">A</kbd> 或{' '}
              <kbd className="rounded bg-gray-700 px-2 py-1 text-xs">←</kbd>{' '}
              后退
            </p>
            <p>
              <kbd className="rounded bg-gray-700 px-2 py-1 text-xs">A</kbd> 或{' '}
              <kbd className="rounded bg-gray-700 px-2 py-1 text-xs">←</kbd>{' '}
              左转
            </p>
            <p>
              <kbd className="rounded bg-gray-700 px-2 py-1 text-xs">D</kbd> 或{' '}
              <kbd className="rounded bg-gray-700 px-2 py-1 text-xs">→</kbd>{' '}
              右转
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">📷 镜头控制</h3>
          <div className="space-y-1 text-sm">
            <p>• 镜头自动跟随船只移动</p>
            <p>• 鼠标拖拽控制镜头朝向</p>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">🎯 交互操作</h3>
          <div className="space-y-1 text-sm">
            <p>• 点击船只查看详细信息</p>
            <p>• 探索海洋中的不同船只</p>
          </div>
        </div>
      </div>

      {/* 关于我按钮 */}
      <div className="absolute top-10 right-10">
        <button
          onClick={handleOpenAboutDialog}
          className="transform rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:scale-105 hover:bg-gray-800 hover:shadow-xl"
        >
          About
        </button>
      </div>

      <ModelDialog
        isOpen={isDialogOpen}
        modelInfo={selectedModel}
        onCloseAction={handleCloseDialog}
      />
    </main>
  );
}
