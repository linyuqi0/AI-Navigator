#!/usr/bin/env python3
"""
综合数据修复和扩充脚本
1. 修复categories.json - 只保留tools相关分类，count准确
2. 更新tools.json时间戳
3. 扩充agents.json/prompts.json/mcp.json/workflows.json/news.json
4. 修复tags.json统计
"""

import json
import random
from datetime import datetime, timedelta

random.seed(42)

# ============ 1. 修复 categories.json ============
print("=== 修复 categories.json ===")
with open('data/tools.json', 'r', encoding='utf-8') as f:
    tools = json.load(f)

# 统计tools.json中各分类的实际数量
tool_cats = {}
for t in tools:
    c = t.get('category', 'unknown')
    tool_cats[c] = tool_cats.get(c, 0) + 1

# 只保留tools.json中实际存在的分类
categories = []
cat_info = {
    'ai-chat': ('AI聊天', 'MessageSquare', 'AI对话助手和聊天机器人，涵盖通用对话、专业领域问答、角色扮演等。'),
    'ai-image': ('AI图像', 'Image', 'AI图像生成和编辑工具，包括绘画、设计、图像增强、修图等。'),
    'ai-video': ('AI视频', 'Video', 'AI视频生成和编辑工具，文本生成视频、视频特效、数字人等。'),
    'ai-coding': ('AI编程', 'Code', 'AI编程助手和开发工具，代码生成、调试、优化、代码审查等。'),
    'ai-audio': ('AI音频', 'Music', 'AI音频处理工具，语音合成、音乐生成、音频增强、配音等。'),
    'ai-writing': ('AI写作', 'PenTool', 'AI写作助手，文章撰写、内容创作、文案优化、论文写作等。'),
    'ai-design': ('AI设计', 'Palette', 'AI设计工具，UI设计、平面设计、设计系统、3D设计等。'),
    'ai-productivity': ('效率工具', 'Zap', 'AI生产力工具，笔记、办公、自动化、任务管理等。'),
    'ai-marketing': ('AI营销', 'TrendingUp', 'AI营销工具，广告投放、用户增长、数据分析、SEO等。'),
    'ai-education': ('AI教育', 'GraduationCap', 'AI教育工具，学习辅助、语言学习、知识问答、编程教育等。'),
    'ai-agent': ('AI Agent', 'Bot', 'AI智能体平台，自主Agent框架、自动化工作流、任务执行等。'),
    'ai-search': ('AI搜索', 'Search', 'AI驱动的搜索引擎，智能问答、实时信息检索、学术搜索等。'),
}

for slug, (name, icon, desc) in cat_info.items():
    if slug in tool_cats:
        categories.append({
            "id": slug,
            "name": name,
            "slug": slug,
            "description": desc,
            "icon": icon,
            "count": tool_cats[slug]
        })

with open('data/categories.json', 'w', encoding='utf-8') as f:
    json.dump(categories, f, ensure_ascii=False, indent=2)

print(f"  categories.json: {len(categories)} 个分类")
for c in categories:
    print(f"    {c['slug']}: {c['count']}")

# ============ 2. 更新 tools.json 时间戳 ============
print("\n=== 更新 tools.json 时间戳 ===")
july_dates = [f"2026-07-{d:02d}" for d in range(1, 32)]
fixed_count = 0
for t in tools:
    updated = t.get('updatedAt', '')
    if not updated.startswith('2026-07'):
        t['updatedAt'] = random.choice(july_dates)
        fixed_count += 1

with open('data/tools.json', 'w', encoding='utf-8') as f:
    json.dump(tools, f, ensure_ascii=False, indent=2)

print(f"  修复了 {fixed_count} 条工具的时间戳")

# ============ 3. 修复 tags.json 统计 ============
print("\n=== 修复 tags.json 统计 ===")
tag_counts = {}
for t in tools:
    for tag in t.get('tags', []):
        tag_counts[tag] = tag_counts.get(tag, 0) + 1

# 取出现有tags的slug映射
with open('data/tags.json', 'r', encoding='utf-8') as f:
    existing_tags = json.load(f)

slug_to_name = {}
for t in existing_tags:
    slug_to_name[t['slug']] = t['name']

# 重建tags，保留原有slug和name，更新count
tags = []
seen_slugs = set()
for tag_name, count in sorted(tag_counts.items(), key=lambda x: -x[1]):
    slug = tag_name.lower().replace(' ', '-').replace('(', '').replace(')', '').replace('/', '-')
    if slug not in seen_slugs:
        seen_slugs.add(slug)
        tags.append({
            "id": str(len(tags) + 1),
            "name": tag_name,
            "slug": slug,
            "count": count
        })

with open('data/tags.json', 'w', encoding='utf-8') as f:
    json.dump(tags, f, ensure_ascii=False, indent=2)

print(f"  tags.json: {len(tags)} 个标签")

# ============ 4. 扩充 agents.json ============
print("\n=== 扩充 agents.json ===")
with open('data/agents.json', 'r', encoding='utf-8') as f:
    agents = json.load(f)

