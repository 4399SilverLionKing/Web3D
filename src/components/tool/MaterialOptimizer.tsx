'use client';

import { useEffect } from 'react';

import {
  DoubleSide,
  FrontSide,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
} from 'three';

// 材质优化选项接口
export interface MaterialOptimizerOptions {
  enableDoubleSide?: boolean;
  alphaTest?: number;
  depthWrite?: boolean;
  depthTest?: boolean;
  transparent?: boolean;
}

/**
 * 材质优化 Hook
 * 用于优化 Three.js 模型的材质和几何体性能
 *
 * @param target - 要优化的 3D 对象
 * @param options - 优化选项
 */
export function useMaterialOptimizer(
  target: Object3D | null,
  options: MaterialOptimizerOptions = {}
) {
  const {
    enableDoubleSide = false,
    alphaTest = 0.1,
    depthWrite = true,
    depthTest = true,
    transparent = false,
  } = options;

  useEffect(() => {
    if (!target) return;

    const optimizeMaterial = (material: Material) => {
      // 设置面剔除
      material.side = enableDoubleSide ? DoubleSide : FrontSide;

      // 设置深度测试和写入
      material.depthWrite = depthWrite;
      material.depthTest = depthTest;

      // 设置透明度
      material.transparent = transparent;

      // 设置alpha测试阈值
      if ('alphaTest' in material) {
        material.alphaTest = alphaTest;
      }

      // 针对标准材质的优化
      if (
        material instanceof MeshStandardMaterial ||
        material instanceof MeshPhysicalMaterial
      ) {
        // 启用环境遮蔽
        material.aoMapIntensity = 1.0;

        // 优化金属度和粗糙度
        if (material.metalness !== undefined) {
          material.metalness = Math.max(0, Math.min(1, material.metalness));
        }
        if (material.roughness !== undefined) {
          material.roughness = Math.max(0.04, Math.min(1, material.roughness));
        }

        // 启用环境光遮蔽
        material.envMapIntensity = 1.0;
      }

      // 标记材质需要更新
      material.needsUpdate = true;
    };

    // 遍历目标对象及其子对象
    target.traverse(child => {
      if (child instanceof Mesh && child.material) {
        if (Array.isArray(child.material)) {
          // 处理多材质
          child.material.forEach(optimizeMaterial);
        } else {
          // 处理单材质
          optimizeMaterial(child.material);
        }

        // 优化几何体
        if (child.geometry) {
          // 计算边界球和边界盒以优化剔除
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();

          // 启用视锥体剔除
          child.frustumCulled = true;
        }
      }
    });
  }, [target, enableDoubleSide, alphaTest, depthWrite, depthTest, transparent]);
}
