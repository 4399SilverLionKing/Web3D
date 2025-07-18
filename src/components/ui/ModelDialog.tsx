'use client';

import React from 'react';

// 模型信息接口
export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  details?: string[];
  image?: string;
  links?: string;
}

// 对话框组件Props
interface ModelDialogProps {
  isOpen: boolean;
  modelInfo: ModelInfo | null;
  onCloseAction: () => void;
}

// 模型对话框组件
export default function ModelDialog({
  isOpen,
  modelInfo,
  onCloseAction: onClose,
}: ModelDialogProps) {
  if (!isOpen || !modelInfo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose} />

      {/* 对话框内容 */}
      <div className="relative z-10 mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
        {/* 头部 */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {modelInfo.name}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 transition-colors hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6">
          {/* 图片 */}
          {modelInfo.image && (
            <div className="mb-4">
              <img
                src={modelInfo.image}
                alt={modelInfo.name}
                className="h-32 w-full rounded-lg object-cover"
              />
            </div>
          )}

          {/* 描述 */}
          <p className="mb-4 text-gray-700">{modelInfo.description}</p>

          {/* 详细信息 */}
          {modelInfo.details && modelInfo.details.length > 0 && (
            <div className="mb-4">
              <h3 className="mb-2 text-sm font-medium text-gray-900">
                详细信息:
              </h3>
              <ul className="space-y-1">
                {modelInfo.details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-gray-600"
                  >
                    <span className="mt-2 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 相关链接 */}
          {modelInfo.links && (
            <div>
              <div className="space-y-2">
                <a
                  href={`http://${modelInfo.links}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                >
                  {modelInfo.links}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="flex justify-end border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