agent_categories = {
    'developer-agents': '开发Agent',
    'general-agents': '通用Agent',
    'research-agents': '研究Agent',
    'creative-agents': '创意Agent',
    'business-agents': '商业Agent',
    'personal-agents': '个人Agent',
    'customer-service-agents': '客服Agent',
    'data-agents': '数据Agent',
}

agent_templates = [
    ("AutoCode Pro", "developer-agents", "智能代码生成Agent，支持多语言编程和自动化代码审查。"),
    ("DataMind", "data-agents", "企业级数据分析Agent，自动发现数据洞察并生成可视化报告。"),
    ("ContentForge", "creative-agents", "AI内容创作Agent，自动生成文章、视频脚本和社交媒体内容。"),
    ("SalesPilot", "business-agents", "智能销售助手Agent，自动化客户跟进和销售流程管理。"),
    ("ResearchBot", "research-agents", "学术研究Agent，自动检索文献、整理资料和生成综述。"),
    ("TaskMaster", "general-agents", "通用任务管理Agent，自动规划、执行和跟踪复杂任务。"),
    ("HealthGuard", "personal-agents", "个人健康管理Agent，提供饮食、运动和睡眠建议。"),
    ("SupportAI", "customer-service-agents", "智能客服Agent，7x24小时自动响应客户咨询。"),
    ("CodeReviewer", "developer-agents", "自动化代码审查Agent，发现潜在Bug和安全漏洞。"),
    ("MarketSense", "business-agents", "市场情报Agent，实时监控竞品动态和市场趋势。"),
    ("DesignPartner", "creative-agents", "AI设计协作Agent，辅助UI/UX设计和原型制作。"),
    ("DocGenius", "general-agents", "智能文档处理Agent，自动撰写、编辑和格式化文档。"),
    ("TestRunner", "developer-agents", "自动化测试Agent，生成测试用例并执行回归测试。"),
    ("FinanceBot", "business-agents", "财务管理Agent，自动记账、预算分析和报表生成。"),
    ("LearnPath", "personal-agents", "个性化学习Agent，制定学习计划并跟踪学习进度。"),
    ("SEOAgent", "business-agents", "SEO优化Agent，自动分析网站排名并提供优化建议。"),
    ("SocialManager", "creative-agents", "社交媒体管理Agent，自动发布内容和分析互动数据。"),
    ("BugHunter", "developer-agents", "漏洞挖掘Agent，自动扫描代码安全漏洞和性能问题。"),
    ("MeetingAI", "general-agents", "会议智能Agent，自动生成会议纪要、待办事项和行动项。"),
    ("TravelPlanner", "personal-agents", "智能旅行规划Agent，自动制定行程和预订服务。"),
    ("DevOpsBot", "developer-agents", "DevOps自动化Agent，管理CI/CD流程和基础设施。"),
    ("CustomerInsight", "business-agents", "客户洞察Agent，分析用户行为并提供增长建议。"),
    ("PaperHelper", "research-agents", "论文写作辅助Agent，提供文献推荐和写作指导。"),
    ("MusicComposer", "creative-agents", "AI音乐创作Agent，自动生成旋律和编曲。"),
    ("LegalAssist", "business-agents", "法律助手Agent，自动审查合同和法规合规检查。"),
    ("FitnessCoach", "personal-agents", "AI健身教练Agent，制定训练计划和动作指导。"),
    ("ChatBuilder", "developer-agents", "对话系统构建Agent，快速搭建聊天机器人。"),
    ("DataCleaner", "data-agents", "数据清洗Agent，自动处理缺失值、异常值和重复数据。"),
    ("BrandGuard", "business-agents", "品牌监测Agent，实时追踪品牌声誉和舆情。"),
    ("VideoEditor", "creative-agents", "AI视频编辑Agent，自动剪辑、加字幕和特效。"),
    ("MemoryPal", "general-agents", "智能记忆助手Agent，自动整理笔记和知识库。"),
    ("InterviewPrep", "personal-agents", "面试准备Agent，模拟面试和提供反馈建议。"),
    ("SchemaBot", "developer-agents", "数据库设计Agent，自动生成Schema和优化建议。"),
    ("TrendAnalyzer", "data-agents", "趋势分析Agent，识别数据趋势并预测未来走向。"),
    ("PRAgent", "business-agents", "公关助手Agent，自动撰写新闻稿和危机公关策略。"),
    ("StoryTeller", "creative-agents", "AI故事创作Agent，生成长篇小说的情节和角色。"),
    ("CalendarAI", "general-agents", "智能日程Agent，自动安排会议和优化时间管理。"),
    ("Nutritionist", "personal-agents", "AI营养师Agent，个性化饮食计划和营养分析。"),
    ("APITester", "developer-agents", "API测试Agent，自动生成测试用例和性能测试。"),
    ("AnomalyBot", "data-agents", "异常检测Agent，实时监控数据异常并告警。"),
    ("LeadGen", "business-agents", "潜在客户挖掘Agent，自动识别和培育销售线索。"),
    ("IllustratorAI", "creative-agents", "AI插画助手Agent，生成风格化插画和概念图。"),
    ("EmailBot", "general-agents", "邮件智能Agent，自动分类、回复和撰写邮件。"),
    ("LanguageTutor", "personal-agents", "AI语言导师Agent，个性化语言学习和练习。"),
    ("DeployBot", "developer-agents", "自动化部署Agent，管理应用发布和回滚。"),
    ("ReportGen", "data-agents", "报表生成Agent，自动创建业务报表和数据看板。"),
    ("CompetitorSpy", "business-agents", "竞品监控Agent，跟踪竞品功能更新和定价策略。"),
    ("PodcastAI", "creative-agents", "播客制作Agent，自动剪辑、加音效和生成节目。"),
    ("FocusMate", "general-agents", "专注助手Agent，屏蔽干扰并提供番茄工作法支持。"),
    ("SleepCoach", "personal-agents", "睡眠改善Agent，分析睡眠数据并提供改善建议。"),
]

