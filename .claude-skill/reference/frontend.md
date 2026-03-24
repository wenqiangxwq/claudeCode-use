# 前端框架规范

## 1. 技术栈规范

### 1.1 核心框架
- **Vue 3**: 使用 Composition API + `<script setup>` 语法
- **TypeScript**: 严格模式，开启严格类型检查
- **Vite**: 作为构建工具和开发服务器

### 1.2 生态系统
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **HTTP 请求**: Axios
- **样式预处理**: SCSS

### 1.3 代码质量
- **代码规范**: ESLint + Prettier
- **提交规范**: Conventional Commits

---

## 2. 目录结构规范

```
src/
├── api/                  # API 接口
├── assets/              # 静态资源
├── components/          # 公共组件
├── composables/         # 组合式函数
├── config/              # 配置文件
├── directives/          # 自定义指令
├── layouts/             # 布局组件
├── router/              # 路由配置
├── stores/              # Pinia 状态管理
├── utils/               # 工具函数
└── views/               # 页面组件
```

---

## 3. 移动端兼容规范

按 [mobile.md](./mobile.md) 校验格式

### 3.1 响应式布局
- 使用 CSS Grid 和 Flexbox 实现弹性布局
- 适配断点: 576px (sm), 768px (md), 992px (lg), 1200px (xl)
- 移动端采用自适应布局

### 3.2 触摸交互
- 触摸目标尺寸不小于 44px × 44px
- 按钮和可点击元素提供足够的间距

### 3.3 浏览器兼容性
- 支持主流现代浏览器
- 渐进增强，优雅降级

---

## 4. 代码规范

### 4.1 命名规范
- **文件命名**: PascalCase (组件) / camelCase (工具类)
- **组件名**: 多个单词组成
- **CSS 类名**: BEM 命名风格或语义化命名

### 4.2 Vue 组件规范
- 使用 `<script setup>` 语法糖
- props 必须定义类型和默认值
- 事件 emit 使用 `defineEmits` 声明

### 4.3 TypeScript 规范
- 禁止使用 `any` 类型
- 优先使用接口定义对象类型

### 4.4 样式规范
- 使用 SCSS 变量管理主题色
- 组件样式使用 scoped

---

## 5. 接口规范

### 5.1 请求配置
- 统一使用 Axios 实例配置
- 请求/响应拦截器处理通用逻辑

### 5.2 错误处理
- 统一错误提示机制
- HTTP 状态码分类处理

---

## 6. 安全规范

### 6.1 XSS 防护
- 用户输入内容进行转义
- 使用 v-text 替代 v-html

### 6.2 权限控制
- 路由级别权限控制
- 按钮级别权限指令

---

## 7. Git 规范

### 7.1 提交信息
```
feat: 添加新功能
fix: 修复问题
docs: 更新文档
style: 代码格式调整
refactor: 重构代码
```

### 7.2 分支命名
- `feature/` 新功能分支
- `bugfix/` 修复分支
- `hotfix/` 紧急修复分支
