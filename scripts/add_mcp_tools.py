#!/usr/bin/env python3
"""将MCP服务器添加到tools.json中，使rankings.json中的MCP榜单引用有效"""

import json
import random

random.seed(42)

with open('data/tools.json', 'r', encoding='utf-8') as f:
    tools = json.load(f)

existing_ids = {t['id'] for t in tools}

july_dates = [f"2026-07-{d:02d}" for d in range(1, 32)]

mcp_tools = [
    {
        "id": "github-mcp",
        "name": "GitHub MCP",
        "logo": "https://api.dicebear.com/7.x/shapes/svg?seed=github-mcp",
        "description": "官方GitHub MCP服务器，提供仓库管理、Issue处理、PR操作、代码审查等功能，让AI直接操作GitHub。",
        "url": "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
        "price": "免费",
        "isFree": True,
        "tags": ["MCP", "GitHub", "开发", "代码管理", "开源"],
        "category": "ai-agent",
        "rating": 4.8,
        "updatedAt": random.choice(july_dates),
        "screenshots": ["https://picsum.photos/seed/github-mcp1/800/500"],
        "features": ["仓库管理", "Issue操作", "PR处理", "代码审查", "分支管理", "Webhook集成"],
        "seoTitle": "GitHub MCP - 官方MCP服务器 | AI Navigator Pro",
        "seoDescription": "官方GitHub MCP服务器，让AI Agent直接操作GitHub仓库。",
        "featured": True,
        "trending": True,
        "views": 85000
    },
    {
        "id": "figma-mcp",
        "name": "Figma MCP",
        "logo": "https://api.dicebear.com/7.x/shapes/svg?seed=figma-mcp",
        "description": "Figma MCP服务器，支持读取和操作Figma设计文件，提取设计资源、组件和样式，让AI辅助设计工作流。",
        "url": "https://github.com/GLips/Figma-Context-MCP",
        "price": "免费",
        "isFree": True,
        "tags": ["MCP", "Figma", "设计", "UI/UX", "设计系统"],
        "category": "ai-agent",
        "rating": 4.6,
        "updatedAt": random.choice(july_dates),
        "screenshots": ["https://picsum.photos/seed/figma-mcp1/800/500"],
        "features": ["设计文件读取", "组件提取", "样式同步", "设计资源管理", "自动标注"],
        "seoTitle": "Figma MCP - 设计协作MCP服务器 | AI Navigator Pro",
        "seoDescription": "Figma MCP服务器，让AI Agent读取和操作设计文件。",
        "featured": False,
        "trending": True,
        "views": 62000
    },
    {
        "id": "notion-mcp",
        "name": "Notion MCP",
        "logo": "https://api.dicebear.com/7.x/shapes/svg?seed=notion-mcp",
        "description": "Notion MCP服务器，提供知识库查询、页面操作、数据库管理等功能，让AI与Notion深度集成。",
        "url": "https://github.com/makenotion/notion-mcp-server",
        "price": "免费",
        "isFree": True,
        "tags": ["MCP", "Notion", "笔记", "知识库", "生产力"],
        "category": "ai-agent",
        "rating": 4.7,
        "updatedAt": random.choice(july_dates),
        "screenshots": ["https://picsum.photos/seed/notion-mcp1/800/500"],
        "features": ["页面管理", "数据库查询", "知识库检索", "内容创建", "协作编辑"],
        "seoTitle": "Notion MCP - 知识库MCP服务器 | AI Navigator Pro",
        "seoDescription": "Notion MCP服务器，让AI Agent管理和查询Notion知识库。",
        "featured": True,
        "trending": False,
        "views": 78000
    },
    {
        "id": "playwright-mcp",
        "name": "Playwright MCP",
        "logo": "https://api.dicebear.com/7.x/shapes/svg?seed=playwright-mcp",
        "description": "Playwright浏览器自动化MCP，让AI能够浏览网页、执行操作和提取数据，支持多浏览器引擎。",
        "url": "https://github.com/anthropics/playwright-mcp",
        "price": "免费",
        "isFree": True,
        "tags": ["MCP", "浏览器自动化", "微软", "开源", "测试"],
        "category": "ai-agent",
        "rating": 4.5,
        "updatedAt": random.choice(july_dates),
        "screenshots": ["https://picsum.photos/seed/playwright-mcp1/800/500"],
        "features": ["网页浏览", "元素操作", "数据抓取", "自动化测试", "多浏览器支持"],
        "seoTitle": "Playwright MCP - 浏览器自动化MCP | AI Navigator Pro",
        "seoDescription": "Playwright MCP让AI Agent自动浏览网页和执行操作。",
        "featured": False,
        "trending": True,
        "views": 55000
    },
    {
        "id": "slack-mcp",
        "name": "Slack MCP",
        "logo": "https://api.dicebear.com/7.x/shapes/svg?seed=slack-mcp",
        "description": "Slack MCP服务器，支持消息发送、频道管理、用户查询等功能，让AI与团队协作平台无缝集成。",
        "url": "https://github.com/modelcontextprotocol/servers/tree/main/src/slack",
        "price": "免费",
        "isFree": True,
        "tags": ["MCP", "Slack", "通讯", "团队协作", "消息"],
        "category": "ai-agent",
        "rating": 4.4,
        "updatedAt": random.choice(july_dates),
        "screenshots": ["https://picsum.photos/seed/slack-mcp1/800/500"],
        "features": ["消息发送", "频道管理", "用户查询", "文件共享", "通知推送"],
        "seoTitle": "Slack MCP - 团队协作MCP服务器 | AI Navigator Pro",
        "seoDescription": "Slack MCP服务器，让AI Agent管理和操作Slack工作区。",
        "featured": False,
        "trending": False,
        "views": 48000
    },
    {
        "id": "filesystem-mcp",
        "name": "Filesystem MCP",
        "logo": "https://api.dicebear.com/7.x/shapes/svg?seed=filesystem-mcp",
        "description": "文件系统操作的MCP服务器，让AI能够安全地读写本地文件，管理目录结构，是开发Agent的基础设施。",
        "url": "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
        "price": "免费",
        "isFree": True,
        "tags": ["MCP", "文件系统", "官方", "开源", "开发"],
        "category": "ai-agent",
        "rating": 4.6,
        "updatedAt": random.choice(july_dates),
        "screenshots": ["https://picsum.photos/seed/filesystem-mcp1/800/500"],
        "features": ["文件读写", "目录管理", "权限控制", "路径安全", "批量操作"],
        "seoTitle": "Filesystem MCP - 文件系统MCP服务器 | AI Navigator Pro",
        "seoDescription": "Filesystem MCP让AI Agent安全地读写本地文件。",
        "featured": False,
        "trending": True,
        "views": 52000
    },
    {
        "id": "github-mcp-pro",
        "name": "GitHub MCP Pro",
        "logo": "https://api.dicebear.com/7.x/shapes/svg?seed=github-mcp-pro",
        "description": "增强版GitHub MCP服务器，提供完整的代码管理能力，支持高级搜索、代码分析和自动化工作流。",
        "url": "https://github.com/github/github-mcp",
        "price": "免费",
        "isFree": True,
        "tags": ["MCP", "GitHub", "代码管理", "开源", "高级功能"],
        "category": "ai-agent",
        "rating": 4.7,
        "updatedAt": random.choice(july_dates),
        "screenshots": ["https://picsum.photos/seed/github-mcp-pro1/800/500"],
        "features": ["高级搜索", "代码分析", "自动化工作流", "安全扫描", "依赖管理"],
        "seoTitle": "GitHub MCP Pro - 增强版GitHub MCP | AI Navigator Pro",
        "seoDescription": "增强版GitHub MCP，提供完整代码管理和分析能力。",
        "featured": True,
        "trending": False,
        "views": 60000
    },
    {
        "id": "fetch-mcp",
        "name": "Fetch MCP",
        "logo": "https://api.dicebear.com/7.x/shapes/svg?seed=fetch-mcp",
        "description": "网页内容抓取MCP，让AI安全地获取并处理网络内容，支持HTML解析和格式转换。",
        "url": "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch",
        "price": "免费",
        "isFree": True,
        "tags": ["MCP", "网页抓取", "HTTP", "官方", "开源"],
        "category": "ai-agent",
        "rating": 4.5,
        "updatedAt": random.choice(july_dates),
        "screenshots": ["https://picsum.photos/seed/fetch-mcp1/800/500"],
        "features": ["网页抓取", "HTML解析", "格式转换", "内容提取", "安全访问"],
        "seoTitle": "Fetch MCP - 网页抓取MCP服务器 | AI Navigator Pro",
        "seoDescription": "Fetch MCP让AI Agent安全抓取和处理网页内容。",
        "featured": False,
        "trending": False,
        "views": 45000
    },
    {
        "id": "postgres-mcp",
        "name": "PostgreSQL MCP",
        "logo": "https://api.dicebear.com/7.x/shapes/svg?seed=postgres-mcp",
        "description": "PostgreSQL数据库MCP服务器，支持SQL查询、数据操作、Schema管理等，让AI直接操作数据库。",
        "url": "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
        "price": "免费",
        "isFree": True,
        "tags": ["MCP", "PostgreSQL", "数据库", "SQL", "数据管理"],
        "category": "ai-agent",
        "rating": 4.6,
        "updatedAt": random.choice(july_dates),
        "screenshots": ["https://picsum.photos/seed/postgres-mcp1/800/500"],
        "features": ["SQL查询", "数据读写", "Schema管理", "表结构查询", "索引优化"],
        "seoTitle": "PostgreSQL MCP - 数据库MCP服务器 | AI Navigator Pro",
        "seoDescription": "PostgreSQL MCP让AI Agent直接操作数据库。",
        "featured": True,
        "trending": True,
        "views": 72000
    },
    {
        "id": "brave-mcp",
        "name": "Brave MCP",
        "logo": "https://api.dicebear.com/7.x/shapes/svg?seed=brave-mcp",
        "description": "Brave浏览器MCP服务器，支持隐私浏览和广告拦截，让AI在保护隐私的前提下浏览网页。",
        "url": "https://github.com/brave/brave-mcp",
        "price": "免费",
        "isFree": True,
        "tags": ["MCP", "Brave", "浏览器", "隐私", "搜索"],
        "category": "ai-agent",
        "rating": 4.3,
        "updatedAt": random.choice(july_dates),
        "screenshots": ["https://picsum.photos/seed/brave-mcp1/800/500"],
        "features": ["隐私浏览", "广告拦截", "网页搜索", "内容提取", "安全访问"],
        "seoTitle": "Brave MCP - 隐私浏览MCP服务器 | AI Navigator Pro",
        "seoDescription": "Brave MCP让AI Agent在保护隐私的前提下浏览网页。",
        "featured": False,
        "trending": False,
        "views": 38000
    },
]

added = 0
for tool in mcp_tools:
    if tool['id'] not in existing_ids:
        tools.append(tool)
        added += 1

with open('data/tools.json', 'w', encoding='utf-8') as f:
    json.dump(tools, f, ensure_ascii=False, indent=2)

print(f"添加了 {added} 个MCP工具到tools.json")
print(f"tools.json 总计: {len(tools)} 条")
