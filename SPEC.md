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
│   ├── modules/         # 按模块划分接口
│   └── types/          # API 类型定义
├── assets/              # 静态资源
│   └── styles/         # 全局样式
├── components/          # 公共组件
│   └── common/         # 通用组件
├── composables/         # 组合式函数
├── config/              # 配置文件
├── directives/          # 自定义指令
├── layouts/             # 布局组件
├── router/              # 路由配置
│   ├── guard.ts        # 路由守卫
│   └── routes/         # 路由定义
├── stores/              # Pinia 状态管理
├── utils/               # 工具函数
└── views/               # 页面组件
```

---

## 3. 移动端兼容规范

### 3.1 响应式布局
- 使用 CSS Grid 和 Flexbox 实现弹性布局
- 适配断点: 576px (sm), 768px (md), 992px (lg), 1200px (xl), 1400px (xxl)
- 移动端采用自适应布局，核心功能优先保证可用性

### 3.2 触摸交互
- 触摸目标尺寸不小于 44px × 44px
- 按钮和可点击元素提供足够的间距
- 支持手势操作（如滑动手势）

### 3.3 性能优化
- 懒加载路由和组件
- 图片资源使用懒加载和响应式图片
- 减少重排重绘，优化渲染性能

### 3.4 浏览器兼容性
- 支持主流现代浏览器 (Chrome, Firefox, Safari, Edge)
- 渐进增强，优雅降级
- 必要的 CSS 前缀和 polyfill

---

## 4. 代码规范

### 4.1 命名规范
- **文件命名**: PascalCase (组件) / camelCase (工具类)
- **组件名**: 多个单词组成，避免使用 HTML 保留标签
- **CSS 类名**: BEM 命名风格或语义化命名

### 4.2 Vue 组件规范
- 使用 `<script setup>` 语法糖
- props 必须定义类型和默认值
- 组件 props 透传需使用 v-bind="$attrs"
- 事件 emit 使用 `defineEmits` 声明

### 4.3 TypeScript 规范
- 禁止使用 `any` 类型
- 优先使用接口定义对象类型
- 使用类型推断，减少冗余类型标注

### 4.4 样式规范
- 使用 SCSS 变量管理主题色
- 组件样式使用 scoped
- 避免行内样式，优先使用 CSS 类
- 统一使用 px 单位，响应式使用 rem/vw

---

## 5. 接口规范

### 5.1 请求配置
- 统一使用 Axios 实例配置
- 请求/响应拦截器处理通用逻辑
- 请求超时统一设置

### 5.2 错误处理
- 统一错误提示机制
- HTTP 状态码分类处理
- 网络异常友好提示

### 5.3 数据Mock
- 开发环境支持接口 Mock
- 使用 JSON Server 或 MSW

---

## 6. 状态管理规范

### 6.1 Store 划分
- 按业务模块划分 Store
- 避免 Store 过度耦合
- 同步状态使用 Pinia

### 6.2 持久化
- 敏感信息不存储在本地
- 使用加密存储重要数据

---

## 7. 安全规范

### 7.1 XSS 防护
- 用户输入内容进行转义
- 使用 v-text 替代 v-html

### 7.2 权限控制
- 路由级别权限控制
- 按钮级别权限指令
- 敏感操作需要二次确认

---

## 8. 性能规范

### 8.1 首屏加载
- 路由懒加载
- 组件异步加载
- 关键 CSS 内联

### 8.2 运行性能
- 合理使用 computed 和 watch
- 避免不必要的响应式数据
- 使用 v-show 替代 v-if（频繁切换）

### 8.3 构建优化
- 代码分割
- Tree Shaking
- 资源压缩 (Gzip/Brotli)

---

## 9. Git 规范

### 9.1 提交信息
```
feat: 添加用户登录功能
fix: 修复表单验证问题
docs: 更新文档
style: 代码格式调整
refactor: 重构代码结构
test: 添加单元测试
chore: 更新依赖
```

### 9.2 分支命名
- `feature/` 新功能分支
- `bugfix/` 修复分支
- `hotfix/` 紧急修复分支

---

## 10. 注释规范

### 10.1 必需注释
- 组件说明（功能、Props、Events）
- 复杂业务逻辑
- 非常规实现方式
- TODO 和 FIXME 标记

### 10.2 注释风格
- 使用中文注释
- 保持注释与代码同步更新
- 删除无意义的注释