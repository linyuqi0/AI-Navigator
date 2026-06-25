# AI Navigator Pro

> 生产级 AI 导航平台 - 发现最优质的 AI 工具、Agent、MCP、Prompt 和工作流

## 功能特性

### 核心功能
- 🔍 **全站搜索** - 基于 Fuse.js 的全文模糊搜索，支持 Ctrl+K 快捷唤起
- 🛠️ **工具库** - 精选 AI 工具，分类浏览，详情页展示
- 🤖 **Agent 库** - AI Agent 目录，支持分类/标签/搜索/排序
- 🧩 **MCP 库** - Model Context Protocol 服务器集合
- 💬 **Prompt 库** - 高质量 Prompt 模板，按角色分类
- ⚡ **工作流库** - AI 工作流模板，提升效率
- 🏆 **榜单系统** - 年度/月度最佳 AI 工具排行榜
- 📰 **AI 资讯** - 行业最新动态与趋势

### 用户体验
- 🌙 **深色/浅色模式** - 莫兰迪配色，高级感设计
- ⭐ **收藏系统** - 本地收藏，基于 IndexedDB/Dexie.js
- 📱 **响应式设计** - 完美适配桌面/平板/手机
- 🚀 **PWA 支持** - 可安装到桌面，离线访问
- ⚡ **极速加载** - 纯静态站点，部署到 GitHub Pages

### SEO 优化
- 📄 自动生成 sitemap.xml
- 🤖 自动生成 robots.txt
- 🔗 OpenGraph / Twitter Card
- 📝 JSON-LD 结构化数据
- 🏷️ 分类页/标签页/详情页 SEO

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript |
| UI | TailwindCSS + Shadcn UI |
| 动画 | Framer Motion |
| 搜索 | Fuse.js + Lunr.js |
| 本地存储 | Dexie.js (IndexedDB) |
| PWA | Web App Manifest |
| 部署 | GitHub Pages + GitHub Actions |

## 项目结构

```
.
├── app/                    # App Router 页面
│   ├── about/             # 关于我们
│   ├── agents/            # Agent 库（列表 + 详情）
│   ├── favorites/         # 我的收藏
│   ├── mcps/              # MCP 库（列表 + 详情）
│   ├── news/              # AI 资讯
│   ├── privacy/           # 隐私政策
│   ├── prompts/           # Prompt 库（列表 + 详情）
│   ├── rankings/          # 榜单系统（列表 + 详情）
│   ├── search/            # 搜索页
│   ├── terms/             # 使用条款
│   ├── tools/             # 工具库（列表 + 详情）
│   ├── workflows/         # 工作流库（列表 + 详情）
│   ├── layout.tsx         # 全局布局
│   ├── page.tsx           # 首页
│   ├── sitemap.ts         # Sitemap 生成
│   └── robots.ts          # Robots 生成
├── components/            # React 组件
│   ├── cards/            # 卡片组件
│   ├── ui/               # Shadcn UI 组件
│   ├── header.tsx        # 顶部导航
│   ├── footer.tsx        # 页脚
│   ├── theme-provider.tsx # 主题提供者
│   ├── theme-toggle.tsx  # 主题切换
│   └── search-dialog.tsx # 搜索对话框
├── data/                  # 数据文件
│   ├── tools.json
│   ├── agents.json
│   ├── mcp.json
│   ├── prompts.json
│   ├── workflows.json
│   ├── news.json
│   ├── rankings.json
│   ├── categories.json
│   └── tags.json
├── lib/                   # 工具库
│   ├── data.ts           # 数据加载
│   ├── search.ts         # 搜索逻辑
│   ├── db.ts             # Dexie.js 数据库
│   ├── types.ts          # TypeScript 类型
│   └── utils.ts          # 工具函数
├── public/               # 静态资源
│   ├── manifest.json     # PWA 配置
│   └── favicon.svg
├── .github/workflows/    # GitHub Actions
│   └── deploy.yml        # 自动部署配置
├── next.config.mjs       # Next.js 配置
├── tailwind.config.ts    # TailwindCSS 配置
└── package.json
```

## 快速开始

### 环境要求
- Node.js >= 18.17
- npm >= 9

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `out/` 目录。

### 本地预览

```bash
npm run start
```

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

新建一个 GitHub 仓库，将代码推送上去。

### 2. 配置仓库设置

进入仓库 Settings → Pages：
- Source: 选择 "GitHub Actions"

### 3. 配置 Base Path（可选）

如果部署到 `https://<username>.github.io/<repo-name>/`（项目站点），需要配置 basePath：

在 `.github/workflows/deploy.yml` 中设置环境变量：
```yaml
env:
  NEXT_PUBLIC_BASE_PATH: /your-repo-name
```

### 4. 自动部署

推送代码到 `main` 分支，GitHub Actions 会自动构建并部署。

部署流程：
1. 触发 push 事件
2. 安装依赖
3. 构建项目（`npm run build`）
4. 上传产物
5. 部署到 GitHub Pages

### 5. 手动触发部署

也可以在 Actions 页面手动触发部署工作流。

## 数据管理

### 添加新工具

编辑 `data/tools.json`，添加新的工具对象：

```json
{
  "id": "tool-id",
  "name": "工具名称",
  "logo": "https://...",
  "description": "工具简介",
  "url": "https://...",
  "pricing": "免费 / 付费 / 免费增值",
  "isFree": true,
  "tags": ["标签1", "标签2"],
  "category": "分类",
  "rating": 4.8,
  "updatedAt": "2024-01-01",
  "screenshots": ["url1", "url2"],
  "features": ["特点1", "特点2"],
  "competitors": ["竞品1", "竞品2"],
  "useCases": ["适用场景1", "适用场景2"],
  "seoTitle": "SEO 标题",
  "seoDescription": "SEO 描述"
}
```

### 添加其他数据

类似地编辑对应 JSON 文件：
- `data/agents.json` - Agent 数据
- `data/mcp.json` - MCP 数据
- `data/prompts.json` - Prompt 数据
- `data/workflows.json` - 工作流数据
- `data/news.json` - 资讯数据
- `data/rankings.json` - 榜单数据

## 自定义配置

### 修改主题配色

编辑 `tailwind.config.ts` 中的 `colors` 配置：

```typescript
colors: {
  morandi: {
    sage: '#...',
    rose: '#...',
    // ...
  }
}
```

### 修改站点信息

编辑以下位置：
- `app/layout.tsx` - 站点标题、描述
- `components/header.tsx` - Logo、导航链接
- `components/footer.tsx` - 页脚信息
- `public/manifest.json` - PWA 配置

### 配置 SEO 默认值

在 `app/layout.tsx` 中修改 metadata 对象。

## 功能说明

### 搜索系统

- **快捷搜索**: 按 `Ctrl+K` (Mac: `⌘+K`) 唤起搜索框
- **模糊搜索**: 基于 Fuse.js 的模糊匹配
- **分类搜索**: 按类型筛选结果
- **实时搜索**: 输入即时响应

### 收藏系统

- 本地存储，数据保存在浏览器 IndexedDB 中
- 支持收藏工具、Agent、MCP、Prompt、工作流
- 最近浏览历史自动记录
- 数据不上传服务器，保护隐私

### 主题切换

- 浅色模式 / 深色模式切换
- 偏好保存在 localStorage
- 首次访问跟随系统设置

## 开发指南

### 新增页面

在 `app/` 目录下创建文件夹和 `page.tsx` 文件。

### 新增组件

在 `components/` 目录下创建组件文件。

### 类型定义

在 `lib/types.ts` 中添加 TypeScript 类型。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
