# Web3D - 3D 海洋个人展示网站

<div align="center">

![Web3D Logo](https://img.shields.io/badge/Web3D-3D%20Ocean%20Portfolio-blue?style=for-the-badge)

一个基于 Next.js 和 Three.js 构建的沉浸式 3D 海洋个人展示网站，让访客在虚拟海洋中探索您的数字世界。

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.178.0-green?style=flat-square&logo=three.js)](https://threejs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[在线演示](https://your-demo-url.com) • [功能特性](#功能特性) • [快速开始](#快速开始) • [项目结构](#项目结构)

</div>

## 📖 项目简介

Web3D 是一个创新的 3D 个人展示网站，将传统的个人主页转化为一个沉浸式的海洋探索体验。访客可以控制一艘小船在虚拟海洋中航行，发现和探索代表不同项目和内容的船只模型，每个模型都包含详细的项目信息和链接。

### 🎯 设计理念

- **沉浸式体验**：通过 3D 海洋场景创造独特的浏览体验
- **交互式导航**：用户可以自由控制船只探索内容
- **视觉吸引力**：现代化的 3D 渲染和流畅的动画效果
- **响应式设计**：适配各种设备和屏幕尺寸
- **性能优化**：高效的 3D 渲染和资源管理

## ✨ 功能特性

### 🚢 3D 海洋场景

- **真实海洋环境**：完整的 3D 海洋场景，包含水面效果和天空盒
- **动态光照系统**：自然的光照效果和雾化效果
- **流畅动画**：60fps 的流畅 3D 渲染体验

### 🎮 交互式控制

- **船只控制**：使用 WASD 或方向键控制船只移动
- **相机跟随**：智能相机系统自动跟随船只移动
- **鼠标交互**：支持鼠标拖拽控制视角

### 🏴‍☠️ 可交互模型

- **多种船只模型**：维京战船、卡拉维尔帆船等不同类型的船只
- **点击交互**：点击船只查看详细项目信息
- **信息展示**：弹窗展示项目详情、技术栈和相关链接

### 🎨 现代化 UI

- **响应式设计**：适配桌面端和移动端
- **优雅的界面**：使用 Tailwind CSS 构建的现代化界面
- **操作指南**：清晰的操作说明和快捷键提示

## 🛠️ 技术栈

### 前端框架

- **[Next.js 15.3.5](https://nextjs.org/)** - React 全栈框架
- **[React 19.0.0](https://reactjs.org/)** - 用户界面库
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - 类型安全的 JavaScript

### 3D 渲染

- **[Three.js 0.178.0](https://threejs.org/)** - 3D 图形库
- **[React Three Fiber 9.2.0](https://docs.pmnd.rs/react-three-fiber)** - React 的 Three.js 渲染器
- **[React Three Drei 10.5.0](https://docs.pmnd.rs/drei)** - Three.js 实用工具集

### 样式和 UI

- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **响应式设计** - 移动端友好的界面设计

### 开发工具

- **[ESLint](https://eslint.org/)** - 代码质量检查
- **[Prettier](https://prettier.io/)** - 代码格式化
- **[Turbopack](https://turbo.build/pack)** - 快速构建工具

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm、yarn 或 pnpm 包管理器

### 安装步骤

1. **克隆项目**

   ```bash
   git clone https://github.com/4399SilverLionKing/Web3D.git
   cd Web3D
   ```

2. **安装依赖**

   ```bash
   # 使用 npm
   npm install

   # 或使用 yarn
   yarn install

   # 或使用 pnpm
   pnpm install
   ```

3. **启动开发服务器**

   ```bash
   # 使用 npm
   npm run dev

   # 或使用 yarn
   yarn dev

   # 或使用 pnpm
   pnpm dev
   ```

4. **访问应用**

   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 可用脚本

```bash
# 开发模式（使用 Turbopack）
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 代码格式化
npm run format

# 检查代码格式
npm run format:check

# 修复代码格式
npm run format:fix
```

## 🎮 使用指南

### 基本操作

#### 🚢 船只控制

- **前进**：`W` 键 或 `↑` 方向键
- **后退**：`S` 键 或 `↓` 方向键
- **左转**：`A` 键 或 `←` 方向键
- **右转**：`D` 键 或 `→` 方向键

#### 📷 视角控制

- **相机跟随**：相机会自动跟随船只移动
- **视角调整**：使用鼠标拖拽调整观察角度

#### 🎯 交互操作

- **查看信息**：点击海洋中的船只模型查看详细信息
- **关闭弹窗**：点击弹窗外部区域或关闭按钮
- **关于页面**：点击右上角 "About" 按钮查看网站信息

### 探索内容

当前场景中包含以下可交互的船只：

1. **维京战船** 🏴‍☠️
   - 位置：海洋东南方向
   - 内容：个人博客网站
   - 技术栈：SpringBoot + Vue + TypeScript

2. **卡拉维尔帆船** ⛵
   - 位置：海洋西南方向
   - 内容：个人笔记网站
   - 技术栈：Next.js + Nextra + ShadcnUI

## 📁 项目结构

```
Web3D/
├── public/                     # 静态资源
│   └── modals/                # 3D 模型文件
│       ├── boat.glb          # 可控制的小船模型
│       ├── caravel_ship.glb  # 卡拉维尔帆船模型
│       ├── sea.glb           # 海洋场景模型
│       └── viking_ship.glb   # 维京战船模型
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── globals.css       # 全局样式
│   │   ├── layout.tsx        # 根布局组件
│   │   └── page.tsx          # 主页面组件
│   └── components/           # React 组件
│       ├── Main.tsx          # 主 3D 场景组件
│       ├── model/            # 3D 模型组件
│       │   ├── ClickableStatic.tsx  # 可点击静态模型
│       │   ├── Dynamic.tsx          # 动态可控制模型
│       │   └── Static.tsx           # 静态模型
│       ├── tool/             # 工具组件
│       │   ├── CameraFollow.tsx     # 相机跟随控制
│       │   ├── Light.tsx            # 光照系统
│       │   └── MaterialOptimizer.tsx # 材质优化器
│       └── ui/               # UI 组件
│           └── ModelDialog.tsx      # 模型信息弹窗
├── eslint.config.mjs         # ESLint 配置
├── next.config.ts            # Next.js 配置
├── package.json              # 项目依赖和脚本
├── postcss.config.mjs        # PostCSS 配置
├── tailwind.config.js        # Tailwind CSS 配置
├── tsconfig.json             # TypeScript 配置
└── vercel.json               # Vercel 部署配置
```

### 核心组件说明

#### 🎬 场景组件

- **Main.tsx**：主 3D 场景容器，管理所有 3D 元素和交互逻辑
- **Light.tsx**：光照系统，包含环境光、方向光和雾效
- **CameraFollow.tsx**：相机跟随系统，实现平滑的相机跟踪

#### 🚢 模型组件

- **Dynamic.tsx**：可控制的动态模型（玩家船只）
- **Static.tsx**：静态装饰模型（海洋场景）
- **ClickableStatic.tsx**：可点击的静态模型（展示内容的船只）

#### 🛠️ 工具组件

- **MaterialOptimizer.tsx**：材质优化器，提升渲染性能
- **ModelDialog.tsx**：信息展示弹窗组件

## ⚙️ 配置说明

### 3D 渲染配置

项目使用了以下 3D 渲染优化配置：

```typescript
// Canvas 配置
camera={{
  position: [0, 10, 20],
  fov: 60,
  near: 1,
  far: 15000,
}}

// WebGL 渲染器配置
gl={{
  antialias: true,
  alpha: false,
  powerPreference: 'high-performance',
  stencil: false,
  depth: true,
}}
```

### 键盘控制配置

```typescript
const keyboardMap = [
  { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
  { name: 'backward', keys: ['KeyS', 'ArrowDown'] },
  { name: 'left', keys: ['KeyA', 'ArrowLeft'] },
  { name: 'right', keys: ['KeyD', 'ArrowRight'] },
];
```

## 🎨 自定义配置

### 添加新的船只模型

1. **准备 3D 模型**
   - 支持格式：GLB/GLTF
   - 建议优化：低面数、合理的纹理尺寸
   - 放置位置：`public/modals/` 目录

2. **添加模型信息**

   ```typescript
   // 在 src/components/Main.tsx 中添加
   const modelInfoData: Record<string, ModelInfo> = {
     your_new_ship: {
       id: 'your_new_ship',
       name: '您的项目名称',
       description: '项目描述',
       details: ['技术栈：...', '特点：...'],
       links: 'your-website.com',
     },
   };
   ```

3. **添加到场景**
   ```tsx
   <ClickableStaticModel
     modelPath="/modals/your_ship.glb"
     scale={1}
     position={[x, y, z]}
     modelInfo={modelInfoData.your_new_ship}
     onModelClick={handleModelClick}
   />
   ```

### 调整场景参数

#### 修改海洋大小和位置

```typescript
// 在 Main.tsx 中调整海洋模型
<StaticModel
  modelPath="/modals/sea.glb"
  scale={2}  // 调整大小
  position={[0, -10, 0]}  // 调整位置
/>
```

#### 调整光照效果

```typescript
// 在 Light.tsx 中修改
<Light
  fogNear={50}      // 雾效开始距离
  fogFar={2000}     // 雾效结束距离
  fogColor="#87CEEB" // 雾效颜色
/>
```

#### 修改相机跟随参数

```typescript
// 在 CameraFollow.tsx 中调整
<CameraFollow
  target={targetPosition}
  smoothness={0.05}  // 跟随平滑度 (0-1)
  offset={[0, 15, 25]}  // 相机偏移量
/>
```

## 🚀 部署指南

### Vercel 部署（推荐）

1. **连接 GitHub**
   - 将项目推送到 GitHub 仓库
   - 在 [Vercel](https://vercel.com) 中导入项目

2. **配置构建设置**

   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install"
   }
   ```

3. **环境变量**（如需要）
   - 在 Vercel 控制台中设置环境变量

### 其他部署平台

#### Netlify

```bash
# 构建命令
npm run build

# 发布目录
out
```

#### 自托管

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 🔧 开发指南

### 添加新功能

1. **创建新组件**

   ```bash
   # 在相应目录下创建组件文件
   touch src/components/your-component/YourComponent.tsx
   ```

2. **遵循项目结构**
   - 3D 相关组件放在 `components/model/` 或 `components/tool/`
   - UI 组件放在 `components/ui/`
   - 工具函数放在 `utils/`（如需要）

3. **使用 TypeScript**
   - 为所有组件定义 Props 接口
   - 使用严格的类型检查

### 性能优化建议

1. **3D 模型优化**
   - 使用 Draco 压缩
   - 合理控制面数和纹理大小
   - 使用 LOD（细节层次）技术

2. **代码优化**
   - 使用 `React.memo` 包装静态组件
   - 合理使用 `useMemo` 和 `useCallback`
   - 避免在渲染循环中创建新对象

3. **资源加载优化**
   - 使用 `Suspense` 进行懒加载
   - 预加载关键 3D 模型
   - 使用适当的图片格式和压缩

### 调试技巧

1. **3D 场景调试**

   ```typescript
   // 添加辅助工具
   import { OrbitControls, Stats } from '@react-three/drei';

   // 在开发环境中启用
   {process.env.NODE_ENV === 'development' && (
     <>
       <OrbitControls />
       <Stats />
     </>
   )}
   ```

2. **性能监控**
   - 使用浏览器开发者工具的 Performance 面板
   - 监控 FPS 和内存使用情况
   - 使用 React DevTools Profiler

## 🤝 贡献指南

### 提交代码

1. **Fork 项目**
2. **创建功能分支**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **提交更改**

   ```bash
   git commit -m "feat: add your feature description"
   ```

4. **推送分支**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **创建 Pull Request**

### 代码规范

- 使用 ESLint 和 Prettier 保持代码风格一致
- 遵循 TypeScript 最佳实践
- 为新功能添加适当的注释
- 确保所有测试通过

### 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

## 🐛 常见问题

### 性能问题

**Q: 3D 场景运行缓慢怎么办？**

A: 尝试以下解决方案：

1. 降低浏览器窗口大小
2. 关闭其他占用 GPU 的应用程序
3. 更新显卡驱动程序
4. 在代码中调整渲染质量设置

**Q: 模型加载失败？**

A: 检查以下几点：

1. 确认模型文件路径正确
2. 检查模型文件格式（支持 GLB/GLTF）
3. 确认模型文件大小合理（建议 < 10MB）
4. 检查浏览器控制台错误信息

### 控制问题

**Q: 键盘控制不响应？**

A: 确保：

1. 页面已获得焦点（点击页面任意位置）
2. 没有其他应用程序占用键盘输入
3. 浏览器支持 KeyboardEvent API

**Q: 相机跟随异常？**

A: 可能的解决方案：

1. 刷新页面重新初始化
2. 检查浏览器控制台是否有错误
3. 尝试调整相机跟随参数

### 兼容性问题

**Q: 在某些浏览器中无法正常显示？**

A: Web3D 需要支持 WebGL 的现代浏览器：

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

**Q: 移动设备上体验不佳？**

A: 移动设备限制：

1. 性能相对较低，可能出现卡顿
2. 触控操作与键盘控制不同
3. 建议在桌面设备上获得最佳体验

## 📊 性能指标

### 推荐系统配置

**最低配置：**

- CPU: Intel i3 或同等性能
- GPU: 集成显卡
- RAM: 4GB
- 浏览器: Chrome 80+ / Firefox 75+

**推荐配置：**

- CPU: Intel i5 或同等性能
- GPU: 独立显卡
- RAM: 8GB
- 浏览器: Chrome 最新版

### 性能优化指标

- **目标帧率**: 60 FPS
- **内存使用**: < 200MB
- **初始加载时间**: < 5 秒
- **模型加载时间**: < 2 秒

## 🔗 相关链接

### 官方文档

- [Next.js 官方文档](https://nextjs.org/docs)
- [Three.js 官方文档](https://threejs.org/docs/)
- [React Three Fiber 文档](https://docs.pmnd.rs/react-three-fiber)
- [React Three Drei 文档](https://docs.pmnd.rs/drei)

### 学习资源

- [Three.js Journey](https://threejs-journey.com/) - Three.js 学习课程
- [React Three Fiber 教程](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [3D 模型资源](https://sketchfab.com/) - 免费 3D 模型下载

### 工具推荐

- [Blender](https://www.blender.org/) - 免费 3D 建模软件
- [glTF Viewer](https://gltf-viewer.donmccurdy.com/) - 在线 glTF 模型查看器
- [Three.js Editor](https://threejs.org/editor/) - 在线 Three.js 场景编辑器

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 👨‍💻 作者

**4399SilverLionKing**

- GitHub: [@4399SilverLionKing](https://github.com/4399SilverLionKing)
- 博客: [blogs.sanyeyeye.xyz](https://blogs.sanyeyeye.xyz)
- 笔记: [notes.sanyeyeye.xyz](https://notes.sanyeyeye.xyz)

## 🙏 致谢

感谢以下开源项目和社区：

- [Next.js](https://nextjs.org/) - 强大的 React 框架
- [Three.js](https://threejs.org/) - 优秀的 3D 图形库
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React 的 Three.js 集成
- [Tailwind CSS](https://tailwindcss.com/) - 实用的 CSS 框架
- [Vercel](https://vercel.com/) - 优秀的部署平台

## ⭐ Star History

如果这个项目对您有帮助，请考虑给它一个 ⭐！

[![Star History Chart](https://api.star-history.com/svg?repos=4399SilverLionKing/Web3D&type=Date)](https://star-history.com/#4399SilverLionKing/Web3D&Date)

---

<div align="center">

**[⬆ 回到顶部](#web3d---3d-海洋个人展示网站)**

Made with ❤️ by [4399SilverLionKing](https://github.com/4399SilverLionKing)

</div>