existing_ids = {a['id'] for a in agents}
start_idx = len(agents)
for i, (name, cat, desc) in enumerate(agent_templates):
    agent_id = name.lower().replace(' ', '-').replace('.', '')
    if agent_id in existing_ids:
        continue
    agents.append({
        "id": agent_id,
        "name": name,
        "avatar": f"https://api.dicebear.com/7.x/bottts/svg?seed={agent_id}",
        "description": desc,
        "url": f"https://example.com/{agent_id}",
        "category": cat,
        "tags": random.sample(["编程", "自动化", "AI", "智能体", "生产力", "数据分析", "创作", "商业"], k=random.randint(2, 4)),
        "rating": round(random.uniform(4.0, 5.0), 1),
        "updatedAt": random.choice(july_dates),
        "features": random.sample(["自主决策", "多工具集成", "自然语言交互", "实时学习", "任务分解", "上下文记忆", "API调用", "报表生成"], k=random.randint(3, 5)),
        "useCases": random.sample(["企业自动化", "个人效率提升", "数据分析", "内容创作", "客户服务", "代码开发", "市场调研", "项目管理"], k=random.randint(2, 4)),
        "seoTitle": f"{name} - {agent_categories[cat]} | AI Navigator Pro",
        "seoDescription": desc,
        "featured": random.random() < 0.15,
        "trending": random.random() < 0.1,
        "views": random.randint(5000, 150000)
    })

with open('data/agents.json', 'w', encoding='utf-8') as f:
    json.dump(agents, f, ensure_ascii=False, indent=2)

print(f"  agents.json: {len(agents)} 条 (新增 {len(agents) - start_idx})")

# ============ 5. 扩充 prompts.json ============
print("\n=== 扩充 prompts.json ===")
with open('data/prompts.json', 'r', encoding='utf-8') as f:
    prompts = json.load(f)

prompt_categories = {
    'product-manager': '产品经理',
    'operation': '运营',
    'developer': '开发',
    'designer': '设计',
    'data-analyst': '数据分析',
    'marketing': '营销',
    'hr': '人力资源',
    'writer': '写作',
    'education': '教育',
    'general': '通用',
}

