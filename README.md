# Frontend-PC

基于 Vue3 + Vite + TypeScript 的 PC 端通用后台管理系统基建

## 技术栈

- Vue 3.4+ (Composition API)
- Vite 5.x
- TypeScript 5.x
- Pinia (状态管理)
- Vue Router 4.x
- Element Plus
- Axios
- SCSS

## 项目结构

```
src/
├── api/           # API 接口层
├── assets/        # 静态资源
├── components/    # 公共组件
├── composables/   # 组合式函数
├── config/        # 配置文件
├── directives/    # 自定义指令
├── layout/        # 布局组件
├── router/        # 路由管理
├── stores/        # Pinia 状态管理
├── utils/         # 工具函数
└── views/         # 页面视图
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

## 功能特性

- [x] Vue3 + TypeScript
- [x] Vite 快速构建
- [x] Pinia 状态管理
- [x] 动态路由
- [x] 权限管理
- [x] Axios 请求封装
- [x] Element Plus UI
- [x] SCSS 样式
- [x] 代码规范 (ESLint + Prettier)
