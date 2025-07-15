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

interface MaterialOptimizerProps {
  target: Object3D;
  enableDoubleSide?: boolean;
  alphaTest?: number;
  depthWrite?: boolean;
  depthTest?: boolean;
  transparent?: boolean;
}

export default function MaterialOptimizer({
  target,
  enableDoubleSide = false,
  alphaTest = 0.1,
  depthWrite = true,
  depthTest = true,
  transparent = false,
}: MaterialOptimizerProps) {
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

  return null;
}

// 导出一个便捷的hook用于材质优化
export function useMaterialOptimizer(
  target: Object3D | null,
  options: Omit<MaterialOptimizerProps, 'target'> = {}
) {
  useEffect(() => {
    if (!target) return;

    const optimizeObject = (obj: Object3D) => {
      obj.traverse(child => {
        if (child instanceof Mesh && child.material) {
          const material = child.material as Material;

          // 应用基本优化
          material.side = options.enableDoubleSide ? DoubleSide : FrontSide;
          material.depthWrite = options.depthWrite ?? true;
          material.depthTest = options.depthTest ?? true;
          material.transparent = options.transparent ?? false;

          if ('alphaTest' in material) {
            material.alphaTest = options.alphaTest ?? 0.1;
          }

          material.needsUpdate = true;
        }
      });
    };

    optimizeObject(target);
  }, [target, options]);
}