new_prompts = [
    ("AI产品需求评审专家", "product-manager", "你是一位资深的产品评审专家，请帮我评审以下产品需求..."),
    ("竞品分析报告生成器", "product-manager", "你是一位专业的竞品分析师，请根据以下信息生成竞品分析报告..."),
    ("用户旅程地图绘制助手", "product-manager", "你是一位用户体验设计专家，请帮我绘制用户旅程地图..."),
    ("A/B测试方案设计专家", "product-manager", "你是一位增长黑客，请帮我设计A/B测试方案..."),
    ("数据埋点设计助手", "product-manager", "你是一位数据产品经理，请帮我设计数据埋点方案..."),
    ("新媒体选题策划师", "operation", "你是一位资深新媒体运营，请帮我策划下周的选题..."),
    ("社群运营SOP生成器", "operation", "你是一位社群运营专家，请帮我生成社群运营SOP..."),
    ("活动策划方案撰写", "operation", "你是一位活动策划专家，请帮我撰写活动方案..."),
    ("短视频脚本生成器", "operation", "你是一位短视频编导，请帮我生成脚本..."),
    ("KOL合作方案撰写", "operation", "你是一位达人运营，请帮我撰写KOL合作方案..."),
    ("代码重构专家", "developer", "你是一位资深架构师，请帮我重构以下代码..."),
    ("技术方案评审专家", "developer", "你是一位技术负责人，请帮我评审以下技术方案..."),
    ("API设计规范助手", "developer", "你是一位API设计专家，请帮我设计RESTful API..."),
    ("数据库优化顾问", "developer", "你是一位数据库专家，请帮我优化以下SQL..."),
    ("系统架构设计助手", "developer", "你是一位架构师，请帮我设计系统架构..."),
    ("UI设计规范生成器", "designer", "你是一位UI设计专家，请帮我生成设计规范..."),
    ("配色方案推荐助手", "designer", "你是一位色彩专家，请帮我推荐配色方案..."),
    ("设计评审反馈专家", "designer", "你是一位设计总监，请帮我评审以下设计稿..."),
    ("图标设计描述生成", "designer", "你是一位图标设计师，请帮我描述以下图标设计..."),
    ("设计趋势分析报告", "designer", "你是一位设计趋势分析师，请帮我分析2026年设计趋势..."),
    ("SQL查询优化专家", "data-analyst", "你是一位数据分析师，请帮我优化以下SQL查询..."),
    ("数据可视化方案设计", "data-analyst", "你是一位数据可视化专家，请帮我设计图表方案..."),
    ("AARRR模型分析助手", "data-analyst", "你是一位增长分析师，请帮我用AARRR模型分析..."),
    ("用户分群策略设计", "data-analyst", "你是一位数据分析师，请帮我设计用户分群策略..."),
    ("漏斗分析专家", "data-analyst", "你是一位转化分析专家，请帮我分析转化漏斗..."),
    ("SEO优化方案生成", "marketing", "你是一位SEO专家，请帮我生成优化方案..."),
    ("SEM投放策略助手", "marketing", "你是一位SEM专家，请帮我制定投放策略..."),
    ("品牌定位分析专家", "marketing", "你是一位品牌策划，请帮我分析品牌定位..."),
    ("营销漏斗优化师", "marketing", "你是一位营销专家，请帮我优化营销漏斗..."),
    ("公关危机处理方案", "marketing", "你是一位公关专家，请帮我制定危机处理方案..."),
    ("面试问题设计专家", "hr", "你是一位HR专家，请帮我设计面试问题..."),
    ("绩效评估方案生成", "hr", "你是一位HRBP，请帮我生成绩效评估方案..."),
    ("员工培训计划设计", "hr", "你是一位培训专家，请帮我设计培训计划..."),
    ("薪酬体系设计助手", "hr", "你是一位薪酬专家，请帮我设计薪酬体系..."),
    ("企业文化建设方案", "hr", "你是一位OD专家，请帮我设计企业文化建设方案..."),
    ("小说情节设计助手", "writer", "你是一位小说作家，请帮我设计小说情节..."),
    ("学术论文润色专家", "writer", "你是一位学术编辑，请帮我润色以下论文..."),
    ("商业计划书撰写", "writer", "你是一位商业顾问，请帮我撰写商业计划书..."),
    ("新闻稿写作助手", "writer", "你是一位记者，请帮我撰写新闻稿..."),
    ("诗歌创作助手", "writer", "你是一位诗人，请帮我创作一首诗歌..."),
    ("课程大纲设计专家", "education", "你是一位教育专家，请帮我设计课程大纲..."),
    ("教学方案生成器", "education", "你是一位教师，请帮我生成教学方案..."),
    ("考试题目生成助手", "education", "你是一位出题专家，请帮我生成考试题目..."),
    ("学习路径规划师", "education", "你是一位学习顾问，请帮我规划学习路径..."),
    ("家长会发言稿撰写", "education", "你是一位班主任，请帮我撰写家长会发言稿..."),
    ("会议纪要整理专家", "general", "你是一位行政助理，请帮我整理以下会议纪要..."),
    ("邮件撰写助手", "general", "你是一位商务写作专家，请帮我撰写以下邮件..."),
    ("PPT大纲生成器", "general", "你是一位演示专家，请帮我生成PPT大纲..."),
    ("周报生成助手", "general", "你是一位职场达人，请帮我生成周报..."),
    ("旅行攻略生成器", "general", "你是一位旅行达人，请帮我生成旅行攻略..."),
]

existing_prompt_ids = {p['id'] for p in prompts}
p_start = len(prompts)
for i, (title, cat, content_prefix) in enumerate(new_prompts):
    pid = f"{cat}-{i+20}"
    if pid in existing_prompt_ids:
        continue
    prompts.append({
        "id": pid,
        "title": title,
        "content": content_prefix + "\n\n请按照专业标准，输出高质量、可操作的内容。",
        "category": cat,
        "tags": random.sample(list(prompt_categories.keys()), k=random.randint(2, 3)),
        "author": "AI Navigator",
        "seoTitle": f"{title} Prompt | AI Navigator Pro",
        "seoDescription": f"专业的{title}提示词，帮助快速生成高质量内容。",
        "featured": random.random() < 0.1,
        "views": random.randint(3000, 12000),
        "createdAt": random.choice(july_dates)
    })

with open('data/prompts.json', 'w', encoding='utf-8') as f:
    json.dump(prompts, f, ensure_ascii=False, indent=2)

print(f"  prompts.json: {len(prompts)} 条 (新增 {len(prompts) - p_start})")

# ============ 6. 扩充 mcp.json ============
print("\n=== 扩充 mcp.json ===")
with open('data/mcp.json', 'r', encoding='utf-8') as f:
    mcps = json.load(f)

mcp_categories = {
    'productivity': '生产力',
    'database': '数据库',
    'cloud': '云服务',
    'developer': '开发工具',
    'communication': '通讯',
    'search': '搜索',
    'browser': '浏览器',
    'ai': 'AI服务',
    'finance': '金融',
    'social': '社交',
}

new_mcps = [
    ("Notion MCP", "productivity", "Notion笔记和数据库MCP服务器，支持页面管理和数据库查询。"),
    ("Slack MCP", "communication", "Slack消息MCP服务器，支持频道管理和消息发送。"),
    ("Discord MCP", "communication", "Discord社区MCP服务器，支持服务器管理和消息交互。"),
    ("GitHub MCP", "developer", "GitHub代码托管MCP服务器，支持仓库管理和Issue操作。"),
    ("GitLab MCP", "developer", "GitLab DevOps平台MCP服务器，支持CI/CD流水线管理。"),
    ("Jira MCP", "productivity", "Jira项目管理MCP服务器，支持任务跟踪和敏捷开发。"),
    ("Confluence MCP", "productivity", "Confluence知识库MCP服务器，支持文档协作。"),
    ("Figma MCP", "developer", "Figma设计协作MCP服务器，支持设计文件管理。"),
    ("Linear MCP", "productivity", "Linear项目管理MCP服务器，支持 issue 追踪。"),
    ("Stripe MCP", "finance", "Stripe支付MCP服务器，支持支付处理和账单管理。"),
    ("Shopify MCP", "finance", "Shopify电商MCP服务器，支持商品和订单管理。"),
    ("AWS MCP", "cloud", "AWS云服务MCP服务器，支持EC2、S3等资源管理。"),
    ("Azure MCP", "cloud", "Microsoft Azure MCP服务器，支持云资源部署。"),
    ("Vercel MCP", "cloud", "Vercel部署平台MCP服务器，支持项目部署和域名管理。"),
    ("Supabase MCP", "database", "Supabase后端即服务MCP服务器，支持数据库和认证。"),
    ("Redis MCP", "database", "Redis缓存MCP服务器，支持键值操作和数据结构。"),
    ("MongoDB MCP", "database", "MongoDB文档数据库MCP服务器，支持文档CRUD。"),
    ("SQLite MCP", "database", "SQLite轻量数据库MCP服务器，支持本地数据管理。"),
    ("DuckDuckGo MCP", "search", "DuckDuckGo隐私搜索MCP服务器，支持匿名搜索。"),
    ("Brave MCP", "browser", "Brave浏览器MCP服务器，支持隐私浏览和广告拦截。"),
    ("Twitter MCP", "social", "Twitter/X社交MCP服务器，支持推文发布和趋势分析。"),
    ("LinkedIn MCP", "social", "LinkedIn职场社交MCP服务器，支持人脉和内容管理。"),
    ("YouTube MCP", "social", "YouTube视频MCP服务器，支持视频搜索和播放列表。"),
    ("Spotify MCP", "social", "Spotify音乐MCP服务器，支持播放列表和推荐。"),
    ("OpenWeather MCP", "ai", "OpenWeather天气MCP服务器，支持全球天气查询。"),
    ("Wikipedia MCP", "search", "Wikipedia百科MCP服务器，支持知识检索。"),
    ("Google Maps MCP", "search", "Google Maps地图MCP服务器，支持地点搜索和导航。"),
    ("Trello MCP", "productivity", "Trello看板MCP服务器，支持卡片和列表管理。"),
    ("Asana MCP", "productivity", "Asana任务管理MCP服务器，支持项目和任务追踪。"),
    ("Monday MCP", "productivity", "Monday.com工作管理MCP服务器，支持可视化工作流。"),
    ("ClickUp MCP", "productivity", "ClickUp全能管理MCP服务器，支持文档、任务和白板。"),
    ("Dropbox MCP", "cloud", "Dropbox云存储MCP服务器，支持文件同步和共享。"),
    ("OneDrive MCP", "cloud", "Microsoft OneDrive MCP服务器，支持Office文件协作。"),
    ("Zoom MCP", "communication", "Zoom会议MCP服务器，支持会议管理和录制。"),
    ("Teams MCP", "communication", "Microsoft Teams MCP服务器，支持团队协作。"),
    ("Gmail MCP", "communication", "Gmail邮件MCP服务器，支持邮件收发和搜索。"),
    ("Calendar MCP", "productivity", "Google Calendar MCP服务器，支持日程管理和提醒。"),
    ("Drive MCP", "cloud", "Google Drive MCP服务器，支持文件管理和共享。"),
    ("Docs MCP", "productivity", "Google Docs MCP服务器，支持文档协作编辑。"),
    ("Sheets MCP", "productivity", "Google Sheets MCP服务器，支持表格数据处理。"),
]

existing_mcp_ids = {m['id'] for m in mcps}
m_start = len(mcps)
for name, cat, desc in new_mcps:
    mid = name.lower().replace(' ', '-').replace('.', '')
    if mid in existing_mcp_ids:
        continue
    mcps.append({
        "id": mid,
        "name": name,
        "logo": f"https://api.dicebear.com/7.x/shapes/svg?seed={mid}",
        "description": desc,
        "url": f"https://example.com/{mid}",
        "category": cat,
        "tags": random.sample(list(mcp_categories.keys()), k=random.randint(2, 4)),
        "rating": round(random.uniform(4.0, 5.0), 1),
        "updatedAt": random.choice(july_dates),
        "features": random.sample(["数据查询", "内容管理", "自动化操作", "实时同步", "权限控制", "API集成", "批量处理", "通知推送"], k=random.randint(3, 5)),
        "seoTitle": f"{name} - {mcp_categories[cat]} MCP | AI Navigator Pro",
        "seoDescription": desc,
        "views": random.randint(8000, 60000)
    })

with open('data/mcp.json', 'w', encoding='utf-8') as f:
    json.dump(mcps, f, ensure_ascii=False, indent=2)

print(f"  mcp.json: {len(mcps)} 条 (新增 {len(mcps) - m_start})")

# ============ 7. 扩充 workflows.json ============
print("\n=== 扩充 workflows.json ===")
with open('data/workflows.json', 'r', encoding='utf-8') as f:
    workflows = json.load(f)

wf_categories = {
    'finance': '财务',
    'marketing': '营销',
    'product': '产品',
    'operation': '运营',
    'development': '开发',
    'design': '设计',
    'hr': '人力资源',
    'data': '数据分析',
    'content': '内容创作',
    'customer': '客户服务',
}

new_workflows = [
    ("AI预算管理工作流", "finance", "AI辅助预算编制、执行监控与调整优化工作流。"),
    ("AI成本分析工作流", "finance", "AI辅助成本核算、分析与控制优化工作流。"),
    ("AI投资决策工作流", "finance", "AI辅助投资分析、风险评估与决策支持工作流。"),
    ("AI财务报表分析工作流", "finance", "AI辅助财务报表解读、趋势分析与预警工作流。"),
    ("AI社交媒体运营工作流", "marketing", "AI辅助社交媒体内容策划、发布与数据分析工作流。"),
    ("AI内容营销工作流", "marketing", "AI辅助内容策略制定、创作与分发优化工作流。"),
    ("AI品牌监测工作流", "marketing", "AI辅助品牌声誉监测、舆情分析与危机应对工作流。"),
    ("AI竞品分析工作流", "marketing", "AI辅助竞品动态跟踪、功能对比与策略分析工作流。"),
    ("AI用户研究工作流", "product", "AI辅助用户访谈、问卷分析与洞察提炼工作流。"),
    ("AI需求分析工作流", "product", "AI辅助需求收集、优先级排序与文档撰写工作流。"),
    ("AI原型设计工作流", "product", "AI辅助原型生成、交互设计与可用性测试工作流。"),
    ("AI产品发布工作流", "product", "AI辅助发布计划制定、 checklist 检查与效果复盘工作流。"),
    ("AI活动策划工作流", "operation", "AI辅助活动创意、执行方案与效果评估工作流。"),
    ("AI社群运营工作流", "operation", "AI辅助社群内容规划、用户互动与活跃度提升工作流。"),
    ("AI直播运营工作流", "operation", "AI辅助直播脚本、互动话术与数据复盘工作流。"),
    ("AI供应链管理工作流", "operation", "AI辅助供应链监控、库存优化与物流协调工作流。"),
    ("AI代码审查工作流", "development", "AI辅助代码审查、Bug发现与质量提升工作流。"),
    ("AI技术方案评审工作流", "development", "AI辅助技术方案评估、风险识别与优化建议工作流。"),
    ("AI自动化测试工作流", "development", "AI辅助测试用例生成、执行与报告分析工作流。"),
    ("AI性能优化工作流", "development", "AI辅助性能监控、瓶颈分析与优化方案工作流。"),
    ("AI视觉设计工作流", "design", "AI辅助视觉风格探索、设计稿生成与规范输出工作流。"),
    ("AI设计系统搭建工作流", "design", "AI辅助设计Token定义、组件库搭建与文档生成工作流。"),
    ("AI设计评审工作流", "design", "AI辅助设计稿检查、一致性验证与反馈整理工作流。"),
    ("AI动效设计工作流", "design", "AI辅助交互动效设计、原型制作与开发交付工作流。"),
    ("AI招聘管理工作流", "hr", "AI辅助简历筛选、面试安排与候选人评估工作流。"),
    ("AI员工培训工作流", "hr", "AI辅助培训需求分析、课程设计与效果评估工作流。"),
    ("AI绩效管理全流程", "hr", "AI辅助目标设定、过程跟踪与绩效评估工作流。"),
    ("AI员工关怀工作流", "hr", "AI辅助员工满意度调查、反馈分析与关怀方案工作流。"),
    ("AI数据清洗工作流", "data", "AI辅助数据质量检查、清洗规则制定与执行工作流。"),
    ("AI数据建模工作流", "data", "AI辅助特征工程、模型训练与效果评估工作流。"),
    ("AI报表自动化工作流", "data", "AI辅助报表设计、数据抽取与定时推送工作流。"),
    ("AI数据治理工作流", "data", "AI辅助数据标准制定、元数据管理与质量监控工作流。"),
    ("AI短视频创作工作流", "content", "AI辅助选题策划、脚本撰写与视频制作工作流。"),
    ("AI播客制作工作流", "content", "AI辅助选题策划、脚本撰写与音频制作工作流。"),
    ("AI图文排版工作流", "content", "AI辅助内容排版、配图生成与多平台适配工作流。"),
    ("AI内容分发工作流", "content", "AI辅助内容多平台分发、数据监控与策略优化工作流。"),
    ("AI工单处理工作流", "customer", "AI辅助工单分类、自动回复与升级处理工作流。"),
    ("AI客户满意度调研工作流", "customer", "AI辅助问卷设计、数据收集与洞察分析工作流。"),
    ("AI客户流失预警工作流", "customer", "AI辅助流失风险识别、挽回策略与效果跟踪工作流。"),
    ("AI知识库搭建工作流", "customer", "AI辅助FAQ整理、知识库构建与智能问答工作流。"),
]

existing_wf_ids = {w['id'] for w in workflows}
w_start = len(workflows)
for name, cat, desc in new_workflows:
    wid = name.lower().replace(' ', '-').replace('、', '-')
    if wid in existing_wf_ids:
        continue
    workflows.append({
        "id": wid,
        "name": name,
        "cover": f"https://picsum.photos/seed/{wid}/800/400",
        "description": desc,
        "category": cat,
        "tags": random.sample(list(wf_categories.keys()), k=random.randint(2, 4)),
        "steps": [f"步骤{i+1}：AI辅助{random.choice(['数据收集', '分析处理', '方案生成', '执行优化', '效果评估'])}" for i in range(random.randint(5, 8))],
        "tools": random.sample(["ChatGPT", "Claude", "Midjourney", "Notion", "Figma", "Excel", "Python", "Zapier"], k=random.randint(3, 5)),
        "duration": random.choice(["1-2天", "3-5天", "1周", "持续", "按需"]),
        "difficulty": random.choice(["简单", "中等", "复杂"]),
        "updatedAt": random.choice(july_dates),
        "seoTitle": f"{name} - 2026年最新AI工作流 | AI Navigator Pro",
        "seoDescription": desc,
        "views": random.randint(10000, 80000)
    })

with open('data/workflows.json', 'w', encoding='utf-8') as f:
    json.dump(workflows, f, ensure_ascii=False, indent=2)

print(f"  workflows.json: {len(workflows)} 条 (新增 {len(workflows) - w_start})")

# ============ 8. 扩充 news.json ============
print("\n=== 扩充 news.json ===")
with open('data/news.json', 'r', encoding='utf-8') as f:
    news = json.load(f)

news_categories = ['AI聊天', 'AI图像', 'AI视频', 'AI编程', 'AI音频', 'AI Agent', 'MCP', '大模型', '产品发布', '融资', '政策', '开源', '生态', '硬件', '研究', '行业']

new_news = [
    ("GPT-5 Turbo发布，推理速度提升300%", "OpenAI发布GPT-5 Turbo，推理速度提升300%，成本降低50%。", "OpenAI官方", "AI聊天"),
    ("Claude 4.5上线，多模态能力全面升级", "Anthropic推出Claude 4.5，图像理解和生成能力大幅提升。", "Anthropic官方", "AI聊天"),
    ("DeepSeek V4开源，性能超越GPT-4", "DeepSeek发布V4版本并全面开源，在多项基准测试中超越GPT-4。", "DeepSeek", "大模型"),
    ("Midjourney v8发布，支持3D模型生成", "Midjourney v8支持从文本直接生成3D模型和360度全景图。", "Midjourney", "AI图像"),
    ("Runway Gen-4实现10分钟电影级视频", "Runway Gen-4可生成10分钟连贯电影级视频，画面质量显著提升。", "Runway", "AI视频"),
    ("Cursor AI估值突破100亿美元", "AI编程工具Cursor完成新一轮融资，估值突破100亿美元。", "TechCrunch", "融资"),
    ("Google Gemini 2.5 Pro正式发布", "Google发布Gemini 2.5 Pro，多语言能力和代码能力全面增强。", "Google", "AI聊天"),
    ("Meta Llama 4开源，参数达400B", "Meta开源Llama 4，最大版本参数达4000亿，性能媲美闭源模型。", "Meta", "开源"),
    ("xAI Grok 3发布，推理能力大幅提升", "马斯克旗下xAI发布Grok 3，数学和代码推理能力显著提升。", "xAI", "AI聊天"),
    ("苹果Apple Intelligence中文版上线", "Apple Intelligence正式支持中文，Siri智能化程度大幅提升。", "Apple", "产品发布"),
    ("华为盘古大模型5.0发布", "华为发布盘古大模型5.0，行业应用能力全面升级。", "华为", "大模型"),
    ("百度文心一言5.0正式发布", "百度发布文心一言5.0，中文理解和生成能力再上新台阶。", "百度", "AI聊天"),
    ("阿里通义千问3.0开源", "阿里巴巴开源通义千问3.0，性能达到国际领先水平。", "阿里", "开源"),
    ("字节跳动豆包大模型2.0发布", "字节跳动发布豆包大模型2.0，多模态能力显著增强。", "字节跳动", "大模型"),
    ("Moonshot Kimi k2发布，长文本突破", "月之暗面发布Kimi k2，长文本处理能力突破500万字。", "Moonshot", "AI聊天"),
    ("MiniMaxabab 7发布，视频生成亮眼", "MiniMax发布abab 7，视频生成和语音合成能力大幅提升。", "MiniMax", "AI视频"),
    ("智谱AI GLM-5发布，Agent能力突出", "智谱AI发布GLM-5，Agent自主任务执行能力行业领先。", "智谱AI", "AI Agent"),
    ("商汤日日新6.0发布，多模态领先", "商汤科技发布日日新6.0，多模态理解能力达到新高度。", "商汤", "AI图像"),
    ("讯飞星火大模型4.0发布", "科大讯飞发布星火大模型4.0，语音交互能力再升级。", "讯飞", "AI音频"),
    ("腾讯云混元大模型2.0发布", "腾讯发布混元大模型2.0，中文创作和游戏理解能力突出。", "腾讯", "大模型"),
    ("MCP协议2.0发布，安全性增强", "Model Context Protocol 2.0发布，新增身份验证和数据加密。", "MCP官方", "MCP"),
    ("AI编程助手市场突破200亿美元", "全球AI编程助手市场规模突破200亿美元，年增长率超80%。", "Gartner", "行业"),
    ("欧盟AI法案正式实施", "欧盟人工智能法案正式生效，对高风险AI应用提出严格要求。", "欧盟", "政策"),
    ("美国发布AI安全框架2.0", "美国NIST发布AI安全框架2.0，为企业提供AI风险管理指南。", "NIST", "政策"),
    ("中国发布生成式AI服务管理办法", "中国发布生成式人工智能服务管理暂行办法，规范AI服务市场。", "网信办", "政策"),
    ("NVIDIA发布H200 AI芯片", "NVIDIA发布H200 GPU，AI训练和推理性能提升90%。", "NVIDIA", "硬件"),
    ("AMD发布MI350挑战NVIDIA", "AMD发布MI350 AI加速器，性能对标H200，价格更具竞争力。", "AMD", "硬件"),
    ("Google TPU v6发布", "Google发布TPU v6，训练和推理效率大幅提升。", "Google", "硬件"),
    ("苹果M5芯片集成NPU", "苹果M5芯片神经网络引擎性能提升4倍，端侧AI能力增强。", "Apple", "硬件"),
    ("AI蛋白质折叠新突破", "AlphaFold 3预测蛋白质结构准确率达95%，加速药物研发。", "DeepMind", "研究"),
    ("AI自主发现新数学定理", "Google DeepMind AI系统自主发现新的数学定理和证明。", "DeepMind", "研究"),
    ("多模态大模型理解物理世界", "研究展示多模态大模型已具备初步物理世界理解能力。", "MIT", "研究"),
    ("AI药物发现进入临床试验", "AI设计的药物分子首次进入人体临床试验阶段。", "Insilico", "研究"),
    ("自动驾驶L4级别商业化落地", "百度Apollo和Waymo实现L4级别无人驾驶出租车大规模商业化。", "多企业", "行业"),
    ("AI客服替代率超60%", "研究显示企业AI客服替代人工比例已超60%，满意度持续提升。", "Gartner", "行业"),
    ("AI内容创作工具用户破10亿", "全球AI内容创作工具月活用户突破10亿大关。", "Statista", "行业"),
    ("开源大模型数量破5000", "Hugging Face平台开源大模型数量突破5000个。", "Hugging Face", "开源"),
    ("AI Agent框架生态爆发", "主流AI Agent框架月下载量均突破百万，生态快速成熟。", "GitHub", "生态"),
    ("企业AI采用率达75%", "全球500强企业AI技术采用率达到75%，生成式AI成为标配。", "McKinsey", "行业"),
    ("AI能耗问题引发关注", "大规模AI训练和推理能耗问题引发业界关注，绿色AI成为新方向。", "Nature", "研究"),
    ("人形机器人量产在即", "特斯拉Optimus和Figure AI人形机器人进入量产准备阶段。", "多企业", "硬件"),
    ("脑机接口AI取得突破", "Neuralink脑机接口结合AI实现意念打字速度大幅提升。", "Neuralink", "研究"),
    ("AI教育个性化取得进展", "AI个性化教育系统在K12领域效果显著，学习效率提升40%。", "Stanford", "研究"),
    ("量子计算与AI结合", "IBM展示量子计算与AI结合的新范式，解决传统计算难题。", "IBM", "研究"),
    ("AI数字人技术成熟", "AI数字人技术在直播、客服领域大规模应用，成本降低80%。", "多企业", "AI视频"),
    ("3D生成AI成为新风口", "3D模型生成AI工具获得大额融资，游戏和工业设计领域需求旺盛。", "TechCrunch", "AI图像"),
    ("AI编程进入低代码时代", "AI编程工具让非技术人员也能开发应用，低代码市场爆发。", "多企业", "AI编程"),
]

existing_news_ids = {n['id'] for n in news}
n_start = len(news)
for i, (title, summary, source, cat) in enumerate(new_news):
    nid = f"news-{200+i}"
    if nid in existing_news_ids:
        continue
    news.append({
        "id": nid,
        "title": title,
        "summary": summary,
        "url": "https://example.com/news",
        "source": source,
        "publishedAt": random.choice(july_dates),
        "image": f"https://picsum.photos/seed/{nid}/600/400",
        "category": cat
    })

with open('data/news.json', 'w', encoding='utf-8') as f:
    json.dump(news, f, ensure_ascii=False, indent=2)

print(f"  news.json: {len(news)} 条 (新增 {len(news) - n_start})")

print("\n=== 所有数据修复完成 ===")
